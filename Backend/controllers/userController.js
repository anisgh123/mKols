const Creator = require('../models/Creator');
const Business = require('../models/Business');
const jwt = require('jsonwebtoken');

const getUserProfile = async (req, res) => {

  const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the header
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  let decoded;
  try {

    decoded = jwt.verify(token, 'yourSecretKey'); // Replace 'your_jwt_secret' with your actual secret key
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token', token:token });
  }

  const {  accountType="business" } = decoded;
  let user;
  if (accountType === 'creator') {
    user = await Creator.findById(decoded?.user?.id);
  } else if (accountType === 'business') {
    user = await Business.findById(decoded?.user?.id);
  }

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};

module.exports = {
  getUserProfile,
};
