const mongoose = require('mongoose');

const ReferralSchema = new mongoose.Schema(
  {
    referrer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    referred: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    code: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ['pending', 'completed', 'expired'],
      default: 'pending',
    },
    rewardAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Referral', ReferralSchema);

