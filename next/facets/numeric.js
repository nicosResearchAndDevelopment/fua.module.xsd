const
    util         = require('../module.xsd.util.js'),
    NumericError = util.createErrorClass('NumericError', 'XSD_FACET_ERROR');

function numeric(param) {

    switch (param) {
        case false:
        case 'false':
            return (value) => value;
        case true:
        case 'true':
            return (value) => {
                switch (value) {
                    case 'INF':
                    case '+INF':
                    case Infinity:
                        return Infinity;
                    case '-INF':
                    case -Infinity:
                        return -Infinity;
                    case 'NaN':
                        return NaN;
                    default:
                        return Number(value);
                }
            };
        default:
            throw new Error('numeric must be one of [false, true]');
    }

}

module.exports = numeric;
