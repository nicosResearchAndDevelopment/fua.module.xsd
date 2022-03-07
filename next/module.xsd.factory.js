exports.anyType       = require('./factory/anyType.js');
exports.anySimpleType = require('./factory/anySimpleType.js');

exports.string           = require('./factory/string.js');
exports.normalizedString = require('./factory/normalizedString.js');
exports.token            = require('./factory/token.js');

// exports.float = require('./factory/float.js');
// exports.double = require('./factory/double.js');

exports.decimal = require('./factory/decimal.js');
exports.integer = require('./factory/integer.js');

exports.nonPositiveInteger = require('./factory/nonPositiveInteger.js');
exports.negativeInteger    = require('./factory/negativeInteger.js');
exports.nonNegativeInteger = require('./factory/nonNegativeInteger.js');
exports.positiveInteger    = require('./factory/positiveInteger.js');

exports.long  = require('./factory/long.js');
exports.int   = require('./factory/int.js');
exports.short = require('./factory/short.js');
exports.byte  = require('./factory/byte.js');

exports.unsignedLong  = require('./factory/unsignedLong.js');
exports.unsignedInt   = require('./factory/unsignedInt.js');
exports.unsignedShort = require('./factory/unsignedShort.js');
exports.unsignedByte  = require('./factory/unsignedByte.js');
