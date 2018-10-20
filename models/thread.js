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
    required: true,
    default: 0
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  locked: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Thread', ThreadSchema);
