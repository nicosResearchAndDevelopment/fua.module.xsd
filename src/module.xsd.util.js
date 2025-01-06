const
    _util = require('@fua/core.util'),
    util  = {
        ..._util,
        assert: _util.Assert('module.xsd')
    };

util.DatatypeError = _util.createErrorClass('DatatypeError', 'FUA_ERROR_XSD_DATATYPE');
util.PatternError  = _util.createErrorClass('PatternError', 'FUA_ERROR_XSD_PATTERN');
util.RangeError    = _util.createErrorClass('RangeError', 'FUA_ERROR_XSD_RANGE');

// util.minInteger         = Number.MIN_SAFE_INTEGER;
// util.minIntegerAsBigInt = BigInt(util.minInteger);
// util.maxInteger         = Number.MAX_SAFE_INTEGER;
// util.maxIntegerAsBigInt = BigInt(util.maxInteger);

util.decimalPattern = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/;
util.integerPattern = /^[+-]?\d+$/;
util.floatPattern   = /^(?:NaN|-?INF|[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?)$/;

util.languagePattern = /^[a-z]{1,3}(?:-[a-z0-9]{1,8})*$/i;
util.anyURIPattern   = /^\S*$/;
// https://tools.ietf.org/html/rfc3987#section-2.2
// https://stackoverflow.com/questions/1547899/which-characters-make-a-url-invalid/36667242#answer-36667242
// util.anyURIPattern   = /^[a-z][a-z0-9+.-]*:[^\s"<>\\^`{|}]*$/i;

const
    Char                         = (value) => String.fromCharCode(value),
    NameStartCharPatternString   = ':A-Z_a-z'
        + Char(0xC0) + '-' + Char(0xD6)
        + Char(0xD8) + '-' + Char(0xF6)
        + Char(0xF8) + '-' + Char(0x2FF)
        + Char(0x370) + '-' + Char(0x37D)
        + Char(0x37F) + '-' + Char(0x1FFF)
        + Char(0x200C) + '-' + Char(0x200D)
        + Char(0x2070) + '-' + Char(0x218F)
        + Char(0x2C00) + '-' + Char(0x2FEF)
        + Char(0x3001) + '-' + Char(0xD7FF)
        + Char(0xF900) + '-' + Char(0xFDCF)
        + Char(0xFDF0) + '-' + Char(0xFFFD),
    // + Char(0x10000) + '-' + Char(0xEFFFF), // buggy
    NameCharPatternString        = NameStartCharPatternString
        + '\-.0-9' + Char(0xB7)
        + Char(0x0300) + '-' + Char(0x036F)
        + Char(0x203F) + '-' + Char(0x2040),
    NCNameStartCharPatternString = NameStartCharPatternString.substr(1),
    NCNameCharPatternString      = NameCharPatternString.substr(1);

// https://www.w3.org/TR/xml11/#sec-common-syn
util.NamePattern = new RegExp(`^[${NameStartCharPatternString}][${NameCharPatternString}]*$`);
util.NamesPattern    = new RegExp(`^[${NameStartCharPatternString}][${NameCharPatternString}]*(?: [${NameStartCharPatternString}][${NameCharPatternString}]*)*$`);
util.NmtokenPattern  = new RegExp(`^[${NameCharPatternString}]+$`);
util.NmtokensPattern = new RegExp(`^[${NameCharPatternString}]+(?: [${NameCharPatternString}]+)*$`);
// https://www.w3.org/TR/xml-names11/#ns-decl
util.NCNamePattern   = new RegExp(`^[${NCNameStartCharPatternString}][${NCNameCharPatternString}]*$`);
util.NCNamesPattern  = new RegExp(`^[${NCNameStartCharPatternString}][${NCNameCharPatternString}]* (?: [${NCNameStartCharPatternString}][${NCNameCharPatternString}]*)*$`);
// https://www.w3.org/TR/xml-names11/#ns-qualnames
util.QNamePattern    = new RegExp(`^[${NCNameStartCharPatternString}][${NCNameCharPatternString}]*(:[${NCNameStartCharPatternString}][${NCNameCharPatternString}]*)?$`);

util.datePattern       = /^(-?[1-9][0-9]*)-(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;
util.timePattern       = /^(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9](?:\.[0-9]+)?)(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;
util.dateTimePattern   = /^(-?[1-9][0-9]*)-(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9](?:\.[0-9]+)?)(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;
util.gDayPattern       = /^---(3[01]|[12][0-9]|0[1-9])(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;
util.gMonthPattern     = /^--(1[0-2]|0[1-9])(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;
util.gMonthDayPattern  = /^--(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;
util.gYearPattern      = /^(-?[1-9][0-9]*)(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;
util.gYearMonthPattern = /^(-?[1-9][0-9]*)-(1[0-2]|0[1-9])(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;
util.durationPattern   = /^(-?)P(?=.)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?=.)(?:(\d+)H)?(?:(\d+)M)?(?:(\d*(?:\.\d+)?)S)?)?$/;

module.exports = util;
