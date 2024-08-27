const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chatRoute=require('./routes/chatRoute')
const userRoute=require('./routes/userRoute')
const uploadRoute=require('./routes/uploadRoute')
const {server,app,io}= require('./socket/socket')
const cors= require('cors')


dotenv.config();

app.use(cors({
    origin: "https://hello-chat-app-client.vercel.app",
    credentials: true, // Allow cookies and credentials to be sent
}));



mongoose.connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.use(express.json())
app.use('/api',userRoute)
app.use('/api',chatRoute)
app.use('/api',uploadRoute)
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
