const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Customer = require('../models/customer.model');
const Order = require('../models/order.model');
const OrderDetails = require('../models/orderDetail.model');

router.post('/checkout', async (req, res) => {
  try {
    const {
      userId, // ✅ Include userId
      billing_firstName,
      billing_lastName,
      billing_companyName,
      billing_address,
      billing_city,
      billing_state,
      billing_postcode,
      billing_email,
      billing_phone,
      billing_notes,
      billing_country,
      shipping_firstName,
      shipping_lastName,
      shipping_companyName,
      shipping_address,
      shipping_city,
      shipping_state,
      shipping_postcode,
      shipping_email,
      shipping_phone,
      shipping_country,
      cartDetails
    } = req.body;

    // ✅ Validate userId (optional)
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid or missing userId' });
    }

    // ✅ Parse cartDetails
    let cartDetailsObj;
    try {
      cartDetailsObj = JSON.parse(cartDetails);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid cartDetails JSON format' });
    }

    // ✅ Calculate total price
    let totalPrice = 0;
    if (typeof cartDetailsObj === 'object' && cartDetailsObj !== null) {
      for (const productId of Object.keys(cartDetailsObj)) {
        const product = cartDetailsObj[productId];
        totalPrice += parseFloat(product.price) * parseInt(product.quantity);
      }
    } else {
      return res.status(400).json({ error: 'Cart details are not in the expected format' });
    }

    // ✅ Create Customer document
    const customer = new Customer({
      userId, // Save userId reference
      billing_country,
      billing_firstName,
      billing_lastName,
      billing_companyName,
      billing_address,
      billing_city,
      billing_state,
      billing_postcode,
      billing_email,
      billing_phone,
      billing_notes,
      shipping_country,
      shipping_firstName,
      shipping_lastName,
      shipping_companyName,
      shipping_address,
      shipping_city,
      shipping_state,
      shipping_postcode,
      shipping_email,
      shipping_phone
    });
    const savedCustomer = await customer.save();

    // ✅ Create Order
    const order = new Order({
      customerId: savedCustomer._id,
      userId, // Optional: also save userId in Order
      totalPrice: totalPrice,
      status: 'Pending'
    });
    const savedOrder = await order.save();

    // ✅ Create OrderDetails
    const orderDetailsPromises = Object.values(cartDetailsObj).map(async (cartItem) => {
      const { productName, description, price, images, quantity } = cartItem;

      if (!productName || !description || productName.trim() === '' || description.trim() === '') {
        throw new Error('productName and description are required');
      }

      const parsedPrice = parseFloat(price);
      const parsedQuantity = parseInt(quantity);
      if (isNaN(parsedPrice) || isNaN(parsedQuantity)) {
        throw new Error('Invalid price or quantity');
      }

      if (!Array.isArray(images) || images.length === 0 || images.some(url => typeof url !== 'string' || url.trim() === '')) {
        throw new Error('Images array must contain at least one image URL');
      }

      const orderDetails = new OrderDetails({
        orderId: savedOrder._id,
        productName,
        description,
        price: parsedPrice,
        images,
        quantity: parsedQuantity
      });

      return await orderDetails.save();
    });

    const savedOrderDetails = await Promise.all(orderDetailsPromises);

    res.status(201).json({
      message: 'Order placed successfully',
      customer: savedCustomer,
      order: savedOrder,
      orderDetails: savedOrderDetails
    });

  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
