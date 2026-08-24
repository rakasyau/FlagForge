import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  title: {
    type: String,
    default: 'Novice Flag Hunter',
  },
  points: {
    type: Number,
    default: 0,
  },
  solvedCount: {
    type: Number,
    default: 0,
  },
  revealedCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model('User', userSchema);
