const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');
const User = require('../models/User');

// Middleware to validate JWT and roles
module.exports = (roles) => async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token required." });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findById(decoded.id);

        if (!user || (roles && !roles.includes(user.role))) {
            return res.status(403).json({ message: "Forbidden: Access denied." });
        }

        req.user = user; // Attach user to request
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token." });
    }
};

module.exports = (fields) => (req, res, next) => {
    const errors = [];

    fields.forEach(field => {
        if (!req.body[field]) {
            errors.push(`${field} is required.`);
        }
    });

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = (roles) => async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findById(decoded.id);

        if (!user || (roles && !roles.includes(user.role))) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
