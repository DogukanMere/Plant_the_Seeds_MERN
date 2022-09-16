const express = require('express');
const { getProducts, getProduct } = require('../controllers/productController');

const router = express.Router();

// Routes
router.route('/').get(getProducts);
router.route('/:id').get(getProduct);

module.exports = router;
