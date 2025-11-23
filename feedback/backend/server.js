'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ──────────────────────────────
// CORS & MONGODB URI – FIXED 100%
// ──────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN,
  'https://civicvoiceapp.onrender.com',     // your future frontend URL
  'http://localhost:5173',
  'http://localhost:8080',
  'http://localhost:3000'
].filter(Boolean); // removes undefined/null values

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // TEMPORARY: allow all during testing
      // callback(new Error('Not allowed by CORS')); // ← enable this later for security
    }
  },
  credentials: true
}));

// ──────────────────────────────
// MONGO URI – WORKS BOTH LOCALLY & ON RENDER
// ──────────────────────────────
const mongoUri = 
  process.env.MONGODB_URI || 
  process.env.MONGO_URI || 
  "mongodb+srv://bedrumekiyu39_db_user:74ZzXxFub8dsK5gT@cluster0.xqpaqrm.mongodb.net/civicvoice?retryWrites=true&w=majority";

mongoose.set('strictQuery', true);
mongoose
  .connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 20000,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected'));
mongoose.connection.on('reconnected', () => console.log('MongoDB reconnected'));

// ───────────────────────────────
// Middleware & Routes
// ──────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(uploadDir));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Health check (optional but nice)
app.get('/', (req, res) => {
  res.json({ message: 'CivicVoice Backend is alive!' });
});

// 404 & Error handler
app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  );
  if (err.name === 'MulterError') {
    return res.status(400).json({ message: 'File upload error', error: err.message });
  }
  res.status(500).json({ message: 'Server error', error: err.message });
});

// ──────────────────────────────
const PORT = process.env.PORT || 10000 || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));