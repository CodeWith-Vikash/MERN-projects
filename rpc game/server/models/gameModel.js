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
    required: function () {
      return this.mode === "friend";
    },
  },
  player1score: { type: Number, default: 0 }, // Player's score
  player2score: { type: Number, default: 0 }, // Friend's or Computer's score
  winner: {
    type: mongoose.Schema.Types.Mixed, // Can be ObjectId or String
    refPath: "winnerType", // Reference to the dynamic winner type
    default: undefined,
  },
  winnerType: {
    type: String,
    enum: ["User", "Computer"], // Dynamic reference to either 'User' or 'Computer'
  },
});

module.exports = mongoose.model("Game", gameSchema);
