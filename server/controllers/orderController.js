const Order = require('../models/orderModule');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const { create } = require('../models/orderModule');

// POST - /api/orders/
// Create new order | Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderComponents,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderComponents && orderComponents.length === 0) {
    res.status(400);
    throw new Error('There is no item to order');
  } else {
    const order = new Order({
      orderComponents,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// GET - /api/orders/:id
// Get order by id| Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found!');
  }
});

// GET - /api/orders/orderlist
// Get logged in user orders| Private - Admin
const getOrderList = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

// GET - /api/orders
// Get all orders from db | Private - Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');

  res.json(orders);
});

module.exports = { addOrderItems, getOrderById, getOrderList, getOrders };
