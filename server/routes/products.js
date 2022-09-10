const express = require('express');
const products = require('../data/products');

const router = express.Router();

// GET - /api/products/
// Get all products from DB
router.get('/', (req, res) => {
  res.json(products);
});

// GET - /api/products/:id
// Get specific product with its id param
router.get('/:id', (req, res) => {
  const product = products.find((item) => item._id === req.params.id);
  res.send(product);
});

// POST - /api/products/
// Add a new data to Db

// DELETE - /api/products/:id
// Delete a data from Db

// PATCH - /api/products/:id
// Update a data in Db

module.exports = router;
