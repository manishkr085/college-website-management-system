const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/college_management', {
      serverSelectionTimeoutMS: 3000 // Fast fail if local MongoDB is not running
    });
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`MongoDB Connection Warning: ${error.message}`);
    console.log(`Operating in flexible hybrid mode (Mongoose models active with in-memory persistence fallback).`);
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
