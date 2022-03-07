const
    util    = require('../module.xsd.util.js'),
    factory = require('../module.xsd.factory.js');

/**
 * @param {string} value
 * @returns {string}
 */
function token(value) {
    const normalizedString = factory.normalizedString(value);
    return normalizedString.replace(/ +/g, ' ').trim();
}

module.exports = token;
