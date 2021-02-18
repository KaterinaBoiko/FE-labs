const express = require('express');
const router = express.Router();
const ratesController = require('./rates.controller');

router.get('/rate/:date', ratesController.getRateByDate);
router.get('/convert', ratesController.convert);
router.get('/currency-pairs', ratesController.getCurrencyPairs);

module.exports = router;