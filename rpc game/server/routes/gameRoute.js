const express = require("express");
const router = express.Router();
const gameModel = require("../models/gameModel");

module.exports = (io) => {
  // route to create Game
  router.post("/game/create/:mode", async (req, res) => {
    const { mode } = req.params;
    const { userId } = req.body;
    try {
      await gameModel.findOneAndDelete({ player1: userId });
      const game = new gameModel({
        mode,
        player1: userId,
      });
      await game.populate("player1");
      await game.save();
      res.status(200).json({ message: "game created", game });
    } catch (error) {
      res
        .status(500)
        .json({ message: "server error while creating game", error });
    }
  });

  // route to find game

  router.get("/game/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
      const game = await gameModel
        .findOne({
          $or: [{ player1: userId }, { player2: userId }],
        })
        .populate("player1")
        .populate("winner")
        .populate("player2");

      if (!game) {
        return res.status(404).json({ message: "no game found" });
      }
      return res.status(200).json({ message: "game found", game });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "server error while finding game" });
    }
  });

  // route to update score
  router.patch("/game/score/:gameId", async (req, res) => {
    const { mode, winner,roomname } = req.body;
    const { gameId } = req.params;
  
    try {
      const game = await gameModel.findById(gameId);
      
      if (!game) {
        return res.status(404).json({ message: "game not found" });
      }
  
      // Check if the game mode is "computer"
      if (mode === "computer") {
        game[winner === "computer" ? 'player2score' : 'player1score']++;
      } else {
        // For two-player mode
        if (game.player1.equals(winner)) {
          game.player1score++;
        } else {
          game.player2score++;
        }
      }
  
      await game.save();
      await game.populate('player1');
      await game.populate('player2');
      io.to(roomname).emit("scoreUpdated", game);
      return res.status(200).json({ message: "score updated", game });
    } catch (error) {
      return res.status(500).json({ message: "server error while updating score " });
    }
  });
  

  //  to set winner
  router.post("/game/winner/:gameId", async (req, res) => {
    const { gameId } = req.params;
    const { roomname } = req.body;
    try {
      const game = await gameModel.findById(gameId);
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }

      if (game.mode === "computer") {
        if (game.player1score === 3) {
          game.winner = "player1";
        } else if (game.player2score === 3) {
          game.winner = "computer";
        }
      } else {
        if (game.player1score === 3) {
          game.winner = "player1";
        } else if (game.player2score === 3) {
          game.winner = "player2";
        }
      }

      await game.save();
      await game.populate("player1");
      await game.populate("player2");
      await game.populate("winner");
      if (game.mode != "computer" && game.winner) {
        io.to(roomname).emit("winner", game);
      }

      return res.status(200).json({ message: "Checked for winner", game });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error while setting winner" });
    }
  });

  // route to join game
  router.patch("/game/join/:gameid", async (req, res) => {
    const { userId, roomname } = req.body;
    const { gameid } = req.params;
    try {
      await gameModel.findOneAndDelete({
        $or: [{ player1: userId }, { player2: userId }],
      });

      const game = await gameModel.findById(gameid);
      if (!game) {
        return res.status(404).json({ message: "game not found" });
      }
      if (game.player2) {
        return res
          .status(400)
          .json({ message: "game already have two players" });
      }
      game.player2 = userId;
      await game.save();
      await game.populate("player1");
      await game.populate("player2");

      // for realtime data transfer
      io.to(roomname).emit("opponentJoined", game);

      return res.status(200).json({ message: "joined game", game, roomname });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error while joining a game", error });
    }
  });



  return router;
};
