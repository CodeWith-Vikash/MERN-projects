const express= require('express')
const mongoose= require('mongoose')
const cors= require('cors')
const authRoute= require('./routes/authRoute')
const blogRoute= require('./routes/blogRoute')

const app= express()

mongoose.connect('mongodb+srv://vikashkumardev87:KkEWoMugcF7eWySu@cluster0.pu8wd3s.mongodb.net/').then(()=>{
    console.log('mongodb connected');
})
// mongoose.connect('mongodb://127.0.0.1:27017/blog-app').then(()=>{
//     console.log('mongodb connected');
// })

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())
app.use(authRoute)
app.use(blogRoute)


app.listen(3000,()=>{
    console.log('server is running on port 3000');
})