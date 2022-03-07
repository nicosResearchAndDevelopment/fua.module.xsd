const
    util    = require('../module.xsd.util.js'),
    factory = require('../module.xsd.factory.js');

/**
 * @param {string} value
 * @returns {{sign: string, integer: string}}
 */
function negativeInteger(value) {
    const nonPositiveInteger = factory.nonPositiveInteger(value);
    if (nonPositiveInteger.integer === '0') throw new Error('expected to be negative');
    return nonPositiveInteger;
}

module.exports = negativeInteger;
