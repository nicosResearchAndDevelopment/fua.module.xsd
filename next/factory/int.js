const
    util               = require('../module.xsd.util.js'),
    factory            = require('../module.xsd.factory.js'),
    negativeMinInteger = '2147483648',
    positiveMaxInteger = '2147483647',
    maxIntegerLength   = negativeMinInteger.length || positiveMaxInteger.length;

/**
 * @param {string} value
 * @returns {{sign: string, integer: string}}
 */
function int(value) {
    const long = factory.long(value);
    if (long.integer.length > maxIntegerLength) throw new Error('number is too large');
    if (long.integer.length < maxIntegerLength) return long;
    const maxInteger = (long.sign === '-') ? negativeMinInteger : positiveMaxInteger;
    for (let i = 0; i < 19; i++) {
        const digit = Number(long.integer.charAt(i)), compare = Number(maxInteger.charAt(i));
        if (digit > compare) throw new Error('number is too large');
        if (digit < compare) return long;
    }
    return long;
}

module.exports = int;
