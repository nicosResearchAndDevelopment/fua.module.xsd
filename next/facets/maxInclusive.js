const
    util              = require('../module.xsd.util.js'),
    MaxInclusiveError = util.createErrorClass('MaxInclusiveError', 'XSD_FACET_ERROR');

function maxInclusive(param) {

    return (value) => {
        if (!(value <= param))
            throw new MaxInclusiveError('expected to be maximum inclusive ' + param);
        return value;
    };

}

module.exports = maxInclusive;
