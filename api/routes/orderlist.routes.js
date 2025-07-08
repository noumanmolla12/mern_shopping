const express = require('express');
const router = express.Router();
const Customer = require('../models/customer.model');
const Order = require('../models/order.model');
const OrderDetails = require('../models/orderDetail.model');

// GET all customer, order, and orderDetail data for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Step 1: Get all customers by userId
    const customers = await Customer.find({ userId });

    // Step 2: For each customer, get their orders
    const customerIds = customers.map((c) => c._id);
    const orders = await Order.find({ customerId: { $in: customerIds } });

    // Step 3: For each order, get their orderDetails
    const orderIds = orders.map((o) => o._id);
    const orderDetails = await OrderDetails.find({ orderId: { $in: orderIds } });

    // Optional: Organize everything nicely
    const response = customers.map((customer) => {
      const customerOrders = orders.filter((o) => o.customerId.toString() === customer._id.toString());
      const ordersWithDetails = customerOrders.map((order) => {
        const details = orderDetails.filter((od) => od.orderId.toString() === order._id.toString());
        return { ...order.toObject(), orderDetails: details };
      });

      return {
        ...customer.toObject(),
        orders: ordersWithDetails
      };
    });

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching user full data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
