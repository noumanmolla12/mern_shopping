const express = require('express');
const multer = require('multer');
const blogExpressRoute = express.Router();
const BlogSchema = require('../models/blog.model');

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Get all blogs
blogExpressRoute.get('/all', async (req, res) => {
  try {
    const data = await BlogSchema.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a blog by ID
blogExpressRoute.get('/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await BlogSchema.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new blog
blogExpressRoute.post('/add-blog', upload.array('blog_images', 5), async (req, res) => {
  try {
    const data = new BlogSchema({
      blog_name: req.body.blog_name,
      blog_description: req.body.blog_description,
      blog_images: req.files.map(file => file.filename),
      date: new Date() // Adding the current date
    });

    const dataToSave = await data.save();
    res.status(201).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a blog by ID
blogExpressRoute.put('/update-blog/:id', upload.array('blog_images', 5), async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Check if new images were uploaded
    if (req.files && req.files.length > 0) {
      updatedData.blog_images = req.files.map(file => file.filename);
    }

    const options = { new: true };
    const result = await BlogSchema.findByIdAndUpdate(id, updatedData, options);

    if (!result) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a blog by ID
blogExpressRoute.delete('/del-blog/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await BlogSchema.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: `Document with ${data.name} has been deleted.` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = blogExpressRoute;
