const Faculty = require('../models/Faculty');
const { getIsConnected } = require('../config/db');
const { mockStore } = require('../utils/seedData');

// GET all faculty
const getFaculty = async (req, res) => {
  try {
    if (getIsConnected()) {
      const faculty = await Faculty.find().sort({ createdAt: -1 });
      return res.json(faculty);
    } else {
      return res.json(mockStore.faculty);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET faculty by ID
const getFacultyById = async (req, res) => {
  try {
    if (getIsConnected()) {
      const faculty = await Faculty.findById(req.params.id);
      if (faculty) return res.json(faculty);
    } else {
      const faculty = mockStore.faculty.find(f => f._id === req.params.id);
      if (faculty) return res.json(faculty);
    }
    return res.status(404).json({ message: 'Faculty member not found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CREATE faculty
const createFaculty = async (req, res) => {
  try {
    const facultyData = req.body;
    if (getIsConnected()) {
      const newFaculty = await Faculty.create(facultyData);
      return res.status(201).json(newFaculty);
    } else {
      const newFaculty = {
        _id: 'f' + Date.now(),
        ...facultyData,
        createdAt: new Date()
      };
      mockStore.faculty.unshift(newFaculty);
      return res.status(201).json(newFaculty);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// UPDATE faculty
const updateFaculty = async (req, res) => {
  try {
    if (getIsConnected()) {
      const updatedFaculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (updatedFaculty) return res.json(updatedFaculty);
    } else {
      const index = mockStore.faculty.findIndex(f => f._id === req.params.id);
      if (index !== -1) {
        mockStore.faculty[index] = { ...mockStore.faculty[index], ...req.body };
        return res.json(mockStore.faculty[index]);
      }
    }
    return res.status(404).json({ message: 'Faculty member not found' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// DELETE faculty
const deleteFaculty = async (req, res) => {
  try {
    if (getIsConnected()) {
      await Faculty.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Faculty member removed successfully' });
    } else {
      mockStore.faculty = mockStore.faculty.filter(f => f._id !== req.params.id);
      return res.json({ message: 'Faculty member removed successfully' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getFaculty, getFacultyById, createFaculty, updateFaculty, deleteFaculty };
