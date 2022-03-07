const
    util               = require('../module.xsd.util.js'),
    factory            = require('../module.xsd.factory.js'),
    positiveMaxInteger = '18446744073709551615',
    maxIntegerLength   = positiveMaxInteger.length;

/**
 * @param {string} value
 * @returns {{integer: string}}
 */
function unsignedLong(value) {
    const nonNegativeInteger = factory.nonNegativeInteger(value);
    delete nonNegativeInteger.sign;
    if (nonNegativeInteger.integer.length > maxIntegerLength) throw new Error('number is too large');
    if (nonNegativeInteger.integer.length < maxIntegerLength) return nonNegativeInteger;
    for (let i = 0; i < 19; i++) {
        const digit = Number(nonNegativeInteger.integer.charAt(i)), compare = Number(positiveMaxInteger.charAt(i));
        if (digit > compare) throw new Error('number is too large');
        if (digit < compare) return nonNegativeInteger;
    }
    return nonNegativeInteger;
}

module.exports = unsignedLong;
