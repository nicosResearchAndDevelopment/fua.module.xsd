const
    util    = require('../module.xsd.util.js'),
    factory = require('../module.xsd.factory.js');

/**
 * @param {string} value
 * @returns {string}
 */
function anySimpleType(value) {
    const anyType = factory.anyType(value);
    if (!util.isString(anyType)) throw new Error('expected value to be a string');
    return anyType;
}

module.exports = anySimpleType;
