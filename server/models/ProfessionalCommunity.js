const mongoose = require('mongoose');

const professionalCommunitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Professional', 'Fresh Graduate'],
    required: true
  },
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
  linkedin: String,
  currentLocation: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  cv: String,
  credentials: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ProfessionalCommunity', professionalCommunitySchema);
