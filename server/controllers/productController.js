const Product = require('../models/productModule');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

// GET - /api/products/
// Get all products from DB
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ price: 1 });
  res.status(200).json(products);
});

// GET - /api/products/:id
// Get specific product with its id param
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error('No such product');
  }

  const product = await Product.findById(id);
  res.status(200).json(product);
});

// POST - /api/products/
// Add a new product to Db
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpeg',
    availableInStock: 0,
    description: 'sample description',
    growTime: 90,
    yield: '5-10 days',
  });

  const newProduct = await product.save();
  res.status(201).json(newProduct);
});

// DELETE - /api/products/:id
// Delete a data from Db - Private-Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product successfully deleted' });
  } else {
    res.status(404);
    throw new Error('Product not found!');
  }
});

// PUT - /api/products/:id
// Update a product in Db
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, availableInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.availableInStock = availableInStock;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found!');
  }
});

module.exports = {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
};
