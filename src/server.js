/* const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const Creator = require('./Model/Creator');
const Business = require('./Model/Business');

const app = express();

// Increase payload size limit
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/User')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware to authenticate users
const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  const tokenParts = token.split(' ');
  const actualToken = tokenParts.length === 2 ? tokenParts[1] : tokenParts[0];

  jwt.verify(actualToken, 'yourSecretKey', (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }
    req.user = decoded.user;
    next();
  });
};

// Signup route for creators
app.post('/signup-creator', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').notEmpty(),
  check('FirstName', 'First name is required').notEmpty(),
  check('LastName', 'Last name is required').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, FirstName, LastName } = req.body;

  try {
    let existingCreator = await Creator.findOne({ email });
    let existingBusiness = await Business.findOne({ email });

    if (existingCreator || existingBusiness) {
      return res.status(400).json({ msg: 'User with this email already exists as a creator or a business' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const creator = new Creator({
      email,
      password: hashedPassword,
      FirstName,
      LastName
    });

    await creator.save();
    res.send('Creator registered successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Signup route for businesses
app.post('/signup-business', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').notEmpty(),
  check('FirstName', 'First name is required').notEmpty(),
  check('LastName', 'Last name is required').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, FirstName, LastName } = req.body;

  try {
    let existingBusiness = await Business.findOne({ email });
    let existingCreator = await Creator.findOne({ email });

    if (existingBusiness || existingCreator) {
      return res.status(400).json({ msg: 'User with this email already exists as a business or a creator' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const business = new Business({
      email,
      password: hashedPassword,
      FirstName,
      LastName
    });

    await business.save();
    res.send('Business registered successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login route
app.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await Creator.findOne({ email }) || await Business.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        accountType: user instanceof Creator ? 'creator' : 'business',
        firstName: user.FirstName,
        lastName: user.LastName
      }
    };

    jwt.sign(
      payload,
      'yourSecretKey',
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({
          token: `Bearer ${token}`,
          role: payload.user.accountType,
          firstName: user.FirstName,
          lastName: user.LastName,
          email: user.email,
          photo: user.photo,
          country: user.country,
          bio: user.bio
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to get user profile
app.get('/api/user', authenticateUser, async (req, res) => {
  const userId = req.user.id;

  try {
    let user = await Creator.findById(userId) || await Business.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({
      email: user.email,
      firstName: user.FirstName,
      lastName: user.LastName,
      photo: user.photo,
      country: user.country,
      bio: user.bio
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update user profile route
app.put('/api/user', authenticateUser, async (req, res) => {
  const { FirstName, LastName, email, photo, country, bio } = req.body;
  const userId = req.user.id;

  try {
    let user = await Creator.findById(userId) || await Business.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.FirstName = FirstName || user.FirstName;
    user.LastName = LastName || user.LastName;
    user.email = email || user.email;
    user.photo = photo || user.photo;
    user.country = country || user.country;
    user.bio = bio || user.bio;

    await user.save();

    res.json({ msg: 'Profile updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Forget Password Route
app.post('/forget-password', async (req, res) => {
  const { email } = req.body;
  try {
    let user = await Creator.findOne({ email });
    if (!user) {
      user = await Business.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Email not found' });
      }
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    sendResetEmail(email, token);

    res.json({ msg: 'Email sent' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Reset Password Route
app.post('/reset-password/:token/:email', async (req, res) => {
  const { token, email } = req.params;
  const { password } = req.body;

  try {
    let user = await Creator.findOne({ email, resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) {
      user = await Business.findOne({ email, resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid or expired token' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ msg: 'Password has been reset' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update Password Route
app.put('/update-password', [
  authenticateUser,
  check('currentPassword', 'Current password is required').notEmpty(),
  check('newPassword', 'New password is required').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    let user = await Creator.findById(userId) || await Business.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Current password is incorrect' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await user.save();

    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// Function to send reset password email
const sendResetEmail = (email, token) => {
  const resetLink = `http://localhost:3000/reset-password/${token}/${email}`;
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `You requested a password reset. Please click on this link to reset your password: ${resetLink}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
 */