const express = require('express');
const router = express.Router();
const userModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            username,
            email,
            password: hashPassword
        });
        const savedUser = await user.save();
        const token = jwt.sign({ ID: savedUser._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        res.status(200).json({ message: 'Signup successful', data: savedUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Error while signing up', error });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'wrong password' });
        }
        const token = jwt.sign({ ID: user._id }, process.env.JWT_SECRET || 'secret');
        res.status(200).json({ message: 'Login successful', data: user, token });
    } catch (error) {
        res.status(500).json({ message: 'Error while logging in', error });
    }
});

module.exports = router;
