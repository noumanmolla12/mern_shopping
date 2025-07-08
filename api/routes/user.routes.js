const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User.model');

// CREATE user
router.post('/add-user', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      dateOfBirth,
      phoneNumber,
      address,
      companyName,
      preferredLanguage
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      dateOfBirth,
      phoneNumber,
      address,
      companyName,
      preferredLanguage
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// GET all users (excluding password)
router.get('/all', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET single user by ID (excluding password)
// router.get('/single-user/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select('-password');
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// UPDATE user
router.put('/update/:id', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      dateOfBirth,
      phoneNumber,
      address,
      companyName,
      preferredLanguage
    } = req.body;

    const updateData = {
      firstName,
      lastName,
      email,
      gender,
      dateOfBirth,
      phoneNumber,
      address,
      companyName,
      preferredLanguage
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE user
router.delete('/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//http://localhost:8080/user/userprofile/
// // Express route (Node.js backend)
router.get('/userprofile/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  res.json(user);
});


// PUT /user/:id
router.put('/update-userprofile/:id', async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE /user/:id
router.delete('/delete-userprofile/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted successfully' });
});


module.exports = router;
