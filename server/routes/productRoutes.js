const express = require('express');
const {
  getProducts,
  getProduct,
  deleteProduct,
} = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const router = express.Router();

// Routes
router.route('/').get(getProducts);
router.route('/:id').get(getProduct).delete(protect, admin, deleteProduct);

module.exports = router;
