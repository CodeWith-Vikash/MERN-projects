const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  content: { type: String },
  mediaUrl: { type: String },
  contentType: {
    type: String,
    enum: ['text', 'image', 'video', 'file'],
    default: 'text',
  }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
