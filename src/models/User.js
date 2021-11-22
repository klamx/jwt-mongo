const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

userSchema.methods.validatePassword = function (password) {
  return this.password === password;
};

module.exports = model('User', userSchema);
