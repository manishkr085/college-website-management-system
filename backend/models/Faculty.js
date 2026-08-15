const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: String, default: '5+ Years' },
  specialization: { type: String, default: 'General' },
  bio: { type: String, default: '' },
  photo: { type: String, default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300' }
}, { timestamps: true });

module.exports = mongoose.model('Faculty', facultySchema);
