const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chatRoute=require('./routes/chatRoute')
const userRoute=require('./routes/userRoute')
const uploadRoute=require('./routes/uploadRoute')

dotenv.config();
const app = express();
app.use(express.json());

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

app.use('/api',userRoute)
app.use('/api',chatRoute)
app.use('/api',uploadRoute)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
