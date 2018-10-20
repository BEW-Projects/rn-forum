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
  authorId: {
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

PostSchema.pre('save', function() {
  this.postNumber = this.postCount() + 1;
})

PostSchema.statics.postCount = function() {
  this.find().then(res => return res.length);
}


module.exports = mongoose.model('Post', PostSchema);
