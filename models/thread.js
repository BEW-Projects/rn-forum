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
  category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category'

  },
  locked: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true });

// determine if logged in user is author
ThreadSchema.statics.isAuthor = async function(req) {
  if(!req.session.user || !req.query) return false;
  const thread = await this.find({ $and: [{ author: req.session.user._id }, req.query] });
  if(thread.length > 0) {
    return true;
  }
  return false;
}

module.exports = mongoose.model('Thread', ThreadSchema);
