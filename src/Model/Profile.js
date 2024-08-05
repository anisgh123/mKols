const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creator',
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  country: {
    type: String
  },
  bio: {
    type: String
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);