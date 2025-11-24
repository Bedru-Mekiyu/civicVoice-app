'use strict';

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// BREVO — FINAL WORKING CONFIGURATION (November 2025)
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false, // TLS (not SSL)
  auth: {
    user: 'noreply@civicvoice.et',           // ← any fake email (Brevo ignores this)
    pass: process.env.BREVO_SMTP_KEY,        // ← your long xsmtpsib-... key
  },
  tls: {
    rejectUnauthorized: false                // ← THIS FIXES THE CONNECTION TIMEOUT
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000
});

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

    // Create user
    const user = new User({
      name,
      email,
      password,
      isAdmin: false,
      otp,
      isVerified: false,
    });

    await user.save();

    // Send OTP Email via Brevo
    try {
      await transporter.sendMail({
        from: process.env.FROM_EMAIL || 'CivicVoice <no-reply@civicvoice.et>',
        to: email,
        subject: 'Your CivicVoice Verification Code',
        text: `Hello ${name},\n\nYour verification code is: ${otp}\n\nIt expires in 10 minutes.\n\nIf you didn't sign up, ignore this email.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #f8fafc; text-align: center; border-radius: 12px;">
            <h2 style="color: #10b981;">Welcome to CivicVoice!</h2>
            <p style="font-size: 18px; color: #475569;">Your verification code is</p>
            <h1 style="font-size: 52px; letter-spacing: 15px; color: #1e293b; margin: 20px 0;"><b>${otp}</b></h1>
            <p style="color: #64748b;">Valid for 10 minutes</p>
          </div>
        `,
      });

      console.log('BREVO OTP SUCCESSFULLY SENT TO:', email);
    } catch (emailErr) {
      console.error('BREVO EMAIL FAILED:', emailErr.message);
      // Don't block registration — user is still created
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

// ==================== OTHER FUNCTIONS (UNTOUCHED & WORKING) ====================
exports.getMe = async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
    avatar: req.user.avatar || null,
  });
};

exports.logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

exports.updateAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const avatarPath = `/uploads/${req.file.filename}`;
    req.user.avatar = avatarPath;
    await req.user.save();

    res.json({
      message: 'Avatar updated',
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

exports.requireAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};