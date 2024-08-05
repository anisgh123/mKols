const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authControllers');

const router = express.Router();

router.post('/signup-creator', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').notEmpty(),
  check('firstName', 'First name is required').notEmpty(),
  check('lastName', 'Last name is required').notEmpty()
], authController.signupCreator);

router.post('/signup-business', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').notEmpty(),
  check('firstName', 'First name is required').notEmpty(),
  check('lastName', 'Last name is required').notEmpty()
], authController.signupBusiness);

router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').notEmpty()
], authController.login);

router.post('/forget-password', authController.forgetPassword);
router.post('/reset-password/:token/:email', authController.resetPassword);

module.exports = router;

