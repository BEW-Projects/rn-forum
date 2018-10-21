const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
    minlength: 6
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    minlength: 6
  },
  role: {
    type: Number,
    required: true,
    default: 0   // 0 - User, 1 - Moderator, 2 - Developer, 3 - Administrator
  }
});

module.exports = mongoose.model('User', UserSchema);
