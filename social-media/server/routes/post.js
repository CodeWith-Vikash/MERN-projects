const express= require('express')
const router= express.Router()
const postModel=require('../models/PostModel')

router.get('/posts',async (req,res)=>{
    try {
        const data=await postModel.find()
        res.json(data)
    } catch (error) {
        res.status(500).json({message:'server error while fetching posts',error})
    }
})

router.post('/posts',async(req,res)=>{
    const {userInfo,title,image,likes,comments}=req.body
    try {
        const postedData= new postModel({
            userInfo,
            title,
            image,
            likes,
            comments
        })
        const savedPost=await postedData.save()
        res.status(201).json({message:'post saved',data:savedPost})
    } catch (error) {
        res.status(500).json({message:'server error while posting',error})
    }
})

router.patch('/post/:id/comment',async(req,res)=>{
     const {username,avatar,comment}= req.body
     const id= req.params.id
    try {
        const post= await postModel.findById(id)
        if(!post){
            res.status(404).json('post not found')
        }
        post.comments.push({username,avatar,comment})
        const updatedData=await post.save()
        res.status(200).json({message:'update success',data:updatedData})
    } catch (error) {
        res.status(500).json({message:'server error while updating post',error})
    }
})

module.exports=router