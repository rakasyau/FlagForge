import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  challengeId: {
    type: String,
    required: true,
  },
  challengeTitle: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  submittedValue: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Submission = mongoose.model('Submission', submissionSchema);
