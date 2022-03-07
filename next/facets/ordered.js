const
    util         = require('../module.xsd.util.js'),
    OrderedError = util.createErrorClass('OrderedError', 'XSD_FACET_ERROR');

function ordered(param) {

    switch (param) {
        case false:
        case 'false':
            return (value) => value;
        case 'partial':
            return (value) => value;
        case 'total':
            return (value) => value;
        default:
            throw new Error('ordered must be one of [false, partial, total]');
    }

}

module.exports = ordered;
