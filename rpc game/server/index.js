const express= require('express')
const mongoose= require('mongoose')
const userRoute= require('./routes/userRoute')
const uploadRoute= require('./routes/uploadRoute')
const dotenv= require('dotenv')
const cors= require('cors')

dotenv.config()

const app= express()
app.use(express.json())

app.use(cors({
    origin:['http://localhost:5173'],
    methods:['GET','POST','PATCH','DELETE'],
    credentials:true
}))

mongoose.connect(process.env.CONNECTION_URI).then(()=>{
    console.log('connected to mongodb')
})

app.get('/',(req,res)=>{
    res.send('rpc server is running..')
})
app.use('/api',userRoute)
app.use('/api',uploadRoute)
const port= process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
})