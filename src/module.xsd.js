const
    xsd     = exports,
    util    = require('@nrd/fua.core.util'),
    context = require('@nrd/fua.resource.data/context');

xsd.parseLiteral = function (literal) {
    const
        isObject = util.isObject(literal),
        value    = (isObject && (literal['@value'] ?? literal.value)) ?? literal,
        datatype = (isObject && (literal['@type'] ?? literal.datatype?.value)) ?? 'xsd:string';

    switch (datatype) {
        case 'xsd:string':
        case  'http://www.w3.org/2001/XMLSchema#string':
            return xsd.string(value);
        case 'xsd:base64Binary':
        case 'http://www.w3.org/2001/XMLSchema#base64Binary':
            return xsd.base64Binary(value);
        case 'xsd:hexBinary':
        case 'http://www.w3.org/2001/XMLSchema#hexBinary':
            return xsd.hexBinary(value);
        case 'xsd:boolean':
        case 'http://www.w3.org/2001/XMLSchema#boolean':
            return xsd.boolean(value);
        case 'xsd:decimal':
        case 'http://www.w3.org/2001/XMLSchema#decimal':
            return xsd.decimal(value);
        case 'xsd:integer':
        case 'http://www.w3.org/2001/XMLSchema#integer':
            return xsd.integer(value);
        case 'xsd:double':
        case 'http://www.w3.org/2001/XMLSchema#double':
            return xsd.double(value);
        case 'xsd:float':
        case 'http://www.w3.org/2001/XMLSchema#float':
            return xsd.float(value);
        default:
            throw new Error('unknown type ' + datatype);
    }
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

    result.stringValue = xsd.string(result.nativeValue);

    return result;
}; // xsd.analyseLiteral

// NOTE temporal:
// TODO xsd:date
// TODO xsd:dateTime
// TODO xsd:duration
// TODO xsd:gDay
// TODO xsd:gMonth
// TODO xsd:gMonthDay
// TODO xsd:gYear
// TODO xsd:gYearMonth
// TODO xsd:time

// NOTE special strings:
// TODO xsd:Name
// TODO xsd:NCName
// TODO xsd:QName

// NOTE miscellaneous:
// TODO xsd:ENTITIES
// TODO xsd:ENTITY
// TODO xsd:ID
// TODO xsd:IDREF
// TODO xsd:IDREFS
// TODO xsd:NMTOKEN
// TODO xsd:NMTOKENS
// TODO xsd:NOTATION

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-string
 * @returns {string}
 */
xsd.string = function (value) {
    switch (typeof value) {
        case 'string':
            return value;
        case 'number':
        case 'boolean':
            return value.toString();
        case 'object':
            if (!value) throw new Error('null value');
            if (value instanceof Buffer) return value.toString('utf8');
            if ('@value' in value) return xsd.string(value['@value']);
            if ('value' in value) return xsd.string(value.value);
            throw new Error('object value');
        case 'undefined':
            throw new Error('undefined value');
        default:
            throw new Error('invalid value');
    }
}; // xsd.string

// TODO xsd:anyURI
// TODO xsd:language
// TODO xsd:normalizedString
// TODO xsd:token

xsd.base64Binary = function (value) {
    value = xsd.string(value);
    return Buffer.from(value, 'base64');
}; // xsd.base64Binary

xsd.hexBinary = function (value) {
    value = xsd.string(value);
    return Buffer.from(value, 'hex');
}; // xsd.hexBinary

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-boolean
 * @returns {boolean}
 */
xsd.boolean = function (value) {
    value = xsd.string(value).toLowerCase();
    switch (value) {
        case 'true':
        case 't':
        case 'yes':
        case 'y':
        case 'on':
        case '1':
            return true;
        case 'false':
        case 'f':
        case 'no':
        case 'n':
        case 'off':
        case '0':
            return false;
        default:
            throw new Error('invalid value');
    }
}; // xsd.boolean

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-decimal
 * @returns {number}
 */
xsd.decimal = function (value) {
    value       = xsd.string(value);
    const match = /^([+-])?(\d*)(\.\d*)?$/.exec(value);
    if (!match) throw new Error('invalid format');
    const
        factor  = match[1] === '-' ? -1 : 1,
        integer = parseInt(match[2] || 0),
        decimal = parseFloat(match[3] || 0);
    return factor * (integer + decimal);
}; // xsd.decimal

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-integer
 * @returns {number}
 */
xsd.integer = function (value) {
    value = xsd.string(value);
    return parseInt(value);
}; // xsd.integer

// TODO xsd:byte
// TODO xsd:int
// TODO xsd:long
// TODO xsd:negativeInteger
// TODO xsd:nonNegativeInteger
// TODO xsd:nonPositiveInteger
// TODO xsd:positiveInteger
// TODO xsd:short
// TODO xsd:unsignedByte
// TODO xsd:unsignedInt
// TODO xsd:unsignedLong
// TODO xsd:unsignedShort

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-double
 * @returns {number}
 */
xsd.double = function (value) {
    value = xsd.string(value).toLowerCase();
    switch (value) {
        case 'inf':
        case 'infinity':
            return Infinity;
        case '-inf':
        case '-infinity':
            return -Infinity;
        case 'nan':
            return NaN;
        default:
            return parseFloat(value);
    }
}; // xsd.double

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-float
 * @returns {number}
 */
xsd.float = function (value) {
    const
        doubleValue = xsd.double(value),
        floatValue  = Math.fround(doubleValue);
    // REM throw if double value is not equal to float value or not???
    // it seems throwing would not be practical because of float precision
    return floatValue;
}; // xsd.float

module.exports = Object.freeze(xsd);
