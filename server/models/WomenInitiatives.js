const mongoose = require('mongoose');

const womenInitiativesSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  whatsapp: String,
  telegram: String,
  location: String,
  city: String,
  idDocument: String,
  profilePhoto: String,
  certificates: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('WomenInitiatives', womenInitiativesSchema);
