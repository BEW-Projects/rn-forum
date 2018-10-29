const mongoose = require('mongoose');
const ForumSchema = mongoose.Schema({
title: {
    type: String,
    required: true
},
subtitle: {
    type: String,
    required: true
},
category: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Category'

},
postCount: {
  type: Number,
  required: true,
  default: 0
 }
}, { timestamps: true });

module.exports = mongoose.model('Forum', ForumSchema);
