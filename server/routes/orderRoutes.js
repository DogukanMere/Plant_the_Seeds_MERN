const express = require('express');
const {
  addOrderItems,
  getOrderById,
  getOrderList,
  getOrders,
} = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const router = express.Router();

// Routes
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/orderlist').get(protect, getOrderList);
router.route('/:id').get(protect, getOrderById);

module.exports = router;
