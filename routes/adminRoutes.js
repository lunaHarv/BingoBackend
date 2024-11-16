const express = require('express');
const router = express.Router();
const { registerCashier, getReports } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register-cashier', authMiddleware(['Admin']), registerCashier);
router.get('/reports', authMiddleware(['Admin', 'SystemAdmin']), getReports);

module.exports = router;
