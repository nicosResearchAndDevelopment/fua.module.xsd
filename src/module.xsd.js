const
    xsd  = exports,
    util = require('./module.xsd.util.js');

xsd.types = require('./module.xsd.types.js');

xsd.parseLiteral = function (literal) {
    let
        isObject = util.isObject(literal),
        value    = (isObject && (literal['@value'] ?? literal.value)) ?? literal,
        datatype = (isObject && (literal['@type'] ?? literal.datatype?.value)) ?? 'xsd:string';

    if (datatype.startsWith('http://www.w3.org/2001/XMLSchema#')) datatype = datatype.substr(33);
    else if (datatype.startsWith('xsd:')) datatype = datatype.substr(4);
    else if (datatype.startsWith('xs:')) datatype = datatype.substr(3);

    if (!datatype in xsd.types) throw new Error('unknown type ' + datatype);
    const typeParser = xsd.types[datatype];

    return typeParser(value);
}; // xsd.parseLiteral

xsd.analyseLiteral = function (literal) {
    const
        isObject = util.isObject(literal),
        result   = {};

    result.originalValue = (isObject && (literal['@value'] ?? literal.value)) ?? literal;
    result.originalType  = (isObject && (literal['@type'] ?? literal.datatype?.value)) ?? 'xsd:string';

    result.nativeValue = xsd.parseLiteral(literal);
    result.nativeType  = typeof result.nativeValue;

    if (result.nativeType === 'object') {
        if (result.nativeValue instanceof Date) result.nativeType = 'Date';
        if (result.nativeValue instanceof Buffer) result.nativeType = 'Buffer';
    }

    result.stringValue = xsd.types.string(result.nativeValue);

    return result;
}; // xsd.analyseLiteral

module.exports = Object.freeze(xsd);
