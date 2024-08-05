const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  photo: String,
  country: String,
  bio: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

module.exports = mongoose.model('Business', BusinessSchema);
