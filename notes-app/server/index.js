const express= require('express')
const app= express()
const mongoose= require('mongoose')
const cors= require('cors')
const router= require('./routes/notesRoutes')

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/notes-app').then(()=>{
    console.log('mongodb connected');
}).catch(()=>{
    console.log('smething went wrong while connectig to mongodb');
})

app.use(router)

app.listen(3000,()=>{
    console.log('sever is runnig on port 3000');
})