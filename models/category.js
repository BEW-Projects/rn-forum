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
});

module.exports = mongoose.model('Category', CategorySchema);
