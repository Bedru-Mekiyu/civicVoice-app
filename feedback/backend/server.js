'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// ==================== CREATE UPLOADS FOLDER ====================
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Uploads folder created');
}

// ==================== CORS – PERFECT & SECURE ====================
const allowedOrigins = [
  'https://civicvoiceapp.onrender.com',
  'https://civicvoice-app-1.onrender.com',
  'https://civicvoiceapp-frontend.onrender.com',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:8080',
  'http://localhost:4173',
  process.env.FRONTEND_ORIGIN, // optional extra from .env
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, mobile apps, curl, Render health checks)
      if (!origin) return callback(null, true);

      // If origin is in whitelist → allow
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // PRODUCTION: Block unknown origins
      if (process.env.NODE_ENV === 'production') {
        console.warn(`CORS BLOCKED: ${origin}`);
        return callback(new Error('Not allowed by CORS'), false);
      }

      // DEVELOPMENT: Allow everything else
      console.warn(`CORS allowed in dev: ${origin}`);
      return callback(null, true);
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// ==================== MONGO CONNECTION – BULLETPROOF ====================
const mongoUri =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  'mongodb+srv://bedrumekiyu39_db_user:74ZzXxFub8dsK5gT@cluster0.xqpaqrm.mongodb.net/civicvoice?retryWrites=true&w=majority&appName=civicvoice';

mongoose.set('strictQuery', false);

mongoose
  .connect(mongoUri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 8000,
    socketTimeoutMS: 45000,
    bufferMaxEntries: 0,
    bufferCommands: false,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

// Reconnection handling
mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected – reconnecting...'));
mongoose.connection.on('reconnected', () => console.log('MongoDB reconnected'));
mongoose.connection.on('error', (err) => console.error('MongoDB error:', err));

// ==================== MIDDLEWARE ====================
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use('/uploads', express.static(uploadDir));

// ==================== ROUTES ====================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/dashboard', require('./routes/dashboard'));

// ==================== HEALTH & ROOT ====================
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'CivicVoice API is healthy',
    timestamp: new Date().toISOString(),
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime(),
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to CivicVoice API',
    docs: '/health',
    version: '1.0.0',
  });
});

// ==================== 404 & ERROR HANDLING ====================
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);

  if (err.name === 'MulterError') {
    return res.status(400).json({ success: false, message: 'File upload error', error: err.message });
  }

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }

  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message;

  res.status(status).json({ success: false, message });
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 10000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health: https://civicvoiceapp.onrender.com/health`);
});

// ==================== RENDER KEEP-ALIVE (FREE TIER) ====================
if (process.env.NODE_ENV === 'production') {
  const keepAliveUrl = `https://${process.env.RENDER_EXTERNAL_HOSTNAME || 'civicvoiceapp.onrender.com'}`;

  setInterval(() => {
    fetch(`${keepAliveUrl}/health`)
      .then(() => console.log('Self-ping successful – staying awake'))
      .catch((err) => console.warn('Self-ping failed:', err.message));
  }, 12 * 60 * 1000); // Every 12 minutes (safe under Render's 15-min limit)
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received – shutting down gracefully');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});