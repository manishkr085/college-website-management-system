const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Events', 'Campus', 'Sports', 'Cultural', 'Labs', 'Videos'], default: 'Campus' },
  type: { type: String, enum: ['image', 'video'], default: 'image' },
  url: { type: String, required: true },
  description: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
