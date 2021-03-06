const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = mongoose.Schema({
 firstname: {
     type: String,
     required: true,
     minlength: 2
 },
 lastname: {
     type: String,
     required: true,
     minlength: 2
 },
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
}, accountstatus: {
    type: 'String',
    required: true,
    default: 'active'
}, statusreason: {
    type: 'String',
    required: true
}, statusexpire: {
    type: Date,
    required: true
},
}, { timestamps: true });

// custom validators
UserSchema.path('email').validate(function(v) {
  return validator.isEmail(v);
});

// authenticate a user
UserSchema.statics.authenticate = async function(email, password) {
  const user = await this.find({ email: email }).limit(1).lean();
  if(user.length > 0) {
    const match = await bcrypt.compare(password, user[0].password);
    if(match) {
      delete user[0].password;
      return user[0];
    }
    return Promise.reject(`Invalid Password.`);
  }
  return Promise.reject(`Email not found.`);
}

// hash the password before saving a new user
UserSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', UserSchema);
