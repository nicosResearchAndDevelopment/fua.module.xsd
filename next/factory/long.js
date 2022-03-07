const
    util               = require('../module.xsd.util.js'),
    factory            = require('../module.xsd.factory.js'),
    negativeMinInteger = '9223372036854775808',
    positiveMaxInteger = '9223372036854775807',
    maxIntegerLength   = negativeMinInteger.length || positiveMaxInteger.length;

/**
 * @param {string} value
 * @returns {{sign: string, integer: string}}
 */
function long(value) {
    const integer = factory.integer(value);
    if (integer.integer.length > maxIntegerLength) throw new Error('number is too large');
    if (integer.integer.length < maxIntegerLength) return integer;
    const maxInteger = (integer.sign === '-') ? negativeMinInteger : positiveMaxInteger;
    for (let i = 0; i < 19; i++) {
        const digit = Number(integer.integer.charAt(i)), compare = Number(maxInteger.charAt(i));
        if (digit > compare) throw new Error('number is too large');
        if (digit < compare) return integer;
    }
    return integer;
}

module.exports = long;
