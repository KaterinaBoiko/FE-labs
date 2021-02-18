const axios = require('axios');

exports.getRateByDate = (req, res) => {
    const { date } = req.params;
    axios.get(`https://api.privatbank.ua/p24api/exchange_rates?json&date=${date}`)
        .then(response => {
            res(null, response.data.exchangeRate);
        })
        .catch(err => {
            res(err.response);
        });
};