const express = require('express');
const {
  addOrderItems,
  getOrderById,
  getOrderList,
} = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.route('/').post(protect, addOrderItems);
router.route('/orderlist').get(protect, getOrderList);
router.route('/:id').get(protect, getOrderById);

module.exports = router;
