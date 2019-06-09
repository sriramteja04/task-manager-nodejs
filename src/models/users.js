const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/REST-API-task-manager', {
  useNewUrlParser: true,
  useCreateIndex: true
});

const User = mongoose.model('users', {
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is inValid, Please try another email');
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('word password is now allowed to in your password');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age should be a positive number');
      }
    }
  }
});

module.exports = User;
