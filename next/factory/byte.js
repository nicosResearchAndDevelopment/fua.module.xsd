const
    util               = require('../module.xsd.util.js'),
    factory            = require('../module.xsd.factory.js'),
    negativeMinInteger = '128',
    positiveMaxInteger = '127',
    maxIntegerLength   = negativeMinInteger.length || positiveMaxInteger.length;

/**
 * @param {string} value
 * @returns {{sign: string, integer: string}}
 */
function byte(value) {
    const short = factory.short(value);
    if (short.integer.length > maxIntegerLength) throw new Error('number is too large');
    if (short.integer.length < maxIntegerLength) return short;
    const maxInteger = (short.sign === '-') ? negativeMinInteger : positiveMaxInteger;
    for (let i = 0; i < 19; i++) {
        const digit = Number(short.integer.charAt(i)), compare = Number(maxInteger.charAt(i));
        if (digit > compare) throw new Error('number is too large');
        if (digit < compare) return short;
    }
    return short;
}

module.exports = byte;
