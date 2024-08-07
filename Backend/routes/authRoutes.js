const express = require('express');
const { signup, login, forgetPassword, resetPassword, updateProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const { getCreators } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);
router.patch('/update-profile', authMiddleware, updateProfile);
router.get('/creators',getCreators )
module.exports = router;
