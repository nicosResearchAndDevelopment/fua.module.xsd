const
    util         = require('../module.xsd.util.js'),
    model        = require('../module.xsd.model.js'),
    minInclusive = '-9223372036854775808',
    maxInclusive = '9223372036854775807';

class long extends model.integer {

    constructor(value) {
        super(value);

        const maxInteger = (this.sign === '-') ? minInclusive.substr(1) : maxInclusive;
        if (this.integer.length > maxInteger.length) throw new Error('value is out of range');
        if (this.integer.length === maxInteger.length) for (let pos = 0; pos < maxInteger.length; pos++) {
            const digit = Number(this.integer.charAt(pos)), compare = Number(maxInteger.charAt(pos));
            if (digit > compare) throw new Error('value is out of range');
            if (digit < compare) break;
        }

        if (this.type === long) Object.freeze(this);
    }

}

module.exports = long;
