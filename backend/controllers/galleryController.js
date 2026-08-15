const Gallery = require('../models/Gallery');
const { getIsConnected } = require('../config/db');
const { mockStore } = require('../utils/seedData');

// GET gallery items
const getGallery = async (req, res) => {
  try {
    if (getIsConnected()) {
      const items = await Gallery.find().sort({ createdAt: -1 });
      return res.json(items);
    } else {
      return res.json(mockStore.gallery);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CREATE gallery item
const createGalleryItem = async (req, res) => {
  try {
    const url = req.file ? `/uploads/${req.file.filename}` : (req.body.url || '');
    const itemData = {
      ...req.body,
      url
    };

    if (getIsConnected()) {
      const newItem = await Gallery.create(itemData);
      return res.status(201).json(newItem);
    } else {
      const newItem = {
        _id: 'g' + Date.now(),
        ...itemData,
        createdAt: new Date()
      };
      mockStore.gallery.unshift(newItem);
      return res.status(201).json(newItem);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// DELETE gallery item
const deleteGalleryItem = async (req, res) => {
  try {
    if (getIsConnected()) {
      await Gallery.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Gallery item removed' });
    } else {
      mockStore.gallery = mockStore.gallery.filter(g => g._id !== req.params.id);
      return res.json({ message: 'Gallery item removed' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getGallery, createGalleryItem, deleteGalleryItem };
