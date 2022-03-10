const
    _util         = require('@nrd/fua.core.util'),
    util          = {
        ..._util,
        assert: _util.Assert('module.xsd'),
        xsdIRI: (prop) => 'xsd:' + prop,
        xsdURI: (prop) => 'http://www.w3.org/2001/XMLSchema#' + prop
    },
    DecimalFormat = new Intl.NumberFormat('en', {style: 'decimal', useGrouping: false, maximumSignificantDigits: 21});

util.decimalToString = function (value) {
    return DecimalFormat.format(value);
};

util.replaceWhiteSpace = function (value) {
    return value.replace(/\s/g, ' ');
};

util.collapseWhiteSpace = function (value) {
    return value.replace(/\s+/g, ' ').trim();
};

util.xsdIRI.anyType            = util.xsdIRI('anyType');
util.xsdIRI.anySimpleType      = util.xsdIRI('anySimpleType');
util.xsdIRI.anyAtomicType      = util.xsdIRI('anyAtomicType');
util.xsdIRI.string             = util.xsdIRI('string');
util.xsdIRI.boolean            = util.xsdIRI('boolean');
util.xsdIRI.decimal            = util.xsdIRI('decimal');
util.xsdIRI.float              = util.xsdIRI('float');
util.xsdIRI.double             = util.xsdIRI('double');
util.xsdIRI.duration           = util.xsdIRI('duration');
util.xsdIRI.dateTime           = util.xsdIRI('dateTime');
util.xsdIRI.time               = util.xsdIRI('time');
util.xsdIRI.date               = util.xsdIRI('date');
util.xsdIRI.gYearMonth         = util.xsdIRI('gYearMonth');
util.xsdIRI.gYear              = util.xsdIRI('gYear');
util.xsdIRI.gMonthDay          = util.xsdIRI('gMonthDay');
util.xsdIRI.gDay               = util.xsdIRI('gDay');
util.xsdIRI.gMonth             = util.xsdIRI('gMonth');
util.xsdIRI.hexBinary          = util.xsdIRI('hexBinary');
util.xsdIRI.base64Binary       = util.xsdIRI('base64Binary');
util.xsdIRI.anyURI             = util.xsdIRI('anyURI');
util.xsdIRI.QName              = util.xsdIRI('QName');
util.xsdIRI.NOTATION           = util.xsdIRI('NOTATION');
util.xsdIRI.normalizedString   = util.xsdIRI('normalizedString');
util.xsdIRI.token              = util.xsdIRI('token');
util.xsdIRI.language           = util.xsdIRI('language');
util.xsdIRI.NMTOKEN            = util.xsdIRI('NMTOKEN');
util.xsdIRI.NMTOKENS           = util.xsdIRI('NMTOKENS');
util.xsdIRI.Name               = util.xsdIRI('Name');
util.xsdIRI.NCName             = util.xsdIRI('NCName');
util.xsdIRI.ID                 = util.xsdIRI('ID');
util.xsdIRI.IDREF              = util.xsdIRI('IDREF');
util.xsdIRI.IDREFS             = util.xsdIRI('IDREFS');
util.xsdIRI.ENTITY             = util.xsdIRI('ENTITY');
util.xsdIRI.ENTITIES           = util.xsdIRI('ENTITIES');
util.xsdIRI.integer            = util.xsdIRI('integer');
util.xsdIRI.nonPositiveInteger = util.xsdIRI('nonPositiveInteger');
util.xsdIRI.negativeInteger    = util.xsdIRI('negativeInteger');
util.xsdIRI.long               = util.xsdIRI('long');
util.xsdIRI.int                = util.xsdIRI('int');
util.xsdIRI.short              = util.xsdIRI('short');
util.xsdIRI.byte               = util.xsdIRI('byte');
util.xsdIRI.nonNegativeInteger = util.xsdIRI('nonNegativeInteger');
util.xsdIRI.unsignedLong       = util.xsdIRI('unsignedLong');
util.xsdIRI.unsignedInt        = util.xsdIRI('unsignedInt');
util.xsdIRI.unsignedShort      = util.xsdIRI('unsignedShort');
util.xsdIRI.unsignedByte       = util.xsdIRI('unsignedByte');
util.xsdIRI.positiveInteger    = util.xsdIRI('positiveInteger');
util.xsdIRI.yearMonthDuration  = util.xsdIRI('yearMonthDuration');
util.xsdIRI.dayTimeDuration    = util.xsdIRI('dayTimeDuration');
util.xsdIRI.dateTimeStamp      = util.xsdIRI('dateTimeStamp');

util.xsdURI.anyType            = util.xsdURI('anyType');
util.xsdURI.anySimpleType      = util.xsdURI('anySimpleType');
util.xsdURI.anyAtomicType      = util.xsdURI('anyAtomicType');
util.xsdURI.string             = util.xsdURI('string');
util.xsdURI.boolean            = util.xsdURI('boolean');
util.xsdURI.decimal            = util.xsdURI('decimal');
util.xsdURI.float              = util.xsdURI('float');
util.xsdURI.double             = util.xsdURI('double');
util.xsdURI.duration           = util.xsdURI('duration');
util.xsdURI.dateTime           = util.xsdURI('dateTime');
util.xsdURI.time               = util.xsdURI('time');
util.xsdURI.date               = util.xsdURI('date');
util.xsdURI.gYearMonth         = util.xsdURI('gYearMonth');
util.xsdURI.gYear              = util.xsdURI('gYear');
util.xsdURI.gMonthDay          = util.xsdURI('gMonthDay');
util.xsdURI.gDay               = util.xsdURI('gDay');
util.xsdURI.gMonth             = util.xsdURI('gMonth');
util.xsdURI.hexBinary          = util.xsdURI('hexBinary');
util.xsdURI.base64Binary       = util.xsdURI('base64Binary');
util.xsdURI.anyURI             = util.xsdURI('anyURI');
util.xsdURI.QName              = util.xsdURI('QName');
util.xsdURI.NOTATION           = util.xsdURI('NOTATION');
util.xsdURI.normalizedString   = util.xsdURI('normalizedString');
util.xsdURI.token              = util.xsdURI('token');
util.xsdURI.language           = util.xsdURI('language');
util.xsdURI.NMTOKEN            = util.xsdURI('NMTOKEN');
util.xsdURI.NMTOKENS           = util.xsdURI('NMTOKENS');
util.xsdURI.Name               = util.xsdURI('Name');
util.xsdURI.NCName             = util.xsdURI('NCName');
util.xsdURI.ID                 = util.xsdURI('ID');
util.xsdURI.IDREF              = util.xsdURI('IDREF');
util.xsdURI.IDREFS             = util.xsdURI('IDREFS');
util.xsdURI.ENTITY             = util.xsdURI('ENTITY');
util.xsdURI.ENTITIES           = util.xsdURI('ENTITIES');
util.xsdURI.integer            = util.xsdURI('integer');
util.xsdURI.nonPositiveInteger = util.xsdURI('nonPositiveInteger');
util.xsdURI.negativeInteger    = util.xsdURI('negativeInteger');
util.xsdURI.long               = util.xsdURI('long');
util.xsdURI.int                = util.xsdURI('int');
util.xsdURI.short              = util.xsdURI('short');
util.xsdURI.byte               = util.xsdURI('byte');
util.xsdURI.nonNegativeInteger = util.xsdURI('nonNegativeInteger');
util.xsdURI.unsignedLong       = util.xsdURI('unsignedLong');
util.xsdURI.unsignedInt        = util.xsdURI('unsignedInt');
util.xsdURI.unsignedShort      = util.xsdURI('unsignedShort');
util.xsdURI.unsignedByte       = util.xsdURI('unsignedByte');
util.xsdURI.positiveInteger    = util.xsdURI('positiveInteger');
util.xsdURI.yearMonthDuration  = util.xsdURI('yearMonthDuration');
util.xsdURI.dayTimeDuration    = util.xsdURI('dayTimeDuration');
util.xsdURI.dateTimeStamp      = util.xsdURI('dateTimeStamp');

module.exports = util;
