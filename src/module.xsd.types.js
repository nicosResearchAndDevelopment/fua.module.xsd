const
    types = exports;

// TODO xs:ENTITIES
// TODO xs:ENTITY
// TODO xs:ID
// TODO xs:IDREF
// TODO xs:IDREFS
// TODO xs:NOTATION
// TODO xs:NMTOKEN
// TODO xs:NMTOKENS

//region >> string

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-string
 * @returns {string}
 */
types.string = function (value) {
    switch (typeof value) {
        case 'string':
            return value;
        case 'number':
        case 'boolean':
            return value.toString();
        case 'object':
            if (!value) throw new Error('null value');
            if (value instanceof Buffer) return value.toString('utf8');
            if ('@value' in value) return types.string(value['@value']);
            if ('value' in value) return types.string(value.value);
            throw new Error('object value');
        case 'undefined':
            throw new Error('undefined value');
        default:
            throw new Error('invalid value');
    }
}; // types.string

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-normalizedstring
 * @returns {string}
 */
types.normalizedString = function (value) {
    value = types.string(value);
    return value.replace(/\s/g, ' ');
}; // types.normalizedString

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-token
 * @returns {string}
 */
types.token = function (value) {
    value = types.string(value);
    return value.replace(/\s+/g, ' ').trim();
}; // types.token

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-anyuri
 * @returns {string}
 */
types.anyURI = function (value) {
    value = types.string(value);
    if (/\s/.test(value))
        throw new Error('contains whitespaces');
    return value;
}; // types.anyURI

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-language
 * @returns {string}
 */
types.language = function (value) {
    value = types.string(value);
    if (!/^[a-z]{1,3}(?:-[a-z0-9]{1,8})*$/i.test(value))
        throw new Error('invalid pattern');
    return value;
}; // types.language

// TODO xs:Name
// TODO xs:QName
// TODO xs:NCName

//endregion >> string
//region >> Buffer

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-base64binary
 * @returns {Buffer}
 */
types.base64Binary = function (value) {
    value = types.string(value);
    return Buffer.from(value, 'base64');
}; // types.base64Binary

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-hexbinary
 * @returns {Buffer}
 */
types.hexBinary = function (value) {
    value = types.string(value);
    return Buffer.from(value, 'hex');
}; // types.hexBinary

//endregion >> Buffer
//region >> boolean

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-boolean
 * @returns {boolean}
 */
types.boolean = function (value) {
    value = types.string(value).toLowerCase();
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
}; // types.boolean

//endregion >> boolean
//region >> number

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-decimal
 * @returns {number}
 */
types.decimal = function (value) {
    value       = types.string(value);
    const match = /^([+-])?(\d*)(\.\d*)?$/.exec(value);
    if (!match) throw new Error('invalid format');
    const
        factor  = match[1] === '-' ? -1 : 1,
        integer = parseInt(match[2] || 0),
        decimal = parseFloat(match[3] || 0);
    return factor * (integer + decimal);
}; // types.decimal

//endregion >> number
//region >> integer

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-integer
 * @returns {number}
 */
types.integer = function (value) {
    value = types.string(value);
    return parseInt(value);
}; // types.integer

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-nonnegativeinteger
 * @returns {number}
 */
types.nonNegativeInteger = function (value) {
    const integerValue = types.integer(value);
    if (integerValue < 0)
        throw new Error('out of range');
    return integerValue;
}; // types.nonNegativeInteger

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-positiveinteger
 * @returns {number}
 */
types.positiveInteger = function (value) {
    const integerValue = types.integer(value);
    if (integerValue <= 0)
        throw new Error('out of range');
    return integerValue;
}; // types.positiveInteger

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-nonpositiveinteger
 * @returns {number}
 */
types.nonPositiveInteger = function (value) {
    const integerValue = types.integer(value);
    if (integerValue > 0)
        throw new Error('out of range');
    return integerValue;
}; // types.nonPositiveInteger

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-negativeinteger
 * @returns {number}
 */
types.negativeInteger = function (value) {
    const integerValue = types.integer(value);
    if (integerValue >= 0)
        throw new Error('out of range');
    return integerValue;
}; // types.negativeInteger

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-long
 * @returns {number}
 */
types.long = function (value) {
    const integerValue = types.integer(value);
    if (integerValue < -9223372036854775808 || integerValue > 9223372036854775807)
        throw new Error('out of range');
    return integerValue;
}; // types.long

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-int
 * @returns {number}
 */
types.int = function (value) {
    const integerValue = types.integer(value);
    if (integerValue < -2147483648 || integerValue > 2147483647)
        throw new Error('out of range');
    return integerValue;
}; // types.int

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-short
 * @returns {number}
 */
types.short = function (value) {
    const integerValue = types.integer(value);
    if (integerValue < -32768 || integerValue > 32767)
        throw new Error('out of range');
    return integerValue;
}; // types.short

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-byte
 * @returns {number}
 */
types.byte = function (value) {
    const integerValue = types.integer(value);
    if (integerValue < -128 || integerValue > 127)
        throw new Error('out of range');
    return integerValue;
}; // types.byte

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-unsignedlong
 * @returns {number}
 */
types.unsignedLong = function (value) {
    const integerValue = types.integer(value);
    if (integerValue < 0 || integerValue > 18446744073709551615)
        throw new Error('out of range');
    return integerValue;
}; // types.unsignedLong

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-unsignedint
 * @returns {number}
 */
types.unsignedInt = function (value) {
    const integerValue = types.integer(value);
    if (integerValue < 0 || integerValue > 4294967295)
        throw new Error('out of range');
    return integerValue;
}; // types.unsignedInt

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-unsignedshort
 * @returns {number}
 */
types.unsignedShort = function (value) {
    const integerValue = types.integer(value);
    if (integerValue < 0 || integerValue > 65535)
        throw new Error('out of range');
    return integerValue;
}; // types.unsignedShort

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-unsignedbyte
 * @returns {number}
 */
types.unsignedByte = function (value) {
    const integerValue = types.integer(value);
    if (integerValue < 0 || integerValue > 255)
        throw new Error('out of range');
    return integerValue;
}; // types.unsignedByte

//endregion >> integer
//region >> float

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-double
 * @returns {number}
 */
types.double = function (value) {
    value = types.string(value).toLowerCase();
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
}; // types.double

/**
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-float
 * @returns {number}
 */
types.float = function (value) {
    const doubleValue = types.double(value);
    return Math.fround(doubleValue);
}; // types.float

//endregion >> float
//region >> Date

// TODO xs:date
// TODO xs:dateTime
// TODO xs:duration
// TODO xs:gDay
// TODO xs:gMonth
// TODO xs:gMonthDay
// TODO xs:gYear
// TODO xs:gYearMonth
// TODO xs:time

//endregion >> Date

module.exports = Object.freeze(types);
