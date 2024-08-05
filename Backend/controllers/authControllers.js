const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Creator = require('../models/Creator');
const Business = require('../models/Business');

const JWT_SECRET ="yourSecretKey";
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Signup for creator
exports.signupCreator = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { FirstName, LastName, email, password } = req.body;

  try {
    let user = await Creator.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new Creator({
      FirstName,
      LastName,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Signup for business
exports.signupBusiness = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { FirstName, LastName, email, password } = req.body;

  try {
    let user = await Business.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new Business({
      FirstName,
      LastName,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await Creator.findOne({ email });
    if (!user) {
      user = await Business.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id


      }
    };
    console.log(user)
    jwt.sign(
      payload,
      "yourSecretKey",
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Forget Password
exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await Creator.findOne({ email });
    if (!user) {
      user = await Business.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: user.email,
      subject: 'Password Reset',
      text: `You requested for password reset. Click the link to reset your password: http://localhost:5000/reset-password/${token}/${email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ msg: 'Error sending email' });
      }
      res.json({ msg: 'Email sent' });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token, email } = req.params;
  const { password } = req.body;

  try {
    let user = await Creator.findOne({ email });
    if (!user) {
      user = await Business.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({ msg: 'Invalid or expired token' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.json({ msg: 'Password reset successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
  const { id } = req.params;

  let user = await Creator.findById(id);
  if (!user) {
    user = await Business.findById(id);
  }

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { FirstName, LastName, email, photo, country, bio } = req.body;

  let user = await Creator.findById(id);
  if (!user) {
    user = await Business.findById(id);
  }

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.firstName = FirstName;
  user.lastName = LastName;
  user.email = email;
  user.photo = photo;
  user.country = country;
  user.bio = bio;

  await user.save();

  res.json(user);
};
