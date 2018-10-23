const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

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
    enum: [0, 1, 2, 3],
    required: true,
    default: 0   // 0 - User, 1 - Moderator, 2 - Developer, 3 - Administrator
  }
});

// custom validators
UserSchema.path('email').validate(function(v) {
  return validator.isEmail(v);
})

// authenticate a user
UserSchema.statics.authenticate = async function(email, password) {
  const user = await this.find({ email: email }).limit(1).lean();
  if(user.length == 0) {
    return new Error(`Email not found.`);
  }
  const match = await bcrypt.compare(password, user[0].password);
  if(match) {
    return user[0];
  }
  return new Error(`Invalid Password.`);
}

module.exports = mongoose.model('User', UserSchema);
