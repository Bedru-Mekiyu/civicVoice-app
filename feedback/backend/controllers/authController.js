'use strict';

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const axios = require('axios');  // For HTTP API calls to Brevo

// Generate JWT Token
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
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Send OTP via Brevo HTTP API (bypasses SMTP timeouts)
const sendBrevoEmail = async (to, subject, text, html) => {
  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: 'CivicVoice',
          email: process.env.FROM_EMAIL || 'no-reply@civicvoice.et',
        },
        to: [{ email: to }],
        subject: subject,
        text: text,
        html: html,
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY,  // Your long key
        },
        timeout: 10000,  // 10 second timeout
      }
    );

    if (response.status === 201) {
      console.log('BREVO HTTP API SUCCESS: OTP sent to', to);
      return true;
    }
  } catch (error) {
    console.error('BREVO API FAILED:', error.response?.data?.message || error.message);
    throw error;
  }
};

// ==================== REGISTER ====================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Create user (hash password in User model pre-save)
    const user = new User({
      name,
      email,
      password,
      isAdmin: false,
      otp,
      isVerified: false,
    });

    await user.save();

    // Send OTP via Brevo HTTP API
    try {
      await sendBrevoEmail(
        email,
        'Your CivicVoice Verification Code',
        `Hello ${name},\n\nYour verification code is: ${otp}\n\nIt expires in 10 minutes.\n\nIf you didn't sign up, ignore this email.`,
        `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #f8fafc; text-align: center; border-radius: 12px;">
            <h2 style="color: #10b981;">Welcome to CivicVoice!</h2>
            <p style="font-size: 18px; color: #475569;">Your verification code is</p>
            <h1 style="font-size: 52px; letter-spacing: 15px; color: #1e293b; margin: 20px 0;"><b>${otp}</b></h1>
            <p style="color: #64748b;">Valid for 10 minutes</p>
          </div>
        `
      );
    } catch (emailErr) {
      console.error('BREVO EMAIL FAILED (non-blocking):', emailErr.message);
      // User is still created — email is optional
    }

    res.status(201).json({
      message: 'Registration successful! Check your email for the OTP code.',
      email,
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// ==================== SIGN IN ====================
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your email first' });
    }

    res.json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        avatar: user.avatar || null,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

// ==================== VERIFY OTP ====================
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'User not found' });
    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid or expired OTP' });

    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    res.json({
      message: 'Email verified successfully!',
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        avatar: user.avatar || null,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Verification failed' });
  }
};

// ==================== GET CURRENT USER ====================
exports.getMe = async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
    avatar: req.user.avatar || null,
  });
};

// ==================== LOGOUT ====================
exports.logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

// ==================== UPDATE AVATAR ====================
exports.updateAvatar = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authorized' });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const avatarPath = `/uploads/${req.file.filename}`;
    req.user.avatar = avatarPath;
    await req.user.save();

    res.json({
      message: 'Avatar updated successfully',
      avatar: avatarPath,
      token: generateToken(req.user),
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
        avatar: req.user.avatar,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Avatar update failed' });
  }
};

// ==================== PROTECT MIDDLEWARE ====================
exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id || decoded.sub);
    if (!req.user) return res.status(404).json({ message: 'User not found' });
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// ==================== REQUIRE ADMIN ====================
exports.requireAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};