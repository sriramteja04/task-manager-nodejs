require('../src/db/mongoose');
const Tasks = require('../src/models/tasks');

Tasks.findByIdAndDelete('5cfc8018f838a83c88544487')
  .then(result => {
    console.log(result);
    return Tasks.countDocuments({ completed: false });
  })
  .then(result => console.log(result))
  .catch(e => console.log(e));

const find = async id => {
  const remove = await Tasks.findByIdAndDelete(id);
  const doneCount = await Tasks.countDocuments({ completed: false });
  return doneCount;
};
