'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// ==================== UPLOADS FOLDER ====================
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ==================== CORS (PRODUCTION SAFE) ====================
const allowedOrigins = [
  'https://civicvoiceapp.onrender.com',
  'https://civicvoice-app-1.onrender.com',
  'https://civicvoiceapp-frontend.onrender.com',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:8080',
  process.env.FRONTEND_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);

      if (process.env.NODE_ENV === 'production') {
        console.warn(`CORS BLOCKED: ${origin}`);
        return callback(new Error('Not allowed by CORS'), false);
      }
      return callback(null, true);
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// ==================== MONGO CONNECTION (FIXED!) ====================
const mongoUri =
  process.env.MONGODB_URI ||
  'mongodb+srv://bedrumekiyu39_db_user:74ZzXxFub8dsK5gT@cluster0.xqpaqrm.mongodb.net/civicvoice?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);

mongoose
  .connect(mongoUri, {
    maxPoolSize: 10,                  // Good
    serverSelectionTimeoutMS: 8000,   // Good
    socketTimeoutMS: 45000,           // Good
    // REMOVED: bufferMaxEntries & bufferCommands → they were removed in MongoDB driver 4.0+
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected'));
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
    message: 'CivicVoice API is running!',
    timestamp: new Date().toISOString(),
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CivicVoice API', docs: '/health' });
});

// ==================== 404 & ERROR HANDLING ====================
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message;
  res.status(status).json({ success: false, message });
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 10000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: https://civicvoiceapp.onrender.com/health`);
});

// ==================== RENDER KEEP-ALIVE (FREE TIER) ====================
if (process.env.NODE_ENV === 'production') {
  const url = `https://${process.env.RENDER_EXTERNAL_HOSTNAME || 'civicvoiceapp.onrender.com'}`;
  setInterval(() => {
    fetch(`${url}/health`)
      .then(() => console.log('Keep-alive ping sent'))
      .catch(() => {});
  }, 12 * 60 * 1000); // every 12 mins
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received – shutting down...');
  server.close(() => {
    mongoose.connection.close(false, () => process.exit(0));
  });
});