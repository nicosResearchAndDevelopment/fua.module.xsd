// const util                = require('./module.xsd.util.js');
// exports._Datatype         = require('./module.xsd.Datatype.js');
// exports._DatatypeProperty = require('./module.xsd.DatatypeProperty.js');
// util.hideProp(exports, '_Datatype', '_DatatypeProperty');

// Special Datatypes: https://www.w3.org/TR/xmlschema11-2/#special-datatypes

exports.anyType       = require('./datatypes/anyType.js');
exports.anySimpleType = require('./datatypes/anySimpleType.js');
exports.anyAtomicType = require('./datatypes/anyAtomicType.js');

// Primitive Datatypes: https://www.w3.org/TR/xmlschema11-2/#built-in-primitive-datatypes

exports.string       = require('./datatypes/string.js');
exports.boolean      = require('./datatypes/boolean.js');
exports.decimal      = require('./datatypes/decimal.js');
exports.double       = require('./datatypes/double.js');
exports.float        = require('./datatypes/float.js');
exports.duration     = require('./datatypes/duration.js');
exports.dateTime     = require('./datatypes/dateTime.js');
exports.time         = require('./datatypes/time.js');
exports.date         = require('./datatypes/date.js');
exports.gYearMonth   = require('./datatypes/gYearMonth.js');
exports.gYear        = require('./datatypes/gYear.js');
exports.gMonthDay    = require('./datatypes/gMonthDay.js');
exports.gDay         = require('./datatypes/gDay.js');
exports.gMonth       = require('./datatypes/gMonth.js');
exports.hexBinary    = require('./datatypes/hexBinary.js');
exports.base64Binary = require('./datatypes/base64Binary.js');
exports.anyURI       = require('./datatypes/anyURI.js');
exports.QName        = require('./datatypes/QName.js');
exports.NOTATION     = require('./datatypes/NOTATION.js');

// Other Datatypes: https://www.w3.org/TR/xmlschema11-2/#ordinary-built-ins

exports.normalizedString   = require('./datatypes/normalizedString.js');
exports.token              = require('./datatypes/token.js');
exports.language           = require('./datatypes/language.js');
exports.NMTOKEN            = require('./datatypes/NMTOKEN.js');
exports.NMTOKENS           = require('./datatypes/NMTOKENS.js');
exports.Name               = require('./datatypes/Name.js');
exports.NCName             = require('./datatypes/NCName.js');
exports.ID                 = require('./datatypes/ID.js');
exports.IDREF              = require('./datatypes/IDREF.js');
exports.IDREFS             = require('./datatypes/IDREFS.js');
exports.ENTITY             = require('./datatypes/ENTITY.js');
exports.ENTITIES           = require('./datatypes/ENTITIES.js');
exports.integer            = require('./datatypes/integer.js');
exports.nonPositiveInteger = require('./datatypes/nonPositiveInteger.js');
exports.negativeInteger    = require('./datatypes/negativeInteger.js');
exports.long               = require('./datatypes/long.js');
exports.int                = require('./datatypes/int.js');
exports.short              = require('./datatypes/short.js');
exports.byte               = require('./datatypes/byte.js');
exports.nonNegativeInteger = require('./datatypes/nonNegativeInteger.js');
exports.unsignedLong       = require('./datatypes/unsignedLong.js');
exports.unsignedInt        = require('./datatypes/unsignedInt.js');
exports.unsignedShort      = require('./datatypes/unsignedShort.js');
exports.unsignedByte       = require('./datatypes/unsignedByte.js');
exports.positiveInteger    = require('./datatypes/positiveInteger.js');
exports.yearMonthDuration  = require('./datatypes/yearMonthDuration.js');
exports.dayTimeDuration    = require('./datatypes/dayTimeDuration.js');
exports.dateTimeStamp      = require('./datatypes/dateTimeStamp.js');
