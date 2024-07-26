const express= require('express')
const router= express.Router()
const User= require('../models/User')

router.post('/signup',(req,res)=>{
    const {username, email , password} = req.body
    User.create({
        username,
        email,
        password
    }).then((result)=>{
        return res.status(200).json({message:'signup success',data:result})
    }).catch((err)=>{
        return res.status(500).json({message:'error while signup',error:err})
    })
})

router.post('/login',async(req,res)=>{
    const { email , password} = req.body

    try {
        const logedUser=await User.find({email,password})
        if(!logedUser){
            res.status(404).json('incorrect email or password')
        }
        res.status(200).json({message:'login success',data:logedUser})
    } catch (error) {
        res.status(500).json('server error while login')
    }
})

module.exports= router