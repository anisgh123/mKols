const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: { type: String },
  country: { type: String },
  bio: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
});

module.exports = mongoose.model('Business', BusinessSchema);
