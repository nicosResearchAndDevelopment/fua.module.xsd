const
    util              = require('../module.xsd.util.js'),
    MinExclusiveError = util.createErrorClass('MinExclusiveError', 'XSD_FACET_ERROR');

function minExclusive(param) {

    return (value) => {
        if (!(value > param))
            throw new MinExclusiveError('expected to be minimum exclusive ' + param);
        return value;
    };

}

module.exports = minExclusive;
