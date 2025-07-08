const mongoose = require('mongoose');

const orderDetailsSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: {
    type: [{ type: String, required: true }],
    validate: [arrayMinLength, 'Images array must contain at least one image URL']
  },
  quantity: { type: Number, required: true },
  // Add more fields as needed
});

// Custom validator function to ensure images array contains at least one image URL
function arrayMinLength(val) {
  return val.length >= 1;
}

const OrderDetails = mongoose.model('OrderDetails', orderDetailsSchema);

module.exports = OrderDetails;
