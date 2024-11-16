const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { jwtSecret } = require('../config/config');

// Login a user
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Input validation
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1d' });

        res.status(200).json({ message: "Login successful", token, user: { id: user._id, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
