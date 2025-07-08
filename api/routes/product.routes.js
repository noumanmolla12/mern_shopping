const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/product.model');
const path = require('path');

// Middleware to enable CORS
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow the specified HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Allow the specified headers
  next();
});

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where you want to store uploaded images
  },
  filename: function (req, file, cb) {
    // Log the file name here
    console.log('File name:', file.originalname);
    // Use a unique filename to avoid overwriting
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route to add a new product with image upload
router.post('/add-product', upload.array('product_image', 5), async (req, res) => {
  try {
    const { category, productName, description, price } = req.body;
    let imageNames = [];

    console.log('Request body:', req.body);
    console.log('Uploaded files:', req.files);

    if (req.files && req.files.length > 0) {
      // Get an array of names for the uploaded images, removing the 'uploads\' part
      imageNames = req.files.map(file => path.basename(file.path));
    }

    console.log('Image names:', imageNames);

    const newProduct = new Product({
      category,
      productName,
      description,
      price,
      product_images: imageNames // Save the array of image names in the database
    });

    console.log('New product:', newProduct);

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Route to fetch all products
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete a product by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.put('/update/:id', upload.array('product_images', 5), async (req, res) => {
  try {
    const productId = req.params.id;
    const { category, productName, description, price } = req.body;
    let updatedProductData = {
      category,
      productName,
      description,
      price
    };


    // console.log('FILESS',req.files)
     

    if (req.files && req.files.length > 0) {
      // If new images are uploaded, update the product_images field
      updatedProductData.product_images = req.files.map(file => file.filename);
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });
   
   
    console.log('UPPP',updatedProduct)

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/category/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await Product.find({ category: categoryId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
