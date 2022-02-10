const
    xsd  = exports,
    util = require('./module.xsd.util.js');

xsd.types = require('./module.xsd.types.js');

xsd.createLiteral = function (value) {
    switch (typeof value) {
        case 'boolean':
            return {
                '@type':  'xsd:boolean',
                '@value': value ? 'true' : 'false'
            };
        case 'number':
            if (util.isInteger(value)) return {
                '@type':  'xsd:integer',
                '@value': value.toString()
            };
            if (util.isFiniteNumber(value)) return {
                '@type':  Math.fround(value) === value ? 'xsd:float' : 'xsd:double',
                '@value': value.toString()
            };
            return {
                '@type':  'xsd:float',
                '@value': value === Infinity ? 'INF' : value === -Infinity ? '-INF' : 'NaN'
            };
        case 'string':
            return {
                '@type':  'xsd:string',
                '@value': value
            };
        case 'object':
            if (util.isBuffer(value)) return {
                '@type':  'xsd:base64Binary',
                '@value': value.toString('base64')
            };
            if (util.isDate(value)) return {
                '@type':  'xsd:dateTime',
                '@value': value.toISOString()
            };
        default:
            throw util.DatatypeError('expected boolean, number, string, Buffer or Date');
    }
}; // xsd.createLiteral

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
