const
    util              = require('../module.xsd.util.js'),
    MinInclusiveError = util.createErrorClass('MinInclusiveError', 'XSD_FACET_ERROR');

function minInclusive(param) {

    return (value) => {
        if (!(value >= param))
            throw new MinInclusiveError('expected to be minimum inclusive ' + param);
        return value;
    };

}

module.exports = minInclusive;
