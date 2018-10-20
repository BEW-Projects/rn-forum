const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  name: String,
  content: String
});

module.exports = mongoose.model('Post', PostSchema);
