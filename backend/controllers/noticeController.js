const Notice = require('../models/Notice');
const { getIsConnected } = require('../config/db');
const { mockStore } = require('../utils/seedData');

// GET all notices
const getNotices = async (req, res) => {
  try {
    if (getIsConnected()) {
      const notices = await Notice.find().sort({ createdAt: -1 });
      return res.json(notices);
    } else {
      return res.json(mockStore.notices);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CREATE notice
const createNotice = async (req, res) => {
  try {
    const noticeData = req.body;
    if (getIsConnected()) {
      const newNotice = await Notice.create(noticeData);
      return res.status(201).json(newNotice);
    } else {
      const newNotice = {
        _id: 'n' + Date.now(),
        ...noticeData,
        createdAt: new Date()
      };
      mockStore.notices.unshift(newNotice);
      return res.status(201).json(newNotice);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// UPDATE notice
const updateNotice = async (req, res) => {
  try {
    if (getIsConnected()) {
      const updatedNotice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (updatedNotice) return res.json(updatedNotice);
    } else {
      const index = mockStore.notices.findIndex(n => n._id === req.params.id);
      if (index !== -1) {
        mockStore.notices[index] = { ...mockStore.notices[index], ...req.body };
        return res.json(mockStore.notices[index]);
      }
    }
    return res.status(404).json({ message: 'Notice not found' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// DELETE notice
const deleteNotice = async (req, res) => {
  try {
    if (getIsConnected()) {
      await Notice.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Notice deleted successfully' });
    } else {
      mockStore.notices = mockStore.notices.filter(n => n._id !== req.params.id);
      return res.json({ message: 'Notice deleted successfully' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getNotices, createNotice, updateNotice, deleteNotice };
