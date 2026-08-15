const Course = require('../models/Course');
const { getIsConnected } = require('../config/db');
const { mockStore } = require('../utils/seedData');

// GET all courses
const getCourses = async (req, res) => {
  try {
    if (getIsConnected()) {
      const courses = await Course.find().sort({ createdAt: -1 });
      return res.json(courses);
    } else {
      return res.json(mockStore.courses);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET course by ID
const getCourseById = async (req, res) => {
  try {
    if (getIsConnected()) {
      const course = await Course.findById(req.params.id);
      if (course) return res.json(course);
    } else {
      const course = mockStore.courses.find(c => c._id === req.params.id);
      if (course) return res.json(course);
    }
    return res.status(404).json({ message: 'Course not found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CREATE course
const createCourse = async (req, res) => {
  try {
    const courseData = req.body;
    if (getIsConnected()) {
      const newCourse = await Course.create(courseData);
      return res.status(201).json(newCourse);
    } else {
      const newCourse = {
        _id: 'c' + Date.now(),
        ...courseData,
        createdAt: new Date()
      };
      mockStore.courses.unshift(newCourse);
      return res.status(201).json(newCourse);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// UPDATE course
const updateCourse = async (req, res) => {
  try {
    if (getIsConnected()) {
      const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (updatedCourse) return res.json(updatedCourse);
    } else {
      const index = mockStore.courses.findIndex(c => c._id === req.params.id);
      if (index !== -1) {
        mockStore.courses[index] = { ...mockStore.courses[index], ...req.body };
        return res.json(mockStore.courses[index]);
      }
    }
    return res.status(404).json({ message: 'Course not found' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// DELETE course
const deleteCourse = async (req, res) => {
  try {
    if (getIsConnected()) {
      await Course.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Course removed successfully' });
    } else {
      mockStore.courses = mockStore.courses.filter(c => c._id !== req.params.id);
      return res.json({ message: 'Course removed successfully' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getCourses, getCourseById, createCourse, updateCourse, deleteCourse };
