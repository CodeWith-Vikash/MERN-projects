const express= require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const postroute= require('./routes/post')

const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/social-media').then(()=>{
    console.log('mongodb connected');
})

app.use(postroute)

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})