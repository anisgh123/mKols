const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/userController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup-creator', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').notEmpty(),
  check('FirstName', 'First name is required').notEmpty(),
  check('LastName', 'Last name is required').notEmpty()
], userController.signupCreator);

router.post('/signup-business', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').notEmpty(),
  check('FirstName', 'First name is required').notEmpty(),
  check('LastName', 'Last name is required').notEmpty()
], userController.signupBusiness);

router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').notEmpty()
  ], authController.login);
  
router.get('/api/user', authenticateUser, userController.getUserProfile);
router.put('/api/user', authenticateUser, userController.updateUserProfile);

router.post('/forget-password', userController.forgetPassword);
router.post('/reset-password/:token/:email', userController.resetPassword);

router.put('/update-password', [
  authenticateUser,
  check('currentPassword', 'Current password is required').notEmpty(),
  check('newPassword', 'New password is required').notEmpty()
], userController.updatePassword);

module.exports = router;
