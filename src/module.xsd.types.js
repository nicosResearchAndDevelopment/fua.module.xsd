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
    if (util.isObject(value)) {
        if ('@value' in value) value = value['@value'];
        else if ('value' in value) value = value['value'];
    }

    if (typeof value === 'string') {
        if (value === 'true' || value === '1') return true;
        if (value === 'false' || value === '0') return false;
        throw new util.PatternError('expected "true", "false", "1" or "0" for string values');
    }

    if (typeof value === 'number') {
        if (value === 1) return true;
        if (value === 0) return false;
        throw new util.RangeError('expected 1 or 0 for number values');
    }

    if (typeof value === 'boolean') {
        return value;
    }

    throw new util.DatatypeError('expected string, number or boolean');
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
    if (util.isObject(value)) {
        if ('@value' in value) value = value['@value'];
        else if ('value' in value) value = value['value'];
    }

    // if (typeof value === 'string') {
    //     const [match, signPart, intPart, decPart, onlyDecPart] = util.decimalPattern.exec(value) || [];
    //     if (!match) throw new util.PatternError('expected decimal pattern for string values');
    //     const
    //         factor  = signPart === '-' ? -1 : 1,
    //         integer = parseInt(intPart || 0),
    //         decimal = parseFloat(decPart || onlyDecPart || 0) || 0,
    //         result  = factor * (integer + decimal);
    //     if (result === -Infinity || result === Infinity || isNaN(result))
    //         throw new util.RangeError('expected decimals for string values');
    //     return result;
    // }

    if (typeof value === 'string') {
        if (!util.decimalPattern.test(value))
            throw new util.PatternError('expected decimal pattern for string values');
        const result = parseFloat(value);
        if (!util.isFiniteNumber(result))
            throw new util.RangeError('expected decimals for string values');
        return result;
    }

    if (typeof value === 'number') {
        if (!util.isFiniteNumber(value))
            throw new util.RangeError('expected decimals for number values');
        return value;
    }

    throw new util.DatatypeError('expected string or number');
}; // types.decimal

//region >> number / float

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#float
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-float
 * @param {string|number} value
 * @returns {number}
 */
types.float = function (value) {
    value = types.double(value);
    return Math.fround(value);
}; // types.float

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#double
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-double
 * @param {string|number} value
 * @returns {number}
 */
types.double = function (value) {
    if (util.isObject(value)) {
        if ('@value' in value) value = value['@value'];
        else if ('value' in value) value = value['value'];
    }

    if (typeof value === 'string') {
        if (!util.floatPattern.test(value))
            throw new util.PatternError('expected float pattern for string values');
        if (value === 'INF') return Infinity;
        if (value === '-INF') return -Infinity;
        if (value === 'NaN') return NaN;
        return parseFloat(value);
    }

    if (typeof value === 'number') {
        return value;
    }

    throw new util.DatatypeError('expected string or number');
}; // types.double

//endregion >> number / float
//region >> number / integer

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#integer
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-integer
 * @param {string|number} value
 * @returns {number}
 */
types.integer = function (value) {
    if (util.isObject(value)) {
        if ('@value' in value) value = value['@value'];
        else if ('value' in value) value = value['value'];
    }

    // TODO integrate BigInt and MAX_SAFE_INTEGER

    if (typeof value === 'string') {
        if (!util.integerPattern.test(value))
            throw new util.PatternError('expected integer pattern for string values');
        const result = parseInt(value);
        if (!util.isInteger(result))
            throw new util.RangeError('expected integers for string values');
        return result;
    }

    if (typeof value === 'number') {
        if (!util.isInteger(value))
            throw new util.RangeError('expected integers for number values');
        return value;
    }

    throw new util.DatatypeError('expected string or number');
}; // types.integer

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#nonNegativeInteger
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-nonnegativeinteger
 * @param {string|number} value
 * @returns {number}
 */
types.nonNegativeInteger = function (value) {
    value = types.integer(value);
    if (value < 0) throw new util.RangeError('expected to be greater than or equal to 0');
    return value;
}; // types.nonNegativeInteger

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#positiveInteger
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-positiveinteger
 * @param {string|number} value
 * @returns {number}
 */
types.positiveInteger = function (value) {
    value = types.integer(value);
    if (value <= 0) throw new util.RangeError('expected to be greater than 0');
    return value;
}; // types.positiveInteger

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#nonPositiveInteger
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-nonpositiveinteger
 * @param {string|number} value
 * @returns {number}
 */
types.nonPositiveInteger = function (value) {
    value = types.integer(value);
    if (value > 0) throw new util.RangeError('expected to be less than or equal to 0');
    return value;
}; // types.nonPositiveInteger

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#negativeInteger
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-negativeinteger
 * @param {string|number} value
 * @returns {number}
 */
types.negativeInteger = function (value) {
    value = types.integer(value);
    if (value >= 0) throw new util.RangeError('expected to be less than 0');
    return value;
}; // types.negativeInteger

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#long
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-long
 * @param {string|number} value
 * @returns {number}
 */
types.long = function (value) {
    value = types.integer(value);
    if (value < -9223372036854775808 || value > 9223372036854775807)
        throw new util.RangeError('expected to be between -9223372036854775808 and 9223372036854775807');
    return value;
}; // types.long

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#int
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-int
 * @param {string|number} value
 * @returns {number}
 */
types.int = function (value) {
    value = types.integer(value);
    if (value < -2147483648 || value > 2147483647)
        throw new util.RangeError('expected to be between -2147483648 and 2147483647');
    return value;
}; // types.int

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#short
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-short
 * @param {string|number} value
 * @returns {number}
 */
types.short = function (value) {
    value = types.integer(value);
    if (value < -32768 || value > 32767)
        throw new util.RangeError('expected to be between -32768 and 32767');
    return value;
}; // types.short

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#byte
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-byte
 * @param {string|number} value
 * @returns {number}
 */
types.byte = function (value) {
    value = types.integer(value);
    if (value < -128 || value > 127)
        throw new util.RangeError('expected to be between -128 and 127');
    return value;
}; // types.byte

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#unsignedLong
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-unsignedlong
 * @param {string|number} value
 * @returns {number}
 */
types.unsignedLong = function (value) {
    value = types.integer(value);
    if (value < 0 || value > 18446744073709551615)
        throw new util.RangeError('expected to be between 0 and 18446744073709551615');
    return value;
}; // types.unsignedLong

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#unsignedInt
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-unsignedint
 * @param {string|number} value
 * @returns {number}
 */
types.unsignedInt = function (value) {
    value = types.integer(value);
    if (value < 0 || value > 4294967295)
        throw new util.RangeError('expected to be between 0 and 4294967295');
    return value;
}; // types.unsignedInt

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#unsignedShort
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-unsignedshort
 * @param {string|number} value
 * @returns {number}
 */
types.unsignedShort = function (value) {
    value = types.integer(value);
    if (value < 0 || value > 65535)
        throw new util.RangeError('expected to be between 0 and 65535');
    return value;
}; // types.unsignedShort

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#unsignedByte
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-unsignedbyte
 * @param {string|number} value
 * @returns {number}
 */
types.unsignedByte = function (value) {
    value = types.integer(value);
    if (value < 0 || value > 255)
        throw new util.RangeError('expected to be between 0 and 255');
    return value;
}; // types.unsignedByte

//endregion >> number / integer

//endregion >> number
//region >> string

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#string
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-string
 * @param {string} value
 * @returns {string}
 */
types.string = function (value) {
    if (util.isObject(value)) {
        if ('@value' in value) value = value['@value'];
        else if ('value' in value) value = value['value'];
    }

    if (typeof value === 'string') {
        return value;
    }

    throw new util.DatatypeError('expected string');
}; // types.string

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#normalizedString
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-normalizedstring
 * @param {string} value
 * @returns {string}
 */
types.normalizedString = function (value) {
    value = types.string(value);
    return value.replace(/\s/g, ' ');
}; // types.normalizedString

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#token
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-token
 * @param {string} value
 * @returns {string}
 */
types.token = function (value) {
    value = types.string(value);
    return value.replace(/\s+/g, ' ').trim();
}; // types.token

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#anyURI
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-anyuri
 * @param {string} value
 * @returns {string}
 */
types.anyURI = function (value) {
    value = types.string(value);
    if (!util.anyURIPattern.test(value))
        throw new util.PatternError('expected anyURI pattern for string values');
    return value;
}; // types.anyURI

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#language
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-language
 * @param {string} value
 * @returns {string}
 */
types.language = function (value) {
    value = types.string(value);
    if (!util.languagePattern.test(value))
        throw new util.PatternError('expected language pattern for string values');
    return value;
}; // types.language

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#Name
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-name
 * @param {string} value
 * @returns {string}
 */
types.Name = function (value) {
    value = types.string(value);
    if (!util.NamePattern.test(value))
        throw new util.PatternError('expected Name pattern for string values');
    return value;
}; // types.Name

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#NCName
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-ncname
 * @param {string} value
 * @returns {string}
 */
types.NCName = function (value) {
    value = types.string(value);
    if (!util.NCNamePattern.test(value))
        throw new util.PatternError('expected NCName pattern for string values');
    return value;
}; // types.NCName

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#ID
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-id
 * @param {string} value
 * @returns {string}
 */
types.ID = function (value) {
    value = types.string(value);
    if (!util.NCNamePattern.test(value))
        throw new util.PatternError('expected NCName pattern for string values');
    return value;
}; // types.ID

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#IDREF
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-idref
 * @param {string} value
 * @returns {string}
 */
types.IDREF = function (value) {
    value = types.string(value);
    if (!util.NCNamePattern.test(value))
        throw new util.PatternError('expected NCName pattern for string values');
    return value;
}; // types.IDREF

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#IDREFS
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-idrefs
 * @param {string|Array<string>} value
 * @returns {Array<string>}
 */
types.IDREFS = function (value) {
    if (util.isArray(value)) {
        return value.map(types.IDREF);
    }

    value = types.string(value);
    if (!util.NCNamesPattern.test(value))
        throw new util.PatternError('expected NCNames pattern for string values');
    return value.split(' ');
}; // types.IDREFS

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#ENTITY
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-entity
 * @param {string} value
 * @returns {string}
 */
types.ENTITY = function (value) {
    value = types.string(value);
    if (!util.NCNamePattern.test(value))
        throw new util.PatternError('expected NCName pattern for string values');
    return value;
}; // types.ENTITY

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#ENTITIES
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-entities
 * @param {string|Array<string>} value
 * @returns {Array<string>}
 */
types.ENTITIES = function (value) {
    if (util.isArray(value)) {
        return value.map(types.ENTITY);
    }

    value = types.string(value);
    if (!util.NCNamesPattern.test(value))
        throw new util.PatternError('expected NCNames pattern for string values');
    return value.split(' ');
}; // types.ENTITIES

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#QName
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-qname
 * @param {string} value
 * @returns {string}
 */
types.QName = function (value) {
    value = types.string(value);
    if (!util.QNamePattern.test(value))
        throw new util.PatternError('expected QName pattern for string values');
    return value;
}; // types.QName

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#NOTATION
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-notation
 * @param {string} value
 * @returns {string}
 */
types.NOTATION = function (value) {
    value = types.string(value);
    if (!util.QNamePattern.test(value))
        throw new util.PatternError('expected QName pattern for string values');
    return value;
}; // types.NOTATION

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#NMTOKEN
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-nmtoken
 * @param {string} value
 * @returns {string}
 */
types.NMTOKEN = function (value) {
    value = types.string(value);
    if (!util.NmtokenPattern.test(value))
        throw new util.PatternError('expected NMTOKEN pattern for string values');
    return value;
}; // types.NMTOKEN

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#NMTOKENS
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-nmtokens
 * @param {string|Array<string>} value
 * @returns {Array<string>}
 */
types.NMTOKENS = function (value) {
    if (util.isArray(value)) {
        return value.map(types.NMTOKEN);
    }

    value = types.string(value);
    if (!util.NmtokensPattern.test(value))
        throw new util.PatternError('expected NMTOKENS pattern for string values');
    return value.split(' ');
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

    throw new util.DatatypeError('expected string or Buffer');
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

    throw new util.DatatypeError('expected string or Buffer');
}; // types.hexBinary

//endregion >> Buffer
//region >> Date

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#date
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-date
 * @param {string} value
 * @returns {Date}
 */
types.date = function (value) {
    if (util.isObject(value)) {
        if ('@value' in value) value = value['@value'];
        else if ('value' in value) value = value['value'];
    }

    if (typeof value === 'string') {
        const [match, YYYY, MM, DD, tz_sign, tz_hh, tz_mm, utc_tag] = util.datePattern.exec(value) || [];
        if (!match) throw new util.PatternError('expected date pattern for string values');
        const
            year       = parseInt(YYYY),
            monthIndex = parseInt(MM) - 1,
            day        = parseInt(DD),
            hour       = tz_sign && parseInt(tz_sign + tz_hh) || 0,
            minutes    = tz_sign && parseInt(tz_sign + tz_mm) || 0;
        if (utc_tag || tz_sign) return new Date(Date.UTC(year, monthIndex, day, hour, minutes));
        return new Date(year, monthIndex, day);
    }

    throw new util.DatatypeError('expected string');
}; // types.date

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#time
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-time
 * @param {string} value
 * @returns {Date}
 */
types.time = function (value) {
    if (util.isObject(value)) {
        if ('@value' in value) value = value['@value'];
        else if ('value' in value) value = value['value'];
    }

    if (typeof value === 'string') {
        const [match, hh, mm, ss_ms, tz_sign, tz_hh, tz_mm, utc_tag] = util.timePattern.exec(value) || [];
        if (!match) throw new util.PatternError('expected time pattern for string values');
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
    }

    throw new util.DatatypeError('expected string');
}; // types.time

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#dateTime
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-datetime
 * @param {string|Date} value
 * @returns {Date}
 */
types.dateTime = function (value) {
    if (util.isObject(value)) {
        if ('@value' in value) value = value['@value'];
        else if ('value' in value) value = value['value'];
    }

    if (typeof value === 'string') {
        const [match, YYYY, MM, DD, hh, mm, ss_ms, tz_sign, tz_hh, tz_mm, utc_tag] = util.dateTimePattern.exec(value) || [];
        if (!match) throw new util.PatternError('expected dateTime pattern for string values');
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
    }

    if (util.isDate(value)) {
        return value;
    }

    throw new util.DatatypeError('expected string or Date');
}; // types.dateTime

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#gDay
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gday
 * @param {string} value
 * @returns {Date}
 */
types.gDay = function (value) {
    if (util.isObject(value)) {
        if ('@value' in value) value = value['@value'];
        else if ('value' in value) value = value['value'];
    }

    if (typeof value === 'string') {
        const [match, DD, tz_sign, tz_hh, tz_mm, utc_tag] = util.gDayPattern.exec(value) || [];
        if (!match) throw new util.PatternError('expected gDay pattern for string values');
        const
            year       = 1970,
            monthIndex = 0,
            day        = parseInt(DD),
            hour       = tz_sign && parseInt(tz_sign + tz_hh) || 0,
            minutes    = tz_sign && parseInt(tz_sign + tz_mm) || 0;
        if (utc_tag || tz_sign) return new Date(Date.UTC(year, monthIndex, day, hour, minutes));
        return new Date(year, monthIndex, day);
    }

    throw new util.DatatypeError('expected string');
}; // types.gDay

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#gMonth
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gmonth
 * @param {string} value
 * @returns {Date}
 */
types.gMonth = function (value) {
    if (util.isObject(value)) {
        if ('@value' in value) value = value['@value'];
        else if ('value' in value) value = value['value'];
    }

    if (typeof value === 'string') {
        const [match, MM, tz_sign, tz_hh, tz_mm, utc_tag] = util.gMonthPattern.exec(value) || [];
        if (!match) throw new util.PatternError('expected gMonth pattern for string values');
        const
            year       = 1970,
            monthIndex = parseInt(MM) - 1,
            day        = 1,
            hour       = tz_sign && parseInt(tz_sign + tz_hh) || 0,
            minutes    = tz_sign && parseInt(tz_sign + tz_mm) || 0;
        if (utc_tag || tz_sign) return new Date(Date.UTC(year, monthIndex, day, hour, minutes));
        return new Date(year, monthIndex, day);
    }

    throw new util.DatatypeError('expected string');
}; // types.gMonth

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#gMonthDay
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gmonthday
 * @param {string} value
 * @returns {Date}
 */
types.gMonthDay = function (value) {
    if (util.isObject(value)) {
        if ('@value' in value) value = value['@value'];
        else if ('value' in value) value = value['value'];
    }

    if (typeof value === 'string') {
        const [match, MM, DD, tz_sign, tz_hh, tz_mm, utc_tag] = util.gMonthDayPattern.exec(value) || [];
        if (!match) throw new util.PatternError('expected gMonthDay pattern for string values');
        const
            year       = 1970,
            monthIndex = parseInt(MM) - 1,
            day        = parseInt(DD),
            hour       = tz_sign && parseInt(tz_sign + tz_hh) || 0,
            minutes    = tz_sign && parseInt(tz_sign + tz_mm) || 0;
        if (utc_tag || tz_sign) return new Date(Date.UTC(year, monthIndex, day, hour, minutes));
        return new Date(year, monthIndex, day);
    }

    throw new util.DatatypeError('expected string');
}; // types.gMonthDay

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#gYear
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gyear
 * @param {string} value
 * @returns {Date}
 */
types.gYear = function (value) {
    if (util.isObject(value)) {
        if ('@value' in value) value = value['@value'];
        else if ('value' in value) value = value['value'];
    }

    if (typeof value === 'string') {
        const [match, YYYY, tz_sign, tz_hh, tz_mm, utc_tag] = util.gYearPattern.exec(value) || [];
        if (!match) throw new util.PatternError('expected gYear pattern for string values');
        const
            year       = parseInt(YYYY),
            monthIndex = 0,
            day        = 1,
            hour       = tz_sign && parseInt(tz_sign + tz_hh) || 0,
            minutes    = tz_sign && parseInt(tz_sign + tz_mm) || 0;
        if (utc_tag || tz_sign) return new Date(Date.UTC(year, monthIndex, day, hour, minutes));
        return new Date(year, monthIndex, day);
    }

    throw new util.DatatypeError('expected string');
}; // types.gYear

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#gYearMonth
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gyearmonth
 * @param {string} value
 * @returns {Date}
 */
types.gYearMonth = function (value) {
    if (util.isObject(value)) {
        if ('@value' in value) value = value['@value'];
        else if ('value' in value) value = value['value'];
    }

    if (typeof value === 'string') {
        const [match, YYYY, MM, tz_sign, tz_hh, tz_mm, utc_tag] = util.gYearMonthPattern.exec(value) || [];
        if (!match) throw new util.PatternError('expected gYearMonth pattern for string values');
        const
            year       = parseInt(YYYY),
            monthIndex = parseInt(MM) - 1,
            day        = 1,
            hour       = tz_sign && parseInt(tz_sign + tz_hh) || 0,
            minutes    = tz_sign && parseInt(tz_sign + tz_mm) || 0;
        if (utc_tag || tz_sign) return new Date(Date.UTC(year, monthIndex, day, hour, minutes));
        return new Date(year, monthIndex, day);
    }

    throw new util.DatatypeError('expected string');
}; // types.gYearMonth

/**
 * @see https://www.w3.org/TR/xmlschema11-2/#duration
 * @see https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-duration
 * @param {string} value
 * @returns {Date}
 */
types.duration = function (value) {
    if (util.isObject(value)) {
        if ('@value' in value) value = value['@value'];
        else if ('value' in value) value = value['value'];
    }

    if (typeof value === 'string') {
        const [match, sign, YYYY, MM, DD, hh, mm, ss_ms] = util.durationPattern.exec(value) || [];
        if (!match) throw new util.PatternError('expected duration pattern for string values');
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
    }

    throw new util.DatatypeError('expected string');
}; // types.duration

//endregion >> Date

module.exports = Object.freeze(types);
