const express = require('express');
const {  updateUserProfile } = require('../controllers/authControllers');
const authenticateUser = require('../middleware/auth');
const { getUserProfile } = require('../controllers/userController');

const router = express.Router();

router.get('/user', authenticateUser, getUserProfile);
router.put('/user/:id', authenticateUser, updateUserProfile);

module.exports = router;
