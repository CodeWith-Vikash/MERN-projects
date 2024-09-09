const express = require('express')
const app = express()
const uploadRoute= require('./routes/uploadRoute')
const userRoute= require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const cors = require('cors')
const dotenv= require('dotenv')
const mongoose= require('mongoose')
const cookieParser= require('cookie-parser')

dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin :['http://localhost:5173'],
    methods:['GET','POST','PATCH'],
    credentials:true
}))

mongoose.connect(process.env.CONNECTION_URI).then(()=>{
    console.log("mongodb connected")
})

app.get('/',(req,res)=>{
    // res.cookie("name","vikash")
    res.send('server is working')
})



app.use('/api',uploadRoute)
app.use('/api',userRoute)
app.use('/api',productRoute)
const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log("server is running on port "+port)
})