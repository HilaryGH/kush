const mongoose = require('mongoose');

const premiumCommunitySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  organization: String,
  role: String,
  renewalStatus: {
    type: String,
    default: 'New Membership'
  },
  wellnessGoals: String,
  subscriptionPlan: {
    type: String,
    enum: ['individual-monthly', 'individual-yearly', 'corporate-monthly', 'corporate-yearly'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PremiumCommunity', premiumCommunitySchema);
