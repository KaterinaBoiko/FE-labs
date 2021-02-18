const express = require('express');
const router = express.Router();
const ratesController = require('./rates.controller');

router.get('/rate/:date', ratesController.getRateByDate);

module.exports = router;