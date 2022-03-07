const
    util    = require('../module.xsd.util.js'),
    factory = require('../module.xsd.factory.js');

/**
 * @param {string} value
 * @returns {string}
 */
function normalizedString(value) {
    const string = factory.string(value);
    return string.replace(/\s/g, ' ');
}

module.exports = normalizedString;
