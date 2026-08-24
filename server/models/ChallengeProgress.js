import mongoose from 'mongoose';

const challengeProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  challengeId: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['solved', 'revealed'],
    required: true,
  },
  pointsEarned: {
    type: Number,
    default: 0,
  },
  solvedAt: {
    type: Date,
  },
  revealedAt: {
    type: Date,
  },
});

challengeProgressSchema.index({ userId: 1, challengeId: 1 }, { unique: true });

export const ChallengeProgress = mongoose.model('ChallengeProgress', challengeProgressSchema);
