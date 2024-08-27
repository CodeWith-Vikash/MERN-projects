const mongoose=require('mongoose')

const roomSchema= mongoose.Schema({
    userId: {type: String, required:true},
    socketId: {type: String, required:true}
})

module.exports= mongoose.model('Room',roomSchema)