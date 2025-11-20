'use strict';

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      sub: String(user._id),
      id: String(user._id),
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      avatar: user.avatar || null,
    },
    process.env.JWT_SECRET, // ✅ use JWT_SECRET from .env
    { expiresIn: '24h' }
  );
};

exports.register = async (req, res) => {
  try {
    // Public registration: citizens only. Do not accept isAdmin from client.
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      name,
      email,
      password,
      isAdmin: false,
      otp,
      isVerified: false,
    });

    await user.save();

    try {
      await sendEmail({
        to: email,
        subject: 'Your CivicVoice OTP Code',
        text: `Hello ${name},\n\nYour one-time verification code is ${otp}. It will expire once you activate your account.\n\nIf you did not sign up, please ignore this message.`,
      });
    } catch (emailErr) {
      console.error(`Failed to send OTP email to ${email}:`, emailErr.message);
    }
    res.status(201).json({
      message: 'Registration successful, check your email for the verification code.',
      email,
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const validPassword = user && (await bcrypt.compare(password, user.password));
    if (!user || !validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Allow unverified login only if explicitly enabled (development convenience)
    const allowUnverified = process.env.ALLOW_UNVERIFIED_LOGIN === 'true';
    if (!user.isVerified && !allowUnverified) {
      if (!user.otp) {
        user.otp = Math.floor(100000 + Math.random() * 900000).toString();
        await user.save();
      }
      try {
        await sendEmail({
          to: email,
          subject: 'Your CivicVoice OTP Code',
          text: `Hello ${user.name},\n\nTo finish signing in, enter this verification code: ${user.otp}.\n\nIf you did not attempt to sign in, please secure your account.`,
        });
      } catch (emailErr) {
        console.error(`Failed to resend OTP email to ${email}:`, emailErr.message);
      }
      return res.status(403).json({ message: 'Account not verified. OTP resent to your email.' });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        avatar: user.avatar || null,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    if (user.isVerified)
      return res.status(400).json({ message: 'User already verified' });

    if (user.otp !== otp) {
      console.log(
        `OTP verification failed for ${email}: Expected ${user.otp}, Received ${otp}`
      );
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    const token = generateToken(user);

    res.json({
      message: 'Account activated',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        avatar: user.avatar || null,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Activation error', error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authorized' });

    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
      avatar: req.user.avatar || null,
    });
  } catch (err) {
    res.status(500).json({ message: 'User fetch error', error: err.message });
  }
};

exports.logout = (req, res) => {
  res.json({ message: 'Logged out' });
};

// Update profile avatar (profile image)
exports.updateAvatar = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Store relative path so frontend can prefix with API base URL
    const avatarPath = `/uploads/${req.file.filename}`;

    req.user.avatar = avatarPath;
    await req.user.save();

    const token = generateToken(req.user);

    res.json({
      message: 'Avatar updated successfully',
      avatar: avatarPath,
      token,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
        avatar: req.user.avatar || null,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Avatar update failed', error: err.message });
  }
};

exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ use JWT_SECRET
    const userId = decoded.id || decoded.sub;
    req.user = await User.findById(userId);
    if (!req.user) return res.status(404).json({ message: 'User not found' });

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token failed', error: err.message });
  }
};

// Admin-only middleware
exports.requireAdmin = (req, res, next) => {
  if (!req.user || req.user.isAdmin !== true) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
