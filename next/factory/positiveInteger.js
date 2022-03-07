const
    util    = require('../module.xsd.util.js'),
    factory = require('../module.xsd.factory.js');

/**
 * @param {string} value
 * @returns {{sign: string, integer: string}}
 */
function positiveInteger(value) {
    const nonNegativeInteger = factory.nonNegativeInteger(value);
    if (nonNegativeInteger.integer === '0') throw new Error('expected to be positive');
    return nonNegativeInteger;
}

module.exports = positiveInteger;
