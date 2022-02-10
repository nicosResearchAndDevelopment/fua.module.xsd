const
    types = exports,
    util  = require('./module.xsd.util.js');

//region >> boolean

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#boolean
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-boolean
 * @param {"true"|"false"|"1"|"0"|boolean|1|0} value
 * @returns {boolean}
 */
types.boolean = function (value) {
    if (typeof value === 'string') {
        if (value === 'true' || value === '1') return true;
        if (value === 'false' || value === '0') return false;
        throw util.PatternError('expected "true", "false", "1" or "0" for string values');
    }

    if (typeof value === 'number') {
        if (value === 1) return true;
        if (value === 0) return false;
        throw util.RangeError('expected 1 or 0 for number values');
    }

    if (typeof value === 'boolean') {
        return value;
    }

    throw util.DatatypeError('expected string, number or boolean');
}; // types.boolean

//endregion >> boolean
//region >> number

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#decimal
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-decimal
 * @param {string|number} value
 * @returns {number}
 */
types.decimal = function (value) {
    if (typeof value === 'string') {
        const [match, signPart, intPart, decPart, onlyDecPart] = util.decimalPattern.exec(value) || [];
        if (!match) throw util.PatternError('expected decimal pattern for string values');
        const
            factor  = signPart === '-' ? -1 : 1,
            integer = parseInt(intPart || 0),
            decimal = parseFloat(decPart || onlyDecPart || 0) || 0,
            result  = factor * (integer + decimal);
        if (result === -Infinity || result === Infinity || isNaN(result))
            throw util.RangeError('expected decimals for string values');
        return result;
    }

    if (typeof value === 'number') {
        if (value === -Infinity || value === Infinity || isNaN(value))
            throw util.RangeError('expected decimals for number values');
        return value;
    }

    throw util.DatatypeError('invalid decimal type');
}; // types.decimal

//region >> number / float

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#float
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-float
 * @returns {number}
 */
types.float = function (value) {
    const doubleValue = types.double(value);
    return Math.fround(doubleValue);
}; // types.float

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#double
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

//endregion >> number / float
//region >> number / integer

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#integer
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-integer
 * @returns {number}
 */
types.integer = function (value) {
    if (typeof value === 'string') {
        const result = parseInt(value);
        if (!Number.isInteger(result)) throw new Error('invalid integer value');
        return result;
    }

    if (typeof value === 'number') {
        if (!Number.isInteger(value)) throw new Error('invalid integer value');
        return value;
    }

    throw new Error('invalid integer type');
}; // types.integer

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#nonNegativeInteger
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
 * @see https://www.w3.org/TR/xmlschema11-2/#positiveInteger
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
 * @see https://www.w3.org/TR/xmlschema11-2/#nonPositiveInteger
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
 * @see https://www.w3.org/TR/xmlschema11-2/#negativeInteger
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
 * @see https://www.w3.org/TR/xmlschema11-2/#long
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-long
 * @returns {number}
 */
types.long = function (value) {
    const integerValue = types.integer(value);
    if (integerValue < -9223372036854775808 || integerValue > 9223372036854775807)
        throw new Error('out of range');
    console.log(integerValue);
    return integerValue;
}; // types.long

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#int
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
 * @see https://www.w3.org/TR/xmlschema11-2/#short
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
 * @see https://www.w3.org/TR/xmlschema11-2/#byte
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
 * @see https://www.w3.org/TR/xmlschema11-2/#unsignedLong
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
 * @see https://www.w3.org/TR/xmlschema11-2/#unsignedInt
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
 * @see https://www.w3.org/TR/xmlschema11-2/#unsignedShort
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
 * @see https://www.w3.org/TR/xmlschema11-2/#unsignedByte
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-unsignedbyte
 * @returns {number}
 */
types.unsignedByte = function (value) {
    const integerValue = types.integer(value);
    if (integerValue < 0 || integerValue > 255)
        throw new Error('out of range');
    return integerValue;
}; // types.unsignedByte

//endregion >> number / integer

//endregion >> number
//region >> string

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#string
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
            if (value instanceof Date) return value.toISOString();
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
 * @see https://www.w3.org/TR/xmlschema11-2/#normalizedString
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-normalizedstring
 * @returns {string}
 */
types.normalizedString = function (value) {
    value = types.string(value);
    return value.replace(/\s/g, ' ');
}; // types.normalizedString

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#token
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-token
 * @returns {string}
 */
types.token = function (value) {
    value = types.string(value);
    return value.replace(/\s+/g, ' ').trim();
}; // types.token

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#anyURI
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-anyuri
 * @returns {string}
 */
types.anyURI = function (value) {
    value = types.string(value);
    if (!util.anyURIPattern.test(value))
        throw new Error('invalid anyURI pattern');
    return value;
}; // types.anyURI

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#language
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-language
 * @returns {string}
 */
types.language = function (value) {
    value = types.string(value);
    if (!util.languagePattern.test(value))
        throw new Error('invalid language pattern');
    return value;
}; // types.language

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#Name
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-name
 * @returns {string}
 */
types.Name = function (value) {
    value = types.string(value);
    if (!util.NamePattern.test(value))
        throw new Error('invalid Name pattern');
    return value;
}; // types.Name

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#NCName
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-ncname
 * @returns {string}
 */
types.NCName = function (value) {
    value = types.string(value);
    if (!util.NCNamePattern.test(value))
        throw new Error('invalid NCName pattern');
    return value;
}; // types.NCName

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#ID
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-id
 * @returns {string}
 */
types.ID = function (value) {
    value = types.string(value);
    if (!util.NCNamePattern.test(value))
        throw new Error('invalid ID pattern');
    return value;
}; // types.ID

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#IDREF
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-idref
 * @returns {string}
 */
types.IDREF = function (value) {
    value = types.string(value);
    if (!util.NCNamePattern.test(value))
        throw new Error('invalid IDREF pattern');
    return value;
}; // types.IDREF

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#IDREFS
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-idrefs
 * @returns {string}
 */
types.IDREFS = function (value) {
    value = types.string(value);
    if (!util.NCNamesPattern.test(value))
        throw new Error('invalid IDREFS pattern');
    return value;
}; // types.IDREFS

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#ENTITY
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-entity
 * @returns {string}
 */
types.ENTITY = function (value) {
    value = types.string(value);
    if (!util.NCNamePattern.test(value))
        throw new Error('invalid ENTITY pattern');
    return value;
}; // types.ENTITY

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#ENTITIES
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-entities
 * @returns {string}
 */
types.ENTITIES = function (value) {
    value = types.string(value);
    if (!util.NCNamesPattern.test(value))
        throw new Error('invalid ENTITIES pattern');
    return value;
}; // types.ENTITIES

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#QName
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-qname
 * @returns {string}
 */
types.QName = function (value) {
    value = types.string(value);
    if (!util.QNamePattern.test(value))
        throw new Error('invalid QName pattern');
    return value;
}; // types.QName

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#NOTATION
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-notation
 * @returns {string}
 */
types.NOTATION = function (value) {
    value = types.string(value);
    if (!util.QNamePattern.test(value))
        throw new Error('invalid NOTATION pattern');
    return value;
}; // types.NOTATION

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#NMTOKEN
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-nmtoken
 * @returns {string}
 */
types.NMTOKEN = function (value) {
    value = types.string(value);
    if (!util.NmtokenPattern.test(value))
        throw new Error('invalid NMTOKEN pattern');
    return value;
}; // types.NMTOKEN

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#NMTOKENS
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-nmtokens
 * @returns {string}
 */
types.NMTOKENS = function (value) {
    value = types.string(value);
    if (!util.NmtokensPattern.test(value))
        throw new Error('invalid NMTOKENS pattern');
    return value;
}; // types.NMTOKENS

//endregion >> string
//region >> Buffer

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#base64Binary
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-base64binary
 * @param {string|Buffer} value
 * @returns {Buffer}
 */
types.base64Binary = function (value) {
    if (typeof value === 'string') {
        return Buffer.from(value, 'base64');
    }

    if (value instanceof Buffer) {
        return value;
    }

    throw util.DatatypeError('expected string or Buffer');
}; // types.base64Binary

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#hexBinary
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-hexbinary
 * @param {string|Buffer} value
 * @returns {Buffer}
 */
types.hexBinary = function (value) {
    if (typeof value === 'string') {
        return Buffer.from(value, 'hex');
    }

    if (value instanceof Buffer) {
        return value;
    }

    throw util.DatatypeError('expected string or Buffer');
}; // types.hexBinary

//endregion >> Buffer
//region >> Date

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#date
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-date
 * @returns {string}
 */
types.date = function (value) {
    value                                                       = types.string(value);
    const [match, YYYY, MM, DD, tz_sign, tz_hh, tz_mm, utc_tag] = util.datePattern.exec(value) || [];
    if (!match) throw new Error('invalid date pattern');
    const
        year       = parseInt(YYYY),
        monthIndex = parseInt(MM) - 1,
        day        = parseInt(DD),
        hour       = tz_sign && parseInt(tz_sign + tz_hh) || 0,
        minutes    = tz_sign && parseInt(tz_sign + tz_mm) || 0;
    if (utc_tag || tz_sign) return new Date(Date.UTC(year, monthIndex, day, hour, minutes));
    return new Date(year, monthIndex, day);
}; // types.date

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#time
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-time
 * @returns {string}
 */
types.time = function (value) {
    value                                                        = types.string(value);
    const [match, hh, mm, ss_ms, tz_sign, tz_hh, tz_mm, utc_tag] = util.timePattern.exec(value) || [];
    if (!match) throw new Error('invalid time pattern');
    const
        year         = 1970,
        monthIndex   = 0,
        day          = 1,
        hour         = parseInt(hh) - (tz_sign && parseInt(tz_sign + tz_hh) || 0),
        minutes      = parseInt(mm) - (tz_sign && parseInt(tz_sign + tz_mm) || 0),
        seconds      = parseInt(ss_ms),
        milliseconds = 1000 * (parseFloat(ss_ms) - seconds);
    if (utc_tag || tz_sign) return new Date(Date.UTC(year, monthIndex, day, hour, minutes, seconds, milliseconds));
    return new Date(year, monthIndex, day, hour, minutes, seconds, milliseconds);
}; // types.time

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#dateTime
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-datetime
 * @returns {string}
 */
types.dateTime = function (value) {
    value                                                                      = types.string(value);
    const [match, YYYY, MM, DD, hh, mm, ss_ms, tz_sign, tz_hh, tz_mm, utc_tag] = util.dateTimePattern.exec(value) || [];
    if (!match) throw new Error('invalid dateTime pattern');
    const
        year         = parseInt(YYYY),
        monthIndex   = parseInt(MM) - 1,
        day          = parseInt(DD),
        hour         = parseInt(hh) - (tz_sign && parseInt(tz_sign + tz_hh) || 0),
        minutes      = parseInt(mm) - (tz_sign && parseInt(tz_sign + tz_mm) || 0),
        seconds      = parseInt(ss_ms),
        milliseconds = 1000 * (parseFloat(ss_ms) - seconds);
    if (utc_tag || tz_sign) return new Date(Date.UTC(year, monthIndex, day, hour, minutes, seconds, milliseconds));
    return new Date(year, monthIndex, day, hour, minutes, seconds, milliseconds);
}; // types.dateTime

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#gDay
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gday
 * @returns {string}
 */
types.gDay = function (value) {
    value                                             = types.string(value);
    const [match, DD, tz_sign, tz_hh, tz_mm, utc_tag] = util.gDayPattern.exec(value) || [];
    if (!match) throw new Error('invalid gDay pattern');
    const
        year       = 1970,
        monthIndex = 0,
        day        = parseInt(DD),
        hour       = tz_sign && parseInt(tz_sign + tz_hh) || 0,
        minutes    = tz_sign && parseInt(tz_sign + tz_mm) || 0;
    if (utc_tag || tz_sign) return new Date(Date.UTC(year, monthIndex, day, hour, minutes));
    return new Date(year, monthIndex, day);
}; // types.gDay

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#gMonth
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gmonth
 * @returns {string}
 */
types.gMonth = function (value) {
    value                                             = types.string(value);
    const [match, MM, tz_sign, tz_hh, tz_mm, utc_tag] = util.gMonthPattern.exec(value) || [];
    if (!match) throw new Error('invalid gMonth pattern');
    const
        year       = 1970,
        monthIndex = parseInt(MM) - 1,
        day        = 1,
        hour       = tz_sign && parseInt(tz_sign + tz_hh) || 0,
        minutes    = tz_sign && parseInt(tz_sign + tz_mm) || 0;
    if (utc_tag || tz_sign) return new Date(Date.UTC(year, monthIndex, day, hour, minutes));
    return new Date(year, monthIndex, day);
}; // types.gMonth

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#gMonthDay
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gmonthday
 * @returns {string}
 */
types.gMonthDay = function (value) {
    value                                                 = types.string(value);
    const [match, MM, DD, tz_sign, tz_hh, tz_mm, utc_tag] = util.gMonthDayPattern.exec(value) || [];
    if (!match) throw new Error('invalid gMonthDay pattern');
    const
        year       = 1970,
        monthIndex = parseInt(MM) - 1,
        day        = parseInt(DD),
        hour       = tz_sign && parseInt(tz_sign + tz_hh) || 0,
        minutes    = tz_sign && parseInt(tz_sign + tz_mm) || 0;
    if (utc_tag || tz_sign) return new Date(Date.UTC(year, monthIndex, day, hour, minutes));
    return new Date(year, monthIndex, day);
}; // types.gMonthDay

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#gYear
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gyear
 * @returns {string}
 */
types.gYear = function (value) {
    value                                               = types.string(value);
    const [match, YYYY, tz_sign, tz_hh, tz_mm, utc_tag] = util.gYearPattern.exec(value) || [];
    if (!match) throw new Error('invalid gYear pattern');
    const
        year       = parseInt(YYYY),
        monthIndex = 0,
        day        = 1,
        hour       = tz_sign && parseInt(tz_sign + tz_hh) || 0,
        minutes    = tz_sign && parseInt(tz_sign + tz_mm) || 0;
    if (utc_tag || tz_sign) return new Date(Date.UTC(year, monthIndex, day, hour, minutes));
    return new Date(year, monthIndex, day);
}; // types.gYear

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#gYearMonth
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gyearmonth
 * @returns {string}
 */
types.gYearMonth = function (value) {
    value                                                   = types.string(value);
    const [match, YYYY, MM, tz_sign, tz_hh, tz_mm, utc_tag] = util.gYearMonthPattern.exec(value) || [];
    if (!match) throw new Error('invalid gYearMonth pattern');
    const
        year       = parseInt(YYYY),
        monthIndex = parseInt(MM) - 1,
        day        = 1,
        hour       = tz_sign && parseInt(tz_sign + tz_hh) || 0,
        minutes    = tz_sign && parseInt(tz_sign + tz_mm) || 0;
    if (utc_tag || tz_sign) return new Date(Date.UTC(year, monthIndex, day, hour, minutes));
    return new Date(year, monthIndex, day);
}; // types.gYearMonth

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#duration
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-duration
 * @returns {string}
 */
types.duration = function (value) {
    value                                            = types.string(value);
    const [match, sign, YYYY, MM, DD, hh, mm, ss_ms] = util.durationPattern.exec(value) || [];
    if (!match) throw new Error('invalid duration pattern');
    const
        year         = 1970 + parseInt(YYYY || 0),
        monthIndex   = parseInt(MM || 0),
        day          = 1 + parseInt(DD || 0),
        hour         = parseInt(hh || 0),
        minutes      = parseInt(mm || 0),
        seconds      = parseInt(ss_ms || 0),
        milliseconds = 1000 * (parseFloat(ss_ms || 0) - seconds),
        utcValue     = Date.UTC(year, monthIndex, day, hour, minutes, seconds, milliseconds),
        signFactor   = sign === '-' ? -1 : 1;
    return new Date(signFactor * utcValue);
}; // types.duration

//endregion >> Date

module.exports = Object.freeze(types);
