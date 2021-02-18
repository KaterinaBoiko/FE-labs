const axios = require('axios');
const formatDate = require("dateformat");

exports.getRateByDate = (req, res) => {
    const { date } = req.params;
    axios.get(`https://api.privatbank.ua/p24api/exchange_rates?json&date=${ date }`)
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

    axios.get(`https://api.privatbank.ua/p24api/exchange_rates?json&date=${ date }`, { params })
        .then(response => {
            const { exchangeRate } = response.data;
            const pair = exchangeRate
                .find(pair => (pair.baseCurrency === base_currency && pair.currency === currency)
                    || (pair.baseCurrency === currency && pair.currency === base_currency));

            const rate_nb = pair.saleRateNB;
            const revert_base = pair.baseCurrency === base_currency;
            const body = {
                result: revert_base ? amount * rate_nb : amount / rate_nb,
                rate: revert_base ? rate_nb : 1 / rate_nb,
                reverted_rate: revert_base ? 1 / rate_nb : rate_nb
            };
            res(null, body);
        })
        .catch(err => {
            res(err);
        });
};

exports.getCurrencyPairs = (req, res) => {
    const date = formatDate(new Date(), "d.m.yyyy");
    axios.get(`https://api.privatbank.ua/p24api/exchange_rates?json&date=${ date }`)
        .then(response => {
            const { data } = response;
            const pairs = data.exchangeRate
                .map(record => {
                    const { baseCurrency, currency } = record;
                    return { baseCurrency, currency };
                })
                .filter(pair => pair.baseCurrency && pair.currency);
            res(null, pairs);
        })
        .catch(err => {
            res(err.response);
        });
};