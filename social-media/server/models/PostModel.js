const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  userInfo: {
    avatar: { type: String, required: true },
    username: { type: String, required: true },
    userId: { type: String, required: true },
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  likes: [
    {
      username: String,
      userId: String,
    },
  ],
  comments: [
    {
      username: String,
      avatar: String,
      comment: String,
      userId: String,
      replies: [
        {
          username: String,
          avatar: String,
          comment: String,
          userId: String,
          replyDate: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      commentDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  postDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
