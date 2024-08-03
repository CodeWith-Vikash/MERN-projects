const express = require('express');
const router = express.Router();
const postModel = require('../models/PostModel');

router.get('/posts', async (req, res) => {
    try {
        const data = await postModel.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching posts', error });
    }
});

router.post('/posts', async (req, res) => {
    const { userInfo, title, image, likes, comments } = req.body;
    try {
        const postedData = new postModel({
            userInfo,
            title,
            image,
            likes,
            comments
        });
        const savedPost = await postedData.save();
        res.status(201).json({ message: 'Post saved', data: savedPost });
    } catch (error) {
        res.status(500).json({ message: 'Server error while posting', error });
    }
});

router.patch('/post/:id/comment', async (req, res) => {
    const { username, avatar, comment,userId } = req.body;
    const id = req.params.id;
    try {
        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json('Post not found');
        }
        post.comments.push({ username, avatar, comment,userId });
        const updatedData = await post.save();
        res.status(200).json({ message: 'Update success', data: updatedData });
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating post', error });
    }
});

router.patch('/post/:id/like', async (req, res) => {
    const { username, userId } = req.body;
    const id = req.params.id;
    try {
        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json('Post not found');
        }

        const likedPostIndex = post.likes.findIndex((like) => like.userId === userId);
        if (likedPostIndex !== -1) {
            // Remove the like if it exists
            post.likes.splice(likedPostIndex, 1);
        } else {
            // Add the like if it doesn't exist
            post.likes.push({ username, userId });
        }

        const updatedData = await post.save();
        res.status(200).json({ message: 'Update success', data: updatedData });
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating post', error });
    }
});

module.exports = router;
