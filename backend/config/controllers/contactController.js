const Contact = require('../models/Contact');
const { getIsConnected } = require('../config/db');
const { mockStore } = require('../utils/seedData');

// GET all contact messages (Admin)
const getContacts = async (req, res) => {
  try {
    if (getIsConnected()) {
      const messages = await Contact.find().sort({ createdAt: -1 });
      return res.json(messages);
    } else {
      return res.json(mockStore.contacts);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// SUBMIT contact message
const submitContact = async (req, res) => {
  try {
    const contactData = req.body;
    if (getIsConnected()) {
      const newMsg = await Contact.create(contactData);
      return res.status(201).json(newMsg);
    } else {
      const newMsg = {
        _id: 'cnt' + Date.now(),
        ...contactData,
        status: 'New',
        createdAt: new Date()
      };
      mockStore.contacts.unshift(newMsg);
      return res.status(201).json(newMsg);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// UPDATE message status
const updateContactStatus = async (req, res) => {
  const { status } = req.body;
  try {
    if (getIsConnected()) {
      const updated = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });
      if (updated) return res.json(updated);
    } else {
      const index = mockStore.contacts.findIndex(c => c._id === req.params.id);
      if (index !== -1) {
        mockStore.contacts[index].status = status;
        return res.json(mockStore.contacts[index]);
      }
    }
    return res.status(404).json({ message: 'Contact message not found' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { getContacts, submitContact, updateContactStatus };
