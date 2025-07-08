const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const Customer = require('../models/customer.model');
const OrderDetail =require('../models/orderDetail.model');
// Get all orders
router.get('/all', async (req, res) => {
  try {
    const orders = await Order.find().populate('customerId', 'firstName lastName').exec();
    const formattedOrders = orders.map(order => ({
      _id: order._id,
      customerId: {
        _id: order.customerId._id,
        firstName: order.customerId.firstName,
        lastName: order.customerId.lastName
      },
      orderDate: order.orderDate,
      totalPrice: order.totalPrice,
      status: order.status
    }));
    res.json(formattedOrders);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete an order by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get details of an order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('customerId', 'firstName lastName').exec();
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    const formattedOrder = {
      _id: order._id,
      customerId: {
        _id: order.customerId._id,
        firstName: order.customerId.firstName,
        lastName: order.customerId.lastName
      },
      orderDate: order.orderDate,
      totalPrice: order.totalPrice,
      status: order.status
    };
    res.json(formattedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.get('/customer/:orderId', async (req, res) => {
    try {
      // Find the order by its ID
      const order = await Order.findById(req.params.orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Get the customer ID from the order
      const customerId = order.customerId;
      if (!customerId) {
        return res.status(404).json({ message: 'Customer not found for this order' });
      }
  
      // Find the customer details using the customer ID
      const customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      res.json(customer);
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
  });
  


  router.get('/orderlist/:orderId', async (req, res) => {
    try {
        // Find all orders with the given orderId
        const orders = await OrderDetail.find({ orderId: req.params.orderId });
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Orders not found for this orderId' });
        }

        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = router;
