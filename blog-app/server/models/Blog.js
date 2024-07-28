const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    autherInfo: {
        type:Object,
        required: true,
        default: {}
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Blog', blogSchema);
