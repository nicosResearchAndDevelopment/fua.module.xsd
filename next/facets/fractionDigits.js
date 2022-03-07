const
    util                = require('../module.xsd.util.js'),
    FractionDigitsError = util.createErrorClass('FractionDigitsError', 'XSD_FACET_ERROR');

function fractionDigits(param) {

    if (!(util.isInteger(param) && param >= 0))
        throw new Error('fractionDigits must be a nonNegativeInteger');

    return (value) => {
        if (typeof value !== 'number') throw new FractionDigitsError('expected to be a number');
        if (isNaN(value) || value === Infinity || value === -Infinity) return value;
        const factor = 10 ** param;
        return Math.round(factor * value) / factor;
    };

}

module.exports = fractionDigits;
