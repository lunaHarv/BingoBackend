const express = require('express');
const router = express.Router();
const { logTransaction } = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/log-transaction', authMiddleware(['Cashier']), logTransaction);

module.exports = router;
