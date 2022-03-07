const
    util    = require('../module.xsd.util.js'),
    factory = require('../module.xsd.factory.js');

/**
 * @param {string} value
 * @returns {{sign: string, integer: string}}
 */
function integer(value) {
    const decimal = factory.decimal(value);
    if (decimal.fraction !== '0') throw new Error('expected to match integer pattern');
    delete decimal.fraction;
    return decimal;
}

module.exports = integer;
