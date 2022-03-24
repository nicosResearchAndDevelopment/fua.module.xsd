const
    util         = require('../module.xsd.util.js'),
    model        = require('../module.xsd.model.js'),
    maxInclusive = '18446744073709551615';

class unsignedLong extends model.nonNegativeInteger {

    static id = util.xsdIRI.unsignedLong;

    constructor(value) {
        super(value);
        delete this.sign;

        if (this.integer.length > maxInclusive.length) throw new Error('value is out of range');
        if (this.integer.length === maxInclusive.length) for (let pos = 0; pos < maxInclusive.length; pos++) {
            const digit = Number(this.integer.charAt(pos)), compare = Number(maxInclusive.charAt(pos));
            if (digit > compare) throw new Error('value is out of range');
            if (digit < compare) break;
        }

        if (this.type === unsignedLong) Object.freeze(this);
    }

}

module.exports = unsignedLong;
