import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

export async function connectDB() {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('[-] Error: MONGODB_URI is not defined in environment variables.');
    throw new Error('MONGODB_URI is not defined');
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
    });
    isConnected = true;
    console.log(`[+] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('[-] MongoDB connection error:', error.message);
    throw error;
  }
}
