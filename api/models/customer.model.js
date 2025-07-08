const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  billing_country: { type: String, required: true },
  billing_firstName: { type: String, required: true },
  billing_lastName: { type: String, required: true },
  billing_companyName: { type: String },
  billing_address: { type: String, required: true },
  billing_city: { type: String, required: true },
  billing_state: { type: String, required: true },
  billing_postcode: { type: String, required: true },
  billing_email: { type: String, required: true },
  billing_phone: { type: String, required: true },
  billing_notes: { type: String },
  shipping_country: { type: String, required: true },
  shipping_firstName: { type: String },
  shipping_lastName: { type: String },
  shipping_companyName: { type: String },
  shipping_address: { type: String },
  shipping_city: { type: String },
  shipping_state: { type: String },
  shipping_postcode: { type: String },
  shipping_email: { type: String },
  shipping_phone: { type: String }
  // Add more fields as needed
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
