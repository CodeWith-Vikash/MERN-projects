const express = require('express');
const router = express.Router();
const gameModel = require('../models/gameModel');

router.post('/game/create/:mode',async(req,res)=>{
    const {mode} = req.params
    const {userId} = req.body
    try {
       const game= new gameModel({
          mode,
          player1:userId,
       })
       await game.save()
       res.status(200).json({message:'game created',game})
    } catch (error) {
        res.status(500).json({message:"server error while creating game"})
    }
})

module.exports=router