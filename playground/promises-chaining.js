require('../src/db/mongoose');
const User = require('../src/models/users');

// User.findByIdAndUpdate('5cfc9fe2c4af8d2c84cb32a2', { age: 24 })
//   .then(user => {
//     console.log(user);
//     return User.countDocuments({ age: 24 });
//   })
//   .then(user => console.log(user))
//   .catch(e => console.log(e));

const find = async (id, age) => {
  const result = await User.findByIdAndUpdate(id, {
    age: age
  });
  const count = await User.countDocuments({ age: age });
  return count;
};

find('5cfc9fe2c4af8d2c84cb32a2', 25)
  .then(result => console.log(result))
  .catch(e => console.log(e));
