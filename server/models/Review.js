const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    rider: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    feedback: String,
    type: { type: String, enum: ['vendor', 'rider'], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', ReviewSchema);
