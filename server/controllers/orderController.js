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
    console.log(req);
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

module.exports = { addOrderItems, getOrderById };
