const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    unique: true, // creates an unique email
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
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

//@ a function which resists returning password and list of tokens.
userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// @ description: Used to create a web token
// @ params:      this function was called with user instance
// @ return:      an object with a token and the user that has been saved to database with the generated token
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'sriramteja');

  user.tokens = user.tokens.concat({ token: token });
  await user.save();
  return token;
};

// @description: Comparing the hash passwords.
// @params:      user password and user email.
// @return:      returns a user back if verified or sends an error.
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('unable to Login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to Login');
  }

  return user;
};

//Mongoose middleware to hash the password
userSchema.pre('save', async function(next) {
  const user = this; // this refer to document here

  if (user.isModified('password')) {
    //making sure that wheather a password is in body or not
    // If it has the password then encrypt the updated password too.
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//creating User Models
const User = mongoose.model('users', userSchema);

module.exports = User;
