const
    util             = require('../module.xsd.util.js'),
    TotalDigitsError = util.createErrorClass('TotalDigitsError', 'XSD_FACET_ERROR');

function totalDigits(param) {

    if (!(util.isInteger(param) && param > 0))
        throw new Error('totalDigits must be a positiveInteger');

    return (value) => {
        if (!util.isAnyNumber(value)) throw new TotalDigitsError('expected to be a number');
        if (isNaN(value) || value === Infinity || value === -Infinity) return value;
        const shift = 1 + Math.floor(Math.log10(value)), factor = 10 ** (param - shift);
        return Math.round(factor * value) / factor;
    };

}

module.exports = totalDigits;
