const ratesModel = require('./rates.model');

exports.getRateByDate = (req, res, next) => {
    ratesModel.getRateByDate(req, (err, result) => {
        if (err)
            return res.status(err.status || 500).json({ message: err.data });
        return res.status(200).json(result);
    });
};

exports.convert = (req, res, next) => {
    ratesModel.convert(req, (err, result) => {
        if (err === 'Invalid amount')
            return res.status(400).json({ message: err });
        else if (err)
            return res.status(err.status || 500).json({ message: err.data });
        return res.status(200).json(result);
    });
};

exports.getCurrencyPairs = (req, res, next) => {
    ratesModel.getCurrencyPairs(req, (err, result) => {
        if (err)
            return res.status(err.status || 500).json({ message: err.data });
        return res.status(200).json(result);
    });
};