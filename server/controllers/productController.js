const Product = require('../models/productModule');
const mongoose = require('mongoose');

// GET - /api/products/
// Get all products from DB
const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ price: 1 });
  res.status(200).json(products);
};

// GET - /api/products/:id
// Get specific product with its id param
const getProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return await res.status(404).json({ error: 'No such product' });
  }

  const product = await Product.findById(id);
  res.status(200).json(product);
};

// POST - /api/products/
// Add a new data to Db

// DELETE - /api/products/:id
// Delete a data from Db

// PATCH - /api/products/:id
// Update a data in Db

module.exports = {
  getProducts,
  getProduct,
};
