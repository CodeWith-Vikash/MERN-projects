const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');
const path = require('path');

const router = express.Router();
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Configure Multer to use Cloudinary with timestamp in public_id
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'techstuff', // Specify folder in Cloudinary
    resource_type: 'auto', // Automatically determine resource type (image, video, raw, etc.)
    public_id: (req, file) => {
      const timestamp = Date.now(); // Get current timestamp
      const fileName = path.parse(file.originalname).name; // Extract file name without extension
      return `${fileName}-${timestamp}`; // Return file name with timestamp appended
    },
  },
});

const upload = multer({ storage });

// Route to handle file upload
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    // The uploaded file's Cloudinary info is available in req.file
    res.json({
      message: 'File uploaded successfully',
      url: req.file.path, // Cloudinary URL of the uploaded file
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

module.exports = router;
