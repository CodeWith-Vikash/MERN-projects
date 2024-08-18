const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const userModel = require('../models/userModel');


// Route to signup
router.post('/signup', async (req, res) => {
    const { username, email, password, avatar } = req.body;
    const alreadyExists = await userModel.findOne({ email });
    if (alreadyExists) {
        return res.status(400).json({ message: 'User with this email already exists' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            username,
            email,
            password: hashedPassword,
            avatar
        });
        await user.save();
        res.status(200).json({ message: 'Signup successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error',error });
    }
});

// Route to login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'No user exists with this email, please signup' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Wrong password' });
        }
        res.status(200).json({ message: 'Login successful', user});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error',error });
    }
});

// route to get user
router.get('/user/:id',async(req,res)=>{
    const id = req.params.id
    try {
        const user =await userModel.findById(id)
        if(!user){
            res.status(500).json({ message: 'Login user not found' });
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error',error });
    }
})

// Route to get all users
router.get('/users',async(req,res)=>{
   try {
      const users= await userModel.find()
      res.status(200).json(users)
   } catch (error) {
    res.status(500).json({ message: 'Internal server error while getting users',error });
   }
})

// Route to update profile pic
router.patch('/user/profile/:id', async (req, res) => {
    const id = req.params.id;
    const { avatar } = req.body;

    try {
        const user = await userModel.findByIdAndUpdate(id, { avatar }, { new: true });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error while updating profile', error });
    }
});


module.exports = router;
