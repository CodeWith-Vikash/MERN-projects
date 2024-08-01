const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/User');

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password, avatar } = req.body;

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            avatar
        });

        const savedUser = await user.save();

        res.status(201).json({ message: 'Signup successful', data: savedUser });
    } catch (err) {
        res.status(500).json({ message: 'Error during signup', error: err.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Incorrect email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(404).json({ message: 'Incorrect email or password' });
        }

        res.status(200).json({ message: 'Login successful', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
});

router.get('/users',async(req,res)=>{
    try{
        let users= await User.find()
        if(!users){
            res.status(404).json('no users found')
        }
        res.json(users)
    }catch(err){
        res.status(500).json('server errro while getting users')
    }
})

module.exports = router;
