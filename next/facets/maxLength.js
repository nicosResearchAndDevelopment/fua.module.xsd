const
    util           = require('../module.xsd.util.js'),
    MaxLengthError = util.createErrorClass('MaxLengthError', 'XSD_FACET_ERROR');

function maxLength(param) {

    if (!(util.isInteger(param) && param >= 0))
        throw new Error('maxLength must be a nonNegativeInteger');

    return (value) => {
        if (util.isBuffer(value)) {
            if (value.size > param) throw new MaxLengthError('expected to have maximum length ' + param);
        } else if (util.isArray(value)) {
            if (value.length > param) throw new MaxLengthError('expected to have maximum length ' + param);
        } else if (util.isString(value)) {
            if (value.length > param) throw new MaxLengthError('expected to have maximum length ' + param);
        } else {
            throw new MaxLengthError('expected to be a string, array or buffer');
        }
        return value;
    };

}

module.exports = maxLength;
