const
    util        = require('../module.xsd.util.js'),
    LengthError = util.createErrorClass('LengthError', 'XSD_FACET_ERROR');

function length(param) {

    if (!(util.isInteger(param) && param >= 0))
        throw new Error('length must be a nonNegativeInteger');

    return (value) => {
        if (util.isBuffer(value)) {
            if (value.size !== param) throw new LengthError('expected to have length ' + param);
        } else if (util.isArray(value)) {
            if (value.length !== param) throw new LengthError('expected to have length ' + param);
        } else if (util.isString(value)) {
            if (value.length !== param) throw new LengthError('expected to have length ' + param);
        } else {
            throw new LengthError('expected to be a string, array or buffer');
        }
        return value;
    };

}

module.exports = length;
