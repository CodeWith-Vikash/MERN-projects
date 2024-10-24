const express= require('express')
const router = express.Router()
const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// signup route
router.post('/signup',async (req,res)=>{
    const {username,email,password,avatar} = req.body
    try {
        const foundUser= await userModel.findOne({email})
        if(foundUser){
            return res.status(400).json({message:'a user already exist with this email'})
        }
        var hash = bcrypt.hashSync(password, 8);

        const user = new userModel({username,password:hash,email,avatar})
        user.save()
        res.status(200).json({message:'signed up successfully',user})
    } catch (error) {
        res.status(500).json({message:'server error while signing up'})
    }
})
// route to login
router.post('/login',async(req,res)=>{
    const {email,password}= req.body
    try {
      const user= await userModel.findOne({email}) 
      if(!user){
        return res.status(404).json({message:'no user found with this email'})
      }
      const rightpassword= await bcrypt.compare(password,user.password)
      if(!rightpassword){
       return res.status(400).json({message:'wrong password'})
      }
      const token = jwt.sign({email},process.env.SECRET,{expiresIn:'1h'})
      return res.status(200).json({message:'login successful',user,token})
    } catch (error) {
        return res.status(500).json({message:'server error while login'})
    }
})

module.exports=router