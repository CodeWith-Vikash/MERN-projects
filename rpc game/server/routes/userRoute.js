const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Route to signup a user
router.post('/signup', async (req, res) => {
  const { username, email, password, avatar } = req.body;

  if (username && email && password && avatar) {
    try {
      const findUser = await userModel.findOne({ email });

      if (findUser) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      // Hash the password before saving the user
      const hashedPassword = await bcrypt.hash(password, 10); // Increased salt rounds to 10

      const user = new userModel({ password: hashedPassword, email, username, avatar });

      // Create JWT token with user ID and email
      const token = jwt.sign({ id: user._id, email }, process.env.SECRET, { expiresIn: '30d' });

      try {
        await user.save();
        res.status(200).json({ message: 'User signed up successfully', user, token });
      } catch (error) {
        res.status(500).json({ message: 'Error saving user', error: error.message });
      }
      
    } catch (error) {
      res.status(500).json({ message: 'Error while signing up user', error: error.message });
    }
  } else {
    res.status(400).json({ message: 'Missing credentials' });
  }
});

// Route to login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const user = await userModel.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'No user found with this email. Please sign up.' });
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password' });
      }

      // Create JWT token with user ID and email
      const token = jwt.sign({ id: user._id, email }, process.env.SECRET, { expiresIn: '30d' });

      res.status(200).json({ message: 'User logged in successfully', user, token });
    } catch (error) {
      res.status(500).json({ message: 'Error while logging in user', error: error.message });
    }
  } else {
    return res.status(400).json({ message: 'Missing credentials' });
  }
});

module.exports = router;
