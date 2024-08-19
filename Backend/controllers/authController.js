const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user:'anisgharsellaoui027@gmail.com',
    pass:'tqns rrnm hwrf syds'
  },
});

/* // Signup controller
exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, accountType } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ firstName, lastName, email, password: hashedPassword, accountType });
    await newUser.save();

    const token = jwt.sign({ email: newUser.email, id: newUser._id, accountType: newUser.accountType }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};  */

// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: user.email, id: user._id, accountType: user.accountType }, process.env.JWT_SECRET, { expiresIn: '4h' });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Forget Password controller
exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate reset token
    const resetToken = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send email with reset link
    const resetLink = `http://localhost:3000/reset-password/${resetToken}/${email}`;
    const mailOptions = {
      from: 'Anisgharsellaoui@gmailcom' ,
      host:"127.0.0.1",
   
      to: email,
      subject: 'Password Reset Request',
      html: `<p>You requested for a password reset</p><p>Click this <a href="${resetLink}">link</a> to reset your password</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
        return res.status(500).json({ message: 'Failed to send email' });
      } else {
        return res.status(200).json({ message: 'Reset link sent to email' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Reset Password controller
exports.resetPassword = async (req, res) => {
  const { token, email, password } = req.body;

  try {
    if (!token || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email, _id: decodedData.id });
    if (!user) return res.status(404).json({ message: 'Invalid link or expired' });

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Update Profile controller
exports.updateProfile = async (req, res) => {
  const userId = req.userId;
  const { firstName, lastName, country, bio, photo } = req.body;

  try {
    if (!firstName || !lastName) {
      return res.status(400).json({ message: 'First Name and Last Name are required' });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { firstName, lastName, country, bio, photo }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
exports.getCreators = async (req, res) => {
  try {
    const creators = await User.find({ 
      accountType: "creator" });
    res.status(200).json(creators);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
// Signup controller
exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, accountType, isCreator } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ firstName, lastName, email, password: hashedPassword, accountType, isCreator });
    await newUser.save();

    const token = jwt.sign({ email: newUser.email, id: newUser._id,  accountType: newUser.accountType, isCreator: newUser.isCreator }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Controller method to fetch creator IDs

