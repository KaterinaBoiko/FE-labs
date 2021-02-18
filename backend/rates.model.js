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

exports.convert = (req, res) => {
    const { amount, currency, base_currency } = req.query;

    if (isNaN(amount))
        return res('Invalid amount');

    const date = formatDate(new Date(), "d.m.yyyy");
    const params = { currency, base_currency };

    axios.get(`https://api.privatbank.ua/p24api/exchange_rates?json&date=${date}`, { params })
        .then(response => {
            console.log(response);
            const rate_nb = response.data.rate_nb;
            const base_currency_db = response.data.base_currency;

            const body = {
                result: base_currency === base_currency_db ? amount * rate_nb : amount / rate_nb,
                rate: base_currency === base_currency_db ? rate_nb : 1 / rate_nb,
                reverted_rate: base_currency === base_currency_db ? 1 / rate_nb : rate_nb
            };

            res(null, body);
        })
        .catch(err => {
            res(err.response);
        });
};

exports.getCurrencyPairs = (req, res) => {
    const date = formatDate(new Date(), "d.m.yyyy");

    axios.get(`https://api.privatbank.ua/p24api/exchange_rates?json&date=${date}`)
        .then(response => {
            console.log(response);
            res(null, response.data);
        })
        .catch(err => {
            res(err.response);
        });
};