const
    util    = require('../module.xsd.util.js'),
    factory = require('../module.xsd.factory.js');

/**
 * @param {string} value
 * @returns {{sign: string, integer: string}}
 */
function nonNegativeInteger(value) {
    const integer = factory.integer(value);
    if (integer.integer === '0') return value;
    if (integer.sign === '-') throw new Error('expected to be non negative');
    return integer;
}

module.exports = nonNegativeInteger;
