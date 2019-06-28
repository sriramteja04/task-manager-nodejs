const mongoose = require('mongoose');

//connection String
mongoose.connect(
  'mongodb://127.0.0.1:27017/task-manager-api',
  {
    useNewUrlParser: true,
    useCreateIndex: true
  },
  () => {
    console.log('MongoDB Connected...');
  }
);
