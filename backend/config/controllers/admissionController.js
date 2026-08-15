const Admission = require('../models/Admission');
const { getIsConnected } = require('../config/db');
const { mockStore } = require('../utils/seedData');

// GET all admissions (Admin only)
const getAdmissions = async (req, res) => {
  try {
    if (getIsConnected()) {
      const admissions = await Admission.find().sort({ createdAt: -1 });
      return res.json(admissions);
    } else {
      return res.json(mockStore.admissions);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// SEARCH / Check Status by Application ID or Email
const checkAdmissionStatus = async (req, res) => {
  const { query } = req.params;
  try {
    if (getIsConnected()) {
      const admission = await Admission.findOne({
        $or: [
          { applicationNo: query },
          { email: query.toLowerCase() }
        ]
      });
      if (admission) return res.json(admission);
    } else {
      const admission = mockStore.admissions.find(
        a => a.applicationNo === query || a.email.toLowerCase() === query.toLowerCase()
      );
      if (admission) return res.json(admission);
    }
    return res.status(404).json({ message: 'Application record not found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CREATE admission application
const submitAdmission = async (req, res) => {
  try {
    const applicationNo = 'ADM-2026-' + Math.floor(1000 + Math.random() * 9000);
    const documentUrl = req.file ? `/uploads/${req.file.filename}` : (req.body.documentUrl || '');

    const admissionData = {
      ...req.body,
      applicationNo,
      documentUrl,
      status: 'Pending'
    };

    if (getIsConnected()) {
      const newAdmission = await Admission.create(admissionData);
      return res.status(201).json(newAdmission);
    } else {
      const newAdmission = {
        _id: 'a' + Date.now(),
        ...admissionData,
        createdAt: new Date()
      };
      mockStore.admissions.unshift(newAdmission);
      return res.status(201).json(newAdmission);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// UPDATE admission status (Admin)
const updateAdmissionStatus = async (req, res) => {
  const { status, adminComments } = req.body;
  try {
    if (getIsConnected()) {
      const updated = await Admission.findByIdAndUpdate(
        req.params.id,
        { status, adminComments },
        { new: true }
      );
      if (updated) return res.json(updated);
    } else {
      const index = mockStore.admissions.findIndex(a => a._id === req.params.id);
      if (index !== -1) {
        mockStore.admissions[index].status = status || mockStore.admissions[index].status;
        mockStore.admissions[index].adminComments = adminComments !== undefined ? adminComments : mockStore.admissions[index].adminComments;
        return res.json(mockStore.admissions[index]);
      }
    }
    return res.status(404).json({ message: 'Application record not found' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { getAdmissions, checkAdmissionStatus, submitAdmission, updateAdmissionStatus };
