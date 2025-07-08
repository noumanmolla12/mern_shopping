const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName:     { type: String, required: true },
  lastName:      { type: String, required: true },
  email:         { type: String, required: true, unique: true },
  password:      { type: String, required: true },
  
  // Optional Fields
  gender:            { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },
  dateOfBirth:       { type: Date },
  phoneNumber:       { type: String },
  address:           { type: String }, // or use a nested object if detailed address is needed
  companyName:       { type: String },
  preferredLanguage: { type: String, default: 'en' }

}, { timestamps: true });

// Export model (avoids overwrite error in development)
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
