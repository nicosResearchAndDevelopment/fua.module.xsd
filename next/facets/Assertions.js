const
    util            = require('../module.xsd.util.js'),
    AssertionsError = util.createErrorClass('AssertionsError', 'XSD_FACET_ERROR');

function Assertions(param) {

    if (!util.isFunction(param))
        throw new Error('Assertions must be a function');

    return (value) => {
        if (!param(value)) throw new AssertionsError('invalid value');
        return value;
    };

}

module.exports = Assertions;
