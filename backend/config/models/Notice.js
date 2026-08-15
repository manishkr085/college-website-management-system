const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Notice', 'Event', 'Circular', 'Academic', 'Exam'], default: 'Notice' },
  description: { type: String, required: true },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] },
  location: { type: String, default: 'Campus Auditorium' },
  attachment: { type: String, default: '' },
  isImportant: { type: Boolean, default: false },
  author: { type: String, default: 'Administration' }
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);
