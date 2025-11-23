'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ====================
// PERMANENT CORS FIX (SAFE + CLEAN)
// ====================
const allowedOrigins = [
  'https://civicvoiceapp.onrender.com',
  'https://civicvoice-app-1.onrender.com',
  'https://civicvoiceapp-frontend.onrender.com',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:8080',
  process.env.FRONTEND_ORIGIN, // optional custom one from .env
].filter(Boolean); // removes null/undefined

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser tools (Postman, mobile apps, curl)
      if (!origin) return callback(null, true);

      // Allow all listed origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // For production: change false → true below only if you want to allow ALL domains temporarily
      return callback(null, true); // ← change to `false` when you want strict security
    },
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers choke on 204
  })
);

// ====================
// MONGO CONNECTION – BULLETPROOF
// ====================
const mongoUri =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  'mongodb+srv://bedrumekiyu39_db_user:74ZzXxFub8dsK5gT@cluster0.xqpaqrm.mongodb.net/civicvoice?retryWrites=true&w=majority&appName=civicvoice';

mongoose.set('strictQuery', false); // recommended in Mongoose 7+

mongoose
  .connect(mongoUri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 8000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection failed:', err.message));

// Optional: nice logs
mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected – trying to reconnect...'));
mongoose.connection.on('reconnected', () => console.log('MongoDB reconnected'));

// ====================
// MIDDLEWARE
// ====================
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use('/uploads', express.static(uploadDir));

// ====================
// ROUTES
// ====================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Health check – very useful for Render
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'CivicVoice API is running!',
    timestamp: new Date().toISOString(),
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CivicVoice API', docs: '/health' });
});

// ====================
// ERROR HANDLING (clean & safe)
// ====================
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);

  if (err.name === 'MulterError') {
    return res.status(400).json({ success: false, message: 'File upload error', error: err.message });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: 'Validation failed', errors: err.errors });
  }

  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  });
});

// ====================
// START SERVER
// ====================
const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`→ Health check: https://your-app.onrender.com/health`);
});