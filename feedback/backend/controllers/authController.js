'use strict';

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const axios = require('axios');

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

const sendBrevoEmail = async (to, name, otp) => {
  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: { name: 'CivicVoice', email: process.env.FROM_EMAIL },
        to: [{ email: to, name: name }],
        subject: 'Your CivicVoice Verification Code',
        textContent: `Hello ${name},\n\nYour verification code is: ${otp}\n\nValid for 10 minutes.`,
        htmlContent: `
          <div style="font-family:Arial;text-align:center;padding:40px;background:#f0fdf4;">
            <h2 style="color:#10b981;">Welcome to CivicVoice!</h2>
            <p style="font-size:18px;">Your verification code is</p>
            <h1 style="font-size:50px;letter-spacing:12px;color:#166534;"><b>${otp}</b></h1>
            <p>Valid for 10 minutes</p>
          </div>
        `,
      },
      {
        headers: {
          'accept': 'application/json',
          'api-key': process.env.BREVO_API_KEY,   // ← THIS MUST BE THE xkeysib-… KEY
          'content-type': 'application/json',
        },
        timeout: 15000,
      }
    );

    console.log('BREVO API SUCCESS — OTP sent to:', to);
  } catch (error) {
    console.error('BREVO API FAILED:', error.response?.data || error.message);
  }
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

    await sendBrevoEmail(email, name, otp);

    res.status(201).json({
      message: 'Registration successful! Check your email for the OTP.',
      email,
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// (Keep all your other functions exactly as before — they are perfect)
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