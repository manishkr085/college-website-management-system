const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Study Material', 'Timetable', 'Result', 'Download'], required: true },
  department: { type: String, required: true },
  semester: { type: String, default: 'General' },
  course: { type: String, default: 'All Courses' },
  fileUrl: { type: String, default: '' },
  description: { type: String, default: '' },
  uploadedBy: { type: String, default: 'Department Admin' }
}, { timestamps: true });

module.exports = mongoose.model('Material', materialSchema);
