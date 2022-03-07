const
    util               = require('../module.xsd.util.js'),
    factory            = require('../module.xsd.factory.js'),
    positiveMaxInteger = '4294967295',
    maxIntegerLength   = positiveMaxInteger.length;

/**
 * @param {string} value
 * @returns {{integer: string}}
 */
function unsignedInt(value) {
    const unsignedLong = factory.unsignedLong(value);
    if (unsignedLong.integer.length > maxIntegerLength) throw new Error('number is too large');
    if (unsignedLong.integer.length < maxIntegerLength) return unsignedLong;
    for (let i = 0; i < 19; i++) {
        const digit = Number(unsignedLong.integer.charAt(i)), compare = Number(positiveMaxInteger.charAt(i));
        if (digit > compare) throw new Error('number is too large');
        if (digit < compare) return unsignedLong;
    }
    return unsignedLong;
}

module.exports = unsignedInt;
