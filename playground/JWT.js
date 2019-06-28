const jwt = require('jsonwebtoken');

const myFunction = async () => {
  const token = jwt.sign({ _id: 'abc123' }, 'thisismynewNodecourse', { expiresIn: '2 seconds' }); // returns a token
  console.log(token);
  const data = jwt.verify(token, 'thisismynewNodecourse');
  console.log(data);
};
myFunction();
