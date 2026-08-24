import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import progressRoutes from './routes/progressRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB().catch((err) => {
  console.error('[-] Initial MongoDB connection warning:', err.message);
});

// Middleware
app.use(cors());
app.use(express.json());

// Database connection assurance middleware for serverless
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: 'Database connection failure. Please check MONGODB_URI configuration.' });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Standalone server mode for local development
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[+] FlagForge API Backend running on http://localhost:${PORT}`);
  });
}

export default app;
