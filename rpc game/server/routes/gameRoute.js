const express = require('express');
const router = express.Router();
const gameModel = require('../models/gameModel');


// route to create Game
router.post('/game/create/:mode',async(req,res)=>{
    const {mode} = req.params
    const {userId} = req.body
    try {
        await gameModel.findOneAndDelete({player1:userId})
       const game= new gameModel({
          mode,
          player1:userId,
       })
       await game.populate('player1')
       await game.save()
       res.status(200).json({message:'game created',game})
    } catch (error) {
        res.status(500).json({message:"server error while creating game"})
    }
})

// route to find game

router.get('/game/:userId', async (req,res)=>{
    const {userId} = req.params
    try {
        const game = await gameModel.findOne({
            $or: [
              { player1: userId },
              { player2: userId }
            ]
          }).populate('player1').populate('winner')
          if(game.mode=='friend'){
            game.populate('player2')
          }
      if(!game){
         return res.status(404).json({message:'no game found'})
      }
      return res.status(200).json({message:'game found',game})
    } catch (error) {
       return res.status(500).json({message:"server error while finding game"})
    }
})

// route to update score
router.patch('/game/score/:gameId',async(req,res)=>{
    const {mode,winner} = req.body
    const {gameId} = req.params
    try {
         const game = await gameModel.findById(gameId).populate('player1')
         if(!game){
            return res.status(404).json({message:'game not found'})
         }
        if(mode=='computer'){
            if(winner=='computer'){
                game.player2score = game.player2score+1
            }else{
                game.player1score = game.player1score+1
            }
            
        }else{
            if(game.player1==winner){
                game.player1score = game.player1score+1
            }else{
                game.player2score = game.player2score+1
            }
            game.populate('player2')
        }
        await game.save()
        return res.status(200).json({message:'score updated',game})
    } catch (error) {
        return res.status(500).json({message:"server error while updating score "})
    }
})


//  to set winner
router.post('/game/winner/:gameId', async (req, res) => {
    const { gameId } = req.params;
    try {
        const game = await gameModel.findById(gameId);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        if (game.mode === 'computer') {
            if (game.player1score === 3) {
                game.winner='player1'
            } else if (game.player2score === 3) {
                game.winner='computer'
            }
        } else {
            if (game.player1score === 3) {
                game.winner='player1'
            } else if (game.player2score === 3) {
                game.winner='player2'
            }
            await game.populate('player2');
        }

        await game.save();
        await game.populate('player1');
        await game.populate('winner');

        return res.status(200).json({ message: "Checked for winner", game });
    } catch (error) {
        return res.status(500).json({ message: "Server error while setting winner" });
    }
});


  

module.exports=router