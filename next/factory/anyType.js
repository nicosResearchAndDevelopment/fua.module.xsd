const
    util    = require('../module.xsd.util.js'),
    factory = require('../module.xsd.factory.js');

/**
 * @param {any} value
 * @returns {any}
 */
function anyType(value) {
    if (util.isNull(value)) throw new Error('expected a value');
    return value;
}

module.exports = anyType;
