const
    util         = require('../module.xsd.util.js'),
    model        = require('../module.xsd.model.js'),
    maxInclusive = '255';

class unsignedByte extends model.unsignedShort {

    constructor(value) {
        super(value);

        if (this.integer.length > maxInclusive.length) throw new Error('value is out of range');
        if (this.integer.length === maxInclusive.length) for (let pos = 0; pos < maxInclusive.length; pos++) {
            const digit = Number(this.integer.charAt(pos)), compare = Number(maxInclusive.charAt(pos));
            if (digit > compare) throw new Error('value is out of range');
            if (digit < compare) break;
        }

        if (this.type === unsignedByte) Object.freeze(this);
    }

}

module.exports = unsignedByte;
