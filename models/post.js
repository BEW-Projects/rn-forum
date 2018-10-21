const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  postNumber: {
    type: Number,
    required: true,
    default: 0
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  removed: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true });

PostSchema.pre('save', async function() {
  this.postNumber = await this.constructor.count() + 1;
})

module.exports = mongoose.model('Post', PostSchema);
