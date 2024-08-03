const mongoose= require('mongoose')

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:'/user.jfif'
    },
    friends:[{
        userId: String,
        avatar: String
    }]
})

module.exports=mongoose.model('User',userSchema)