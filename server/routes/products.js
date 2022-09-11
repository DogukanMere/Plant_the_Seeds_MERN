const express = require('express');
const asyncHandler = require('express-async-handler');
const { async } = require('rxjs');
const Product = require('../models/productModule');

const router = express.Router();

// GET - /api/products/
// Get all products from DB
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
  })
);

// GET - /api/products/:id
// Get specific product with its id param
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  })
);

// POST - /api/products/
// Add a new data to Db

// DELETE - /api/products/:id
// Delete a data from Db

// PATCH - /api/products/:id
// Update a data in Db

module.exports = router;
