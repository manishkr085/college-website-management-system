const Material = require('../models/Material');
const { getIsConnected } = require('../config/db');
const { mockStore } = require('../utils/seedData');

// GET materials by category / department
const getMaterials = async (req, res) => {
  try {
    const { category, department } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (department && department !== 'All') filter.department = department;

    if (getIsConnected()) {
      const items = await Material.find(filter).sort({ createdAt: -1 });
      return res.json(items);
    } else {
      let filtered = [...mockStore.materials];
      if (category) filtered = filtered.filter(m => m.category === category);
      if (department && department !== 'All') filtered = filtered.filter(m => m.department === department);
      return res.json(filtered);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// UPLOAD material / timetable / result
const createMaterial = async (req, res) => {
  try {
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : (req.body.fileUrl || '');
    const materialData = {
      ...req.body,
      fileUrl
    };

    if (getIsConnected()) {
      const newMat = await Material.create(materialData);
      return res.status(201).json(newMat);
    } else {
      const newMat = {
        _id: 'm' + Date.now(),
        ...materialData,
        createdAt: new Date()
      };
      mockStore.materials.unshift(newMat);
      return res.status(201).json(newMat);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// DELETE material
const deleteMaterial = async (req, res) => {
  try {
    if (getIsConnected()) {
      await Material.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Material item deleted' });
    } else {
      mockStore.materials = mockStore.materials.filter(m => m._id !== req.params.id);
      return res.json({ message: 'Material item deleted' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getMaterials, createMaterial, deleteMaterial };
