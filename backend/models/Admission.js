const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  applicationNo: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
  courseApplied: { type: String, required: true },
  department: { type: String, required: true },
  address: { type: String, required: true },
  marksPercentage: { type: String, required: true },
  documentUrl: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  adminComments: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Admission', admissionSchema);
