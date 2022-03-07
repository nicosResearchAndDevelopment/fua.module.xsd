const
    util         = require('../module.xsd.util.js'),
    OrderedError = util.createErrorClass('OrderedError', 'XSD_FACET_ERROR');

function cardinality(param) {

    switch (param) {
        case 'finite':
            return (value) => value;
        case 'countably infinite':
            return (value) => value;
        default:
            throw new Error('cardinality must be one of [finite, countably infinite]');
    }

}

module.exports = cardinality;
