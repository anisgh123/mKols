const mongoose = require('mongoose');
require('dotenv').config();

console.log('MONGO_URI:', process.env.MONGO_URI);  // Log the MONGO_URI to verify it's loaded

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);  // Connect without deprecated options
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
