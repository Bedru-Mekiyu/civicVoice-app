'use strict';

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Brevo SMTP Transporter (created once, reused)
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: '9c5c78001@smtp-brevo.com',
    pass: process.env.BREVO_SMTP_KEY, // ← your long key
  },
});

// Generate JWT
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

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
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

    // Send OTP via Brevo
    try {
      await transporter.sendMail({
        from: process.env.FROM_EMAIL || 'CivicVoice <no-reply@civicvoice.et>',
        to: email,
        subject: 'Your CivicVoice Verification Code',
        text: `Hello ${name},\n\nYour verification code is: ${otp}\n\nValid for 10 minutes.`,
        html: `
          <div style="font-family:Arial;text-align:center;padding:40px;background:#f4f4f4;">
            <h2>Welcome to CivicVoice!</h2>
            <p style="font-size:18px;">Your verification code is</p>
            <h1 style="font-size:50px;letter-spacing:12px;color:#10b981;"><b>${otp}</b></h1>
          </div>
        `,
      });
      console.log('BREVO OTP sent to:', email);
    } catch (err) {
      console.error('Brevo failed (non-blocking):', err.message);
    }

    res.status(201).json({
      message: 'Registration successful! Check your email for the OTP.',
      email,
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Keep all other functions exactly as before (they are perfect)
exports.signIn = async (req, res) => { /* ... your existing code ... */ };
exports.verifyOTP = async (req, res) => { /* ... your existing code ... */ };
exports.getMe = async (req, res) => { /* ... */ };
exports.logout = async (req, res) => { res.json({ message: 'Logged out' }); };
exports.updateAvatar = async (req, res) => { /* ... */ };
exports.protect = async (req, res, next) => { /* ... */ };
exports.requireAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) return res.status(403).json({ message: 'Admin only' });
  next();
};