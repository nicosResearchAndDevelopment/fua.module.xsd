const
    util             = require('../module.xsd.util.js'),
    EnumerationError = util.createErrorClass('EnumerationError', 'XSD_FACET_ERROR');

function enumeration(param) {

    if (!util.isArray(param))
        throw new Error('enumeration must be an array');

    return (value) => {
        if (!param.includes(value))
            throw new EnumerationError('expected to be one of [' + param.join(', ') + ']');
        return value;
    };

}

module.exports = enumeration;
