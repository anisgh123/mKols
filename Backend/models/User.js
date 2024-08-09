const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: { type: String },
  country: { type: String },
  bio: { type: String },
  accountType:{type:String},
  followers:{type:Number},
  avatar:{type:String},
  following:{type:Number},
  category:{type:String},
  is_business:{type:String},
  is_verified_account:{type:String}

  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
