const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },

  mobileNo: {
    type: Number,
    min: 10,
    required: true,
  },

  walletMoney: {
    type: Number,
    default: 0,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  // boardList: {
  //     type: Array,
  //     required: false,
  // }
});

UserSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('user', UserSchema);
module.exports = User;
