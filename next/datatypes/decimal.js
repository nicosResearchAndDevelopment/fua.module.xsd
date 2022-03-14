const
    util    = require('../module.xsd.util.js'),
    model   = require('../module.xsd.model.js'),
    pattern = /^([+-]?)(?:(\d+)(?:\.(\d*))?|\.(\d+))$/;

class decimal extends model.anySimpleType {

    constructor(value) {
        if (util.isFiniteNumber(value))
            value = util.decimalToString(value);

        super(value);

        this.value                                            = util.collapseWhiteSpace(this.value);
        const [match, sign, integer, fraction, only_fraction] = pattern.exec(this.value) || [];
        if (!match) throw new Error('expected to match decimal pattern');

        this.sign     = sign || '+';
        this.integer  = (integer || '').replace(/^0+/, '') || '0';
        this.fraction = (fraction || only_fraction || '').replace(/0+$/, '') || '0';
        this.value    = (this.sign === '-' ? '-' : '') + this.integer + (this.fraction === '0' ? '' : '.' + this.fraction);

        if (this.type === decimal) Object.freeze(this);
    }

    valueOf() {
        return Number(this.toString());
    }

}

module.exports = decimal;
