const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
 creatorId: { type: String, required: true },
  lastName: { type: String, required: true },
  Offerprice: { type: String, required: true },
  businessemail: { type: String, required: true },
  Phonenumber: { type: String },
  Offerdescription: { type: String },
  status: { type: String },

  
});

const Offer = mongoose.model('Offer', OfferSchema);

module.exports = Offer;