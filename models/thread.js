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
  author: {
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

// determine if logged in user is author
ThreadSchema.statics.isAuthor = async function(query, userId) {
  const thread = await this.find({ $and: [{ author: userId }, query] });
  if(thread.length > 0) {
    return true;
  }
  return false;
}

module.exports = mongoose.model('Thread', ThreadSchema);
