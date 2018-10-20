const mongoose = require('mongoose');

const ThreadSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  postCount: {
    type: Number,
    required: false,
    default: 0
  },
  locked: {
    type: Boolean,
    required: false,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Thread', ThreadSchema);
