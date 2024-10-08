const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.post('/', (req, res) => {
    const { title, text, image, autherInfo } = req.body;
    Blog.create({
        title,
        text,
        image,
        autherInfo
    }).then((result) => {
        return res.status(200).json({ message: 'blog created', data: result });
    }).catch((err) => {
        return res.status(500).json({ message: 'error while creating a blog', error: err });
    });
});

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json('server error while fetching blogs');
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const { title, text, image } = req.body;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, { title, text, image }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json('blog not found');
        }
        res.status(200).json({ message: 'update successful', data: updatedBlog });
    } catch (error) {
        res.status(500).json('server error while updating blog');
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json('blog not found');
        }
        res.status(200).json({ message: 'delete successful', data: deletedBlog });
    } catch (error) {
        res.status(500).json('server error while deleting blog');
    }
});

module.exports = router;
