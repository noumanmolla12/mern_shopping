// routes/admin.route.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin.model');

// POST - Create admin
router.post('/add-admin', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ firstName, lastName, email, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - All admins
router.get('/all', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET - Single admin by ID
router.get('/single-admin/:id', async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// UPDATE admin
router.put('/update/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const updateData = { firstName, lastName, email };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedAdmin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



// DELETE - Delete admin
router.delete('/delete/:id', async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: 'Admin deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
