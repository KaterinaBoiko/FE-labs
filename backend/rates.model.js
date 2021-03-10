const axios = require('axios');
const sql = require('./connection');
const formatDate = require("dateformat");

exports.getRateByDate = (req, res) => {
    const { date } = req.params;
    axios.get(`https://api.privatbank.ua/p24api/exchange_rates?json&date=${ date }`)
        .then(response => {
            console.log(response.data.exchangeRate);
            response.data.exchangeRate.forEach(row => {
                const { base_currency, currency } = response.data.exchangeRate;
                sql.query(`select id from currency_pairs where base_currency='${ base_currency }' and currency = '${ currency }'`, (err, result) => {
                    if (err || !result.rowCount)
                        return;

                    sql.query(`INSERT INTO exchange_rates (currency_pair_id, rate_nb, sale_privat, purchase_privat, date)` +
                        `values (${ result.rows[ 0 ].id }, ${ rate_nb ? rate_nb : 'null' }, ${ sale_privat ? sale_privat : 'null' }, ${ purchase_privat ? purchase_privat : 'null' }, '${ date }') on conflict do nothing`, (err) => {
                            if (err)
                                return console.log(err);
                        });
                });
            });

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

exports.getCurrencyDetails = (req, res) => {
    const { currency } = req.params;

    sql.query(`select * from exchange_rates where currency_pair_id = (select id from currency_pairs where base_currency = 'UAH' and currency = '${ currency }')`, (err, data) => {
        if (err)
            return res(err.routine);

        return res(null, data.rows);
    });
};