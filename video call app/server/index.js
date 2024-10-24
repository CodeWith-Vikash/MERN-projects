const mongoose= require('mongoose')
const express= require('express')
const http = require('http')
const {Server} = require('socket.io')
const dotenv = require('dotenv')
const cors = require('cors')
const userRoute = require('./routes/userRoute')

const app = express()
const server= http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173"
    }
})

app.use(express.json())

dotenv.config();

app.use(cors({
    origin: ["","http://localhost:5173"],
    methods: ['GET','POST','PATCH'],
    credentials: true
}));


app.use('/api',userRoute)
mongoose.connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});


server.listen(3000,()=>{
    console.log('server is running on port 3000')
})