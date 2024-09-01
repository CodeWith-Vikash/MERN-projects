const express = require("express");
const router = express.Router();
const RoomModel = require("../models/RoomModel");
const { getSocketId } = require("../socket/socket");

router.post("/room/:userId/:username", async (req, res) => {
  const userId = req.params.userId;
  const username = req.params.username;
  try {
    let socketId= await getSocketId()
    let room = await RoomModel.findOne({ userId });
    if (!room) {
      room = new RoomModel({
        userId,
        socketId,
        username
      });
    }
    room.socketId = socketId;
    room.save();
    res.status(200).json({ message: "chatroom created", room });
  } catch (error) {
    res.status(500).json({ message: "error while setting room", error });
  }
});

router.get("/room", async (req, res) => {
  try {
    const room = await RoomModel.find();
    if (!room) {
      res.status(404).json("room not found");
    }
    res.status(200).json({ message: "room found", room });
  } catch (error) {
    res.status(500).json({ message: "error while getting room", error });
  }
});

module.exports = router;
