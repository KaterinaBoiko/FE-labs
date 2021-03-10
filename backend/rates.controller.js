const ratesModel = require('./rates.model');

exports.getRateByDate = (req, res, next) => {
    ratesModel.getRateByDate(req, (err, result) => {
        if (err)
            return res.status(err.status || 500).json({ message: err });
        return res.status(200).json(result);
    });
};

exports.convert = (req, res, next) => {
    ratesModel.convert(req, (err, result) => {
        if (err)
            return res.status(err.status || 500).json({ message: err });
        return res.status(200).json(result);
    });
};

exports.getCurrencyPairs = (req, res, next) => {
    ratesModel.getCurrencyPairs(req, (err, result) => {
        if (err)
            return res.status(err.status || 500).json({ message: err });
        return res.status(200).json(result);
    });
};

exports.getCurrencyDetails = (req, res, next) => {
    ratesModel.getCurrencyDetails(req, (err, result) => {
        if (err)
            return res.status(err.status || 500).json({ message: err.data });

        const response = typeof result === 'string' ? { message: result } : result;
        return res.status(200).json(response);
    });
};