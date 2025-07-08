const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  orderDate: { type: Date, default: Date.now },
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending' }, // Possible values: Pending, Processing, Completed, Cancelled, etc.
  // Add more fields as needed
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
 