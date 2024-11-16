const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const validateInput = require('../middleware/validateInput');
const User = require('../models/User');

// Login
router.post('/login', validateInput(['username', 'password']), login);

// Get all users (Admin/SystemAdmin only)
router.get('/users', authMiddleware(['Admin', 'SystemAdmin']), async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
