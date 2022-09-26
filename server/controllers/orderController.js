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

module.exports = { addOrderItems };
