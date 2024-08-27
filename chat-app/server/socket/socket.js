const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

let socketId = null; 
const server = http.createServer(app);
const io = new Server(server, {
  cors: ["https://hello-chat-app-client.vercel.app"],
  methods: ["GET", "POST"],
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  socketId = socket.id;

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    socketId = null;
  });
});

// Export a function that waits for the socket ID
const getSocketId = () => {
  return new Promise((resolve, reject) => {
    if (socketId) {
      resolve(socketId); // If the socket ID is already available, resolve immediately
    } else {
      // Otherwise, wait until a socket connection is established
      io.once("connection", (socket) => {
        resolve(socket.id);
      });
    }
  });
};

module.exports = { io, app, server, getSocketId };
