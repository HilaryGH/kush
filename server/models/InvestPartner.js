const mongoose = require('mongoose');

const investPartnerSchema = new mongoose.Schema({
  partnerType: {
    type: String,
    enum: ['Investor', 'Strategic Partner', 'Sponsorship'],
    required: true
  },
  partner: {
    type: String,
    required: true
  },
  investmentType: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  companyName: {
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
  idDocument: String,
  license: String,
  tradeRegistration: String,
  enquiries: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('InvestPartner', investPartnerSchema);
