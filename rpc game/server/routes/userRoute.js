const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken')

// Route to signup a user
router.post('/signup', async (req, res) => {
    const { username, email, password, avatar } = req.body;

    if (username && email && password && avatar) {
        try {
            const findUser = await userModel.findOne({ email });

            if (findUser) {
                return res.status(400).json({ message: 'User already exists with this email' });
            } else {
                // Hash the password before saving the user
                bcrypt.hash(password, 8, async (err, hash) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error hashing password', error: err });
                    }

                    const user = new userModel({ password: hash, email, username, avatar });

                    const token= await jwt.sign({email},'secret',{expiresIn:'30d'})

                    try {
                        await user.save();
                        res.status(200).json({ message: 'User signed up successfully', user,token });
                    } catch (error) {
                        res.status(500).json({ message: 'Error saving user', error });
                    }
                });
            }

        } catch (error) {
            res.status(500).json({ message: 'Error while signing up user', error });
        }
    } else {
        res.status(400).json({ message: 'Missing credentials' });
    }
});

// route to login
router.post('/login',async (req,res)=>{
    const {email,password} = req.body
    if(email && password){
        try {
            const user= await userModel.findOne({email})
        if(!user){
            return res.status(404).json({ message: 'no user found with this email please signup' });
        }
        const ismatch= await bcrypt.compare(passwrod,user.password)
        if(!ismatch){
            return res.status(400).json({ message: 'wrong password' });
        }
        const token= await jwt.sign({email},'secret',{expiresIn:'30d'})
        res.status(200).json({message:'user logged in sucessfully',user,token})
        } catch (error) {
            res.status(500).json({ message: 'Error while logging in user', error });
        }
    }else{
        return res.status(400).json({ message: 'Missing credentials' });
    }
})

module.exports = router;
