const Transaction = require('../models/Transaction');

exports.logTransaction = async (req, res) => {
    try {
        const { amount, type } = req.body;

        if (req.user.role !== 'Cashier') {
            return res.status(403).json({ message: "Only cashiers can log transactions" });
        }

        const transaction = new Transaction({
            cashierId: req.user._id,
            adminId: req.user.registeredBy,
            amount,
            type
        });

        await transaction.save();
        res.status(201).json({ message: "Transaction logged successfully", transaction });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
