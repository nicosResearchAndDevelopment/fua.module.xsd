const
    util         = require('../module.xsd.util.js'),
    BoundedError = util.createErrorClass('BoundedError', 'XSD_FACET_ERROR');

function bounded(param) {

    switch (param) {
        case false:
        case 'false':
            return (value) => value;
        case true:
        case 'true':
            return (value) => value;
        default:
            throw new Error('bounded must be one of [false, true]');
    }

}

module.exports = bounded;
