const express= require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const postroute= require('./routes/post')
const userroute= require('./routes/user')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')

const app=express()
app.use(bodyParser.json({ limit: '100mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));

mongoose.connect('mongodb://127.0.0.1:27017/social-media').then(()=>{
    console.log('mongodb connected');
})

app.use(postroute)
app.use(userroute)

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})