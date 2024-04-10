const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, phone, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send('Email already in use');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({ name, phone, email, password: hashedPassword, role });
    await user.save();

    res.status(201).send({result: true, message: 'User created successfully'});
  } catch (error) {
    res.status(500).send({result: false, message: error.message});
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({result: false, message: 'Invalid credentials'});
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({result: false, message: 'Invalid credentials'});
    }

    // Generate token
    const token = jwt.sign({ id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).send({result: false, message: error.message});
  }
});

module.exports = router;
