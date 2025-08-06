const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create User
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Read All Users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update User
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete User
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send({ message: 'User deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
