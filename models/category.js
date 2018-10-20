const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: false,
    default: 0
  },
  color: {
    type: String,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
