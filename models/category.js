const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true,
    default: 0
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  color: {
    type: String,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
