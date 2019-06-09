const mongoose = require('mongoose');
const validator = require('validator');

//connection String
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
});

//creating Model
const User = mongoose.model('user', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('E-mail is invalid');
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
  password: {
    type: String,
    trim: true,
    minlength: 6,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error("word password shouldn't be used in our password");
      }
    }
  }
});

// //creating instance of a User model
// const me = new User({
//   name: 'prabhath Teja',
//   email: 'prabhathTeja@gmail.com',
//   password: 'pk 12345',
//   age: 26
// });

// //inserting me instance to mongoDB
// me.save()
//   .then(result => console.log(result))
//   .catch(error => console.log(error));

const Task = mongoose.model('tasks', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const task1 = new Task({
  description: '  Do your assignment on React JS     '
});

task1
  .save()
  .then(result => console.log(result))
  .catch(error => console.log(error));
