const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderComponents: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      postalCode: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, require: true },
      country: { type: String, required: true },
    },
    taxCost: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalCost: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isReady: {
      type: String,
      required: true,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidDate: {
      type: Date,
    },
    deliveredDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
