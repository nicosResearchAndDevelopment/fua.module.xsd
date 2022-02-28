const
    util           = require('../module.xsd.util.js'),
    MinLengthError = util.createErrorClass('MinLengthError', 'XSD_FACET_ERROR');

function minLength(param) {

    if (!(util.isInteger(param) && param >= 0))
        throw new Error('minLength must be a nonNegativeInteger');

    return (value) => {
        if (util.isBuffer(value)) {
            if (value.size < param) throw new MinLengthError('expected to have minimum length ' + param);
        } else if (util.isArray(value)) {
            if (value.length < param) throw new MinLengthError('expected to have minimum length ' + param);
        } else if (util.isString(value)) {
            if (value.length < param) throw new MinLengthError('expected to have minimum length ' + param);
        } else {
            throw new MinLengthError('expected to be a string, array or buffer');
        }
        return value;
    };

}

module.exports = minLength;
