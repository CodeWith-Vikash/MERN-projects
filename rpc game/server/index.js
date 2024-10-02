const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const uploadRoute = require("./routes/uploadRoute");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  },
});
const gameRoute = require("./routes/gameRoute")(io);
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

mongoose.connect(process.env.CONNECTION_URI).then(() => {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send("RPC server is running..");
});

app.use("/api", userRoute);
app.use("/api", uploadRoute);
app.use("/api", gameRoute);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

// socket logic
let rooms={}

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('createRoom', (user) => {
    const roomname = user._id; // Assuming the user's ID is the room name
    rooms[roomname] = [socket.id];
    socket.join(roomname);
    socket.emit('roomCreated', { rooms, roomname });
  });

  socket.on('joinRoom', ({roomname}) => {
    socket.join(roomname);
    const room = io.sockets.adapter.rooms.get(roomname);
    socket.emit('joinedRoom', { room: Array.from(room), roomname });
  });

  socket.on('mymove', ({ roomname, move,userId }) => {
     socket.to(roomname).emit('opponentMove',{userId,move})
  });

  socket.on('leaveRoom', (roomname) => {
    socket.leave(roomname);
    rooms[roomname] = rooms[roomname].filter((id) => id !== socket.id);
    socket.emit('leavedRoom', { roomname, rooms });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    socket.emit('looseConnection', { message: `user disconnected ${socket.id}` });
  });
});

