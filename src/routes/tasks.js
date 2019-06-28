const express = require('express');
const router = new express.Router();

//Loading Task Model
const Task = require('../models/tasks');

//inserting the tasks to database.
router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch {
    res.status(400).send();
  }
});

//fetching all tasks from the database
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

//fetching a specific user from the database
router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//updating a task from database
router.patch('/tasks/:id', async (req, res) => {
  const reqkeys = Object.keys(req.body);
  const dbKeys = ['completed', 'description'];

  const isrequired = reqkeys.every(req => dbKeys.includes(req));

  if (!isrequired) {
    return res.status(400).send();
  }

  try {
    const task = await Task.findById(req.params.id);
    reqkeys.forEach(key => (task[key] = req.body[key])); //lookat reqKeys * only keys from req.body
    await task.save(); //only saving the updating values.

    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });
    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Deleting a task from database.
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
