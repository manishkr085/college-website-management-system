const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  level: { type: String, enum: ['UG', 'PG', 'Diploma', 'PhD'], default: 'UG' },
  duration: { type: String, required: true },
  eligibility: { type: String, required: true },
  fees: { type: String, required: true },
  seats: { type: Number, default: 60 },
  description: { type: String, required: true },
  syllabusOverview: [{ type: String }],
  image: { type: String, default: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600' }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
