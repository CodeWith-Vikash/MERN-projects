const express= require('express')
const mongoose= require('mongoose')
const userRoute= require('./routes/userRoute')

const app= express()
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/rpc-game').then(()=>{
    console.log('connected to mongodb')
})

app.get('/',(req,res)=>{
    res.send('rpc server is running..')
})
app.use('/api',userRoute)
app.listen(3000,()=>{
    console.log('app is running on port 3000')
})