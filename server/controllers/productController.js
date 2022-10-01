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
// Add a new data to Db

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

// PATCH - /api/products/:id
// Update a data in Db

module.exports = {
  getProducts,
  getProduct,
  deleteProduct,
};
