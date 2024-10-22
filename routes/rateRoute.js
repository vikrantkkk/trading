// routes/rateRoutes.js
const express = require('express');
const { createRate } = require('../controllers/rateController');

const router = express.Router();

router.post('/create', createRate); // Endpoint to create a new rate
// router.get('/rates', getAllRates); // Endpoint to get all rates

module.exports = router;
