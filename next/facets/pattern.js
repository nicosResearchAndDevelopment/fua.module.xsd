const
    util         = require('../module.xsd.util.js'),
    PatternError = util.createErrorClass('PatternError', 'XSD_FACET_ERROR');

function pattern(param) {

    if (!util.isRegExp(param))
        throw new Error('pattern must be a RegExp');

    return (value) => {
        if (!util.isString(value)) throw new PatternError('expected to be a string');
        if (!param.test(value)) throw new Error('expected to match ' + param.toString());
        return value;
    };

}

module.exports = pattern;
