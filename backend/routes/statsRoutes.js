const express = require('express');
const router = express.Router();
const { getDashboardStats, triggerSeedData } = require('../controllers/statsController');

router.get('/dashboard', getDashboardStats);
router.post('/seed', triggerSeedData);

module.exports = router;
