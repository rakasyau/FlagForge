import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectDB() {
  if (!MONGODB_URI) {
    console.error('[-] Error: MONGODB_URI is not defined in your .env file.');
    console.error('[-] Please copy .env.example to .env and configure your database connection.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log(`[+] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('[-] MongoDB connection error:', error.message);
    process.exit(1);
  }
}
