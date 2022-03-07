const
    util               = require('../module.xsd.util.js'),
    factory            = require('../module.xsd.factory.js'),
    negativeMinInteger = '32768',
    positiveMaxInteger = '32767',
    maxIntegerLength   = negativeMinInteger.length || positiveMaxInteger.length;

/**
 * @param {string} value
 * @returns {{sign: string, integer: string}}
 */
function short(value) {
    const int = factory.int(value);
    if (int.integer.length > maxIntegerLength) throw new Error('number is too large');
    if (int.integer.length < maxIntegerLength) return int;
    const maxInteger = (int.sign === '-') ? negativeMinInteger : positiveMaxInteger;
    for (let i = 0; i < 19; i++) {
        const digit = Number(int.integer.charAt(i)), compare = Number(maxInteger.charAt(i));
        if (digit > compare) throw new Error('number is too large');
        if (digit < compare) return int;
    }
    return int;
}

module.exports = short;
