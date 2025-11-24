'use strict';

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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

// Send OTP using Gmail SMTP via Nodemailer
const sendEmail = async (to, name, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // Gmail on port 587 = false
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"CivicVoice" <${process.env.SMTP_USER}>`,
      to,
      subject: 'Your CivicVoice Verification Code',
      html: `
        <div style="font-family:Arial;text-align:center;padding:40px;background:#f0fdf4;">
          <h2 style="color:#10b981;">Welcome to CivicVoice!</h2>
          <p style="font-size:18px;">Your verification code is</p>
          <h1 style="font-size:50px;letter-spacing:12px;color:#166534;"><b>${otp}</b></h1>
          <p>Valid for 10 minutes</p>
        </div>
      `,
    });

    console.log('GMAIL SMTP SUCCESS — OTP sent to:', to);
  } catch (error) {
    console.error('GMAIL SMTP FAILED:', error.message);
  }
};

// REGISTER USER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Generate OTP
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

    // Send OTP via Gmail SMTP
    await sendEmail(email, name, otp);

    res.status(201).json({
      message: 'Registration successful! Check your email for the OTP.',
      email,
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Other functions (unchanged)
exports.signIn = async (req, res) => { /* your code */ };
exports.verifyOTP = async (req, res) => { /* your code */ };
exports.getMe = async (req, res) => { /* your code */ };
exports.logout = async (req, res) => { res.json({ message: 'Logged out' }); };
exports.updateAvatar = async (req, res) => { /* your code */ };
exports.protect = async (req, res, next) => { /* your code */ };
exports.requireAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) return res.status(403).json({ message: 'Admin only' });
  next();
};
