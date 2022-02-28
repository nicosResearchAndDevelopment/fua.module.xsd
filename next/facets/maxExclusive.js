const
    util              = require('../module.xsd.util.js'),
    MaxExclusiveError = util.createErrorClass('MaxExclusiveError', 'XSD_FACET_ERROR');

function maxExclusive(param) {

    return (value) => {
        if (!(value < param))
            throw new MaxExclusiveError('expected to be maximum exclusive ' + param);
        return value;
    };

}

module.exports = maxExclusive;
