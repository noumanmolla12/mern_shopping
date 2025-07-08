const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', 
        default: null 
      },

  categoryName: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
});

module.exports = mongoose.model('Category', categorySchema);
