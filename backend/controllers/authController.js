const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');
const { mockStore } = require('../utils/seedData');

const generateToken = (id, role, name, email) => {
  return jwt.sign({ id, role, name, email }, process.env.JWT_SECRET || 'college_management_super_secret_jwt_key_2026', {
    expiresIn: '7d'
  });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    if (getIsConnected()) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user && (await user.matchPassword(password))) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          avatar: user.avatar,
          token: generateToken(user._id, user.role, user.name, user.email)
        });
      }
    } else {
      // Fallback check
      const user = mockStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      // Admin/Faculty/Student password matching check (supports admin123, faculty123, student123 or default 'admin123')
      if (user && (password === 'admin123' || password === 'faculty123' || password === 'student123' || password === 'password123')) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          avatar: user.avatar,
          token: generateToken(user._id, user.role, user.name, user.email)
        });
      }
    }

    return res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  const { name, email, password, role, department } = req.body;

  try {
    if (getIsConnected()) {
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }
      const user = await User.create({
        name,
        email,
        password,
        role: role || 'student',
        department: department || 'General'
      });
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        token: generateToken(user._id, user.role, user.name, user.email)
      });
    } else {
      const userExists = mockStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const newUser = {
        _id: 'u' + (mockStore.users.length + 1),
        name,
        email,
        password,
        role: role || 'student',
        department: department || 'General',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        createdAt: new Date()
      };
      mockStore.users.push(newUser);
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        department: newUser.department,
        token: generateToken(newUser._id, newUser.role, newUser.name, newUser.email)
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
const getUserProfile = async (req, res) => {
  return res.json(req.user);
};

module.exports = { loginUser, registerUser, getUserProfile };
