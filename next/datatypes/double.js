const
    util    = require('../module.xsd.util.js'),
    model   = require('../module.xsd.model.js'),
    pattern = /^(NaN)|([+-]?)(?:(INF)|(\d+(?:\.\d*)?|\.\d+)(?:[eE]([+-]?)(\d+))?)$/;

class double extends model.anySimpleType {

    constructor(value) {
        super(value);

        this.value                                                 = this.value.replace(/\s+/g, ' ').trim();
        const [match, nan, sign, inf, decimal, exp_sign, exponent] = pattern.exec(this.value) || [];
        if (!match) throw new Error('expected to match float pattern');

        this.NaN      = !!nan;
        this.infinite = !!inf;
        this.sign     = this.NaN ? '' : sign || '+';
        this.decimal  = decimal ? decimal.replace(/^0+|0+$/, '') || '0' : '';
        this.exponent = exponent ? exponent.replace(/^0+$/, '') : '';
        this.expSign  = this.exponent ? exp_sign || '+' : '';

        if (this.type === double) util.lockAllProp(this);
    }

    valueOf() {
        if (this.NaN) return NaN;
        if (this.infinite) return this.sign === '-' ? -Infinity : Infinity;
        if (this.exponent) return Number(this.sign + this.decimal + 'e' + this.expSign + this.exponent);
        return Number(this.sign + this.decimal);
    }

}

module.exports = double;
