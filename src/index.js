const express = require('express');

const app = express();
const port = process.env.port || 8089;

const User = require('./models/users');

app.use(express.json());

app.post('/users', (req, res) => {
  console.log(req.body);
  res.send('testing');
});

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
