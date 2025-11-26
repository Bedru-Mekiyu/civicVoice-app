"use strict";

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// ---------------------------
// JWT TOKEN GENERATOR
// ---------------------------
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
    { expiresIn: "24h" }
  );
};

// ---------------------------
// SEND OTP EMAIL USING MAILTRAP
// ---------------------------
const sendEmail = async (to, name, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,    // sandbox.smtp.mailtrap.io
      port: Number(process.env.SMTP_PORT) || 2525,
      secure: false,                  // false for STARTTLS
      auth: {
        user: process.env.SMTP_USER,  // Mailtrap username
        pass: process.env.SMTP_PASS,  // Mailtrap full password
      },
    });

    await transporter.sendMail({
      from: `"CivicVoice" <${process.env.SMTP_FROM}>`,
      to,
      subject: "Your CivicVoice Verification Code",
      html: `
        <div style="font-family:Arial;text-align:center;padding:40px;background:#f0fdf4;">
          <h2 style="color:#10b981;">Welcome to CivicVoice!</h2>
          <p style="font-size:18px;">Your verification code is</p>
          <h1 style="font-size:50px;letter-spacing:12px;color:#166534;"><b>${otp}</b></h1>
          <p>Valid for 10 minutes</p>
        </div>
      `,
    });

    console.log("📧 OTP sent via Mailtrap to:", to);
  } catch (error) {
    console.error("❌ MAILTRAP SMTP ERROR:", error);
  }
};

// ---------------------------
// REGISTER USER + SEND OTP
// ---------------------------
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check duplicate
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already registered" });
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

    // Send OTP email
    await sendEmail(email, name, otp);

    res.status(201).json({
      message: "Registration successful! Check Mailtrap Inbox for OTP.",
      email,
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------------
// VERIFY OTP
// ---------------------------
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    user.isVerified = true;
    user.otp = null;
    await user.save();

    const token = generateToken(user);

    res.json({
      message: "OTP verified successfully",
      token,
      user,
    });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------------
// SIGN IN
// ---------------------------
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified) {
      return res.status(403).json({ message: "Account not verified" });
    }

    const token = generateToken(user);

    res.json({
      message: "Signed in successfully",
      token,
      user,
    });
  } catch (err) {
    console.error("Sign-in Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------------
// PROTECT ROUTES
// ---------------------------
exports.protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ---------------------------
// REQUIRE ADMIN
// ---------------------------
exports.requireAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) return res.status(403).json({ message: "Admin only" });
  next();
};

// ---------------------------
// GET MY PROFILE
// ---------------------------
exports.getMe = async (req, res) => {
  res.json(req.user);
};

// ---------------------------
// UPDATE AVATAR
// ---------------------------
exports.updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;

    const user = await User.findById(req.user._id);
    user.avatar = avatar;
    await user.save();

    res.json({ message: "Avatar updated", avatar });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------------
// LOGOUT
// ---------------------------
exports.logout = (req, res) => {
  res.json({ message: "Logged out" });
};
