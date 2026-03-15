const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema(
  {
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    imageUrl: { type: String },
    isAvailable: { type: Boolean, default: true },
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('MenuItem', MenuItemSchema);

