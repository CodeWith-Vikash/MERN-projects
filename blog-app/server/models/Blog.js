const mongoose= require('mongoose')

const blogSchema= mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true,
    },
})

module.exports= mongoose.model('blog',blogSchema)