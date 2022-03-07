const
    util               = require('../module.xsd.util.js'),
    factory            = require('../module.xsd.factory.js'),
    positiveMaxInteger = '255',
    maxIntegerLength   = positiveMaxInteger.length;

/**
 * @param {string} value
 * @returns {{integer: string}}
 */
function unsignedByte(value) {
    const unsignedShort = factory.unsignedShort(value);
    if (unsignedShort.integer.length > maxIntegerLength) throw new Error('number is too large');
    if (unsignedShort.integer.length < maxIntegerLength) return unsignedShort;
    for (let i = 0; i < 19; i++) {
        const digit = Number(unsignedShort.integer.charAt(i)), compare = Number(positiveMaxInteger.charAt(i));
        if (digit > compare) throw new Error('number is too large');
        if (digit < compare) return unsignedShort;
    }
    return unsignedShort;
}

module.exports = unsignedByte;
