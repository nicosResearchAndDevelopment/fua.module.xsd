const
    util            = require('../module.xsd.util.js'),
    WhiteSpaceError = util.createErrorClass('WhiteSpaceError', 'XSD_FACET_ERROR');

function whiteSpace(param) {

    switch (param) {
        case 'preserve':
            return (value) => {
                if (!util.isString(value)) throw new WhiteSpaceError('expected to be a string');
                return value;
            };
        case 'replace':
            return (value) => {
                if (!util.isString(value)) throw new WhiteSpaceError('expected to be a string');
                return value.replace(/\s/g, ' ');
            };
        case 'collapse':
            return (value) => {
                if (!util.isString(value)) throw new WhiteSpaceError('expected to be a string');
                return value.replace(/\s+/g, ' ').trim();
            };
        default:
            throw new Error('whiteSpace must be one of [preserve, replace, collapse]');
    }

}

module.exports = whiteSpace;
