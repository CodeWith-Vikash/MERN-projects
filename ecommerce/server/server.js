const express = require('express')
const app = express()
const uploadRoute= require('./routes/uploadRoute')
const cors = require('cors')


app.use(cors({
    origin :['http://localhost:5173'],
    methods:['GET','POST','PATCH'],
    credentials:true
}))

app.get('/',(req,res)=>{
    res.send('server is working')
})



app.use('/api',uploadRoute)
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})