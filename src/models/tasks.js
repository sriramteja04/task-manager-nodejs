const mongoose = require('mongoose');
const validator = require('validator');

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

module.exports = Task;

// const task1 = new Task({
//   description: '  Do your assignment on React JS     '
// });

// task1
//   .save()
//   .then(result => console.log(result))
//   .catch(error => console.log(error));
