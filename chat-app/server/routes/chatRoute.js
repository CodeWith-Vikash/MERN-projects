const express = require('express');
const router = express.Router();
const Chat = require('../models/chatModel');
const messageModel = require('../models/messageModel');
const chatModel = require('../models/chatModel');
const {io} = require('../socket/socket')

// get my chats
router.get('/chats/:userId',async(req,res)=>{
  const id = req.params.userId
  try{
    let chats= await chatModel.find({
      users: {$in:[id]}
    })
    .populate('users','-password')
    .populate('latestMessage')
    if(!chats){
      res.status(404).json({message:'no chats found'})
    }
    res.status(200).json(chats)
  }catch(error){
    return res.status(500).json({ message: "server error! can't get your chats",error });
  }
})
// Route to find or get chat of a user
router.post('/chat', async (req, res) => {
  const { userId1, userId2 } = req.body;

  try {
    let chat = await Chat.findOne({
      users: { $all: [userId1, userId2] },
    })
    .populate('users', '-password')
    .populate('latestMessage')
    .populate({
      path: 'messages',
      populate: { path: 'sender', select: 'username avatar' }
    });

    if (chat) {
      return res.status(200).json(chat);
    }

    chat = new Chat({
      users: [userId1, userId2],
    });

    await chat.save();

    chat = await Chat.findById(chat._id).populate('users', '-password');

    return res.status(201).json(chat);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Server error',error });
  }
});

// Route to create new message
router.post('/chat/message/:chatId/:socketId', async (req, res) => {
  const chatId = req.params.chatId;
  const socketId= req.params.socketId
  const { contentType, content, mediaUrl, sender,fileName } = req.body;

  try {
      // Find the chat by ID
      const chat = await chatModel.findById(chatId);
      if (!chat) {
          return res.status(404).json({ message: 'Chat not found' });
      }

      // Create and save the new message
      const newMessage = new messageModel({
          sender,
          contentType,
          content,
          mediaUrl,
          fileName:fileName||null
      });
      await newMessage.save();

      // Update the chat with the new message
      chat.messages.push(newMessage._id);
      chat.latestMessage = newMessage._id;
      await chat.save();

      // Populate the chat details
      const populatedChat = await chatModel.findById(chatId)
          .populate('users', 'username avatar')
          .populate({
              path: 'messages',
              populate: { path: 'sender', select: 'username avatar' }
          });

      // Respond with the populated chat
      io.to(socketId).emit('chat',populatedChat)
      return res.status(200).json({ message: `message sent`, populatedChat,socketId});
  } catch (error) {
      console.error('Error sending message:', error);
      return res.status(500).json({ message: 'Server error while messaging', error });
  }
});

module.exports = router;
