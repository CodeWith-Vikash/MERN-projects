const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  mode: {
    type: String,
    enum: ["computer", "friend"],
    required: true,
  },
  player1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  player2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  player1score: { type: Number, default: 0 }, // Player's score
  player2score: { type: Number, default: 0 }, // Friend's or Computer's score
  winner:{type:String,enum:['player1','player2','computer']}
})

module.exports = mongoose.model("Game", gameSchema);
