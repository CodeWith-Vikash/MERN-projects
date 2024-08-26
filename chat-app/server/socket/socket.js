const express = require('express')
const http= require('http')
const {Server} = require('socket.io')

const app= express()

const server=http.createServer(app)
const io= new Server(server,{
    cors:['http://localhost:5173/'],
    methods:['GET','POST']
})

const chatroom={}
io.on('connection',(socket)=>{
    console.log('a user connected ',socket.id)

    socket.on('chatroom',(user)=>{
        console.log('user: ',user);
        chatroom[user._id]=socket.id
    })

    socket.on('disconnect',()=>{
        console.log('user disconnected',socket.id)
    })
})

module.exports={io,app,server,chatroom}
