const mongoose = require('mongoose');

const diasporaCommunitySchema = new mongoose.Schema({
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
  whatsapp: String,
  telegram: String,
  countryOfResidence: {
    type: String,
    required: true
  },
  profession: String,
  whyJoin: String,
  passport: String,
  subscriptionType: {
    type: String,
    enum: ['monthly', 'annual'],
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

module.exports = mongoose.model('DiasporaCommunity', diasporaCommunitySchema);
