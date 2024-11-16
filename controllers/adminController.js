const Transaction = require('../models/Transaction');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.registerCashier = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const cashier = new User({
            username,
            password: hashedPassword,
            role: 'Cashier',
            registeredBy: req.user._id
        });

        await cashier.save();
        res.status(201).json({ message: 'Cashier registered successfully', cashier });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getReports = async (req, res) => {
    try {
        const { period } = req.query;
        const now = new Date();
        let startDate;

        if (period === 'daily') {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        } else if (period === 'monthly') {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        } else if (period === 'yearly') {
            startDate = new Date(now.getFullYear(), 0, 1);
        } else {
            return res.status(400).json({ message: "Invalid period. Use 'daily', 'monthly', or 'yearly'." });
        }

        const transactions = await Transaction.find({ timestamp: { $gte: startDate } })
            .populate('cashierId', 'username')
            .populate('adminId', 'username');

        res.json({ period, transactions });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
