const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const User = require('../models/users');

//inserting the users to database and a signup form.
router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    const user = await user.save();
    const token = user.generateAuthToken();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// @ User Login route
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

// User log Out
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    }); // making sure the token was removed from list of tokens while logging out
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//User Logout to delete all tokens
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.status(200).send({ message: 'deleted all tokens' });
  } catch (error) {
    res.status(500).send({ error: 'tokens are unable to delete' });
  }
});

//fetching one user from database.
router.get('/users/me', auth, (req, res) => {
  res.send(req.user);
});

//updating the user in the database
router.patch('/users/:id', async (req, res) => {
  const reqKeys = Object.keys(req.body);
  const requiredKeys = ['name', 'email', 'password', 'age'];

  const isRequired = reqKeys.every(value => requiredKeys.includes(value));

  if (!isRequired) {
    return res.status(404).send();
  }

  try {
    const user = await User.findById(req.params.id);

    reqKeys.forEach(reqKey => (user[reqKey] = req.body[reqKey]));

    await user.save(); //mongoose middlewares will be executed before saving.`

    // const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });
    if (!user) {
      return res.status(400).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//deleting a user from database.
router.delete('/users/me', auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id);

    // if (!user) {
    //   return res.status(404).send();
    // }

    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// @User Signup Route
router.post('/users/signup', async (req, res) => {
  const newUser = new User(req.body);
  const userObj = await newUser.generateAuthToken();
  res.send(userObj);
});

module.exports = router;
