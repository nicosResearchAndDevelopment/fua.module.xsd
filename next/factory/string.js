const
    util    = require('../module.xsd.util.js'),
    factory = require('../module.xsd.factory.js');

/**
 * @param {string} value
 * @returns {string}
 */
function string(value) {
    value = factory.anySimpleType(value);
    return value;
}

module.exports = string;
