const
    util               = require('../module.xsd.util.js'),
    factory            = require('../module.xsd.factory.js'),
    positiveMaxInteger = '65535',
    maxIntegerLength   = positiveMaxInteger.length;

/**
 * @param {string} value
 * @returns {{integer: string}}
 */
function unsignedShort(value) {
    const unsignedInt = factory.unsignedInt(value);
    if (unsignedInt.integer.length > maxIntegerLength) throw new Error('number is too large');
    if (unsignedInt.integer.length < maxIntegerLength) return unsignedInt;
    for (let i = 0; i < 19; i++) {
        const digit = Number(unsignedInt.integer.charAt(i)), compare = Number(positiveMaxInteger.charAt(i));
        if (digit > compare) throw new Error('number is too large');
        if (digit < compare) return unsignedInt;
    }
    return unsignedInt;
}

module.exports = unsignedShort;
