import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import progressRoutes from './routes/progressRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database via environment variable
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`[+] FlagForge API Backend running on http://localhost:${PORT}`);
});
