const
    util    = require('../module.xsd.util.js'),
    regex   = require('@nrd/fua.core.regex'),
    factory = require('../module.xsd.factory.js');

/**
 * @param {string} value
 * @returns {{sign: string, integer: string, fraction: string}}
 */
function decimal(value) {
    const anySimpleType = factory.anySimpleType(value);
    const match         = regex.match_XSD_decimal(anySimpleType);
    if (!match) throw new Error('expected to match decimal pattern');
    return match;
    // return [match.sign, match.integer, match.fraction];
}

module.exports = decimal;
