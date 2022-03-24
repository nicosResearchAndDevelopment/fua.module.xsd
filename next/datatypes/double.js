const
    util    = require('../module.xsd.util.js'),
    model   = require('../module.xsd.model.js'),
    pattern = /^(?:(NaN)|([+-]?)(?:(INF)|(?:(\d+)(?:\.(\d*))?|\.(\d+))(?:[eE]([+-]?)(\d+))?))$/;

class double extends model.anySimpleType {

    static id = util.xsdIRI.double;

    constructor(value) {
        if (util.isAnyNumber(value))
            value = isNaN(value) ? 'NaN' : value === Infinity ? 'INF' : value === -Infinity ? '-INF' : value.toString();

        super(value);

        this.value                                                                          = util.collapseWhiteSpace(this.value);
        const [match, nan, sign, inf, integer, fraction, only_fraction, exp_sign, exponent] = pattern.exec(this.value) || [];
        if (!match) throw new Error('expected to match float pattern');

        // FIXME lexical value and numeric value differentiation (infinity problem, precision problem)

        this.NaN      = !!nan;
        this.infinite = !!inf;
        this.sign     = this.NaN ? '' : sign || '+';
        this.integer  = this.NaN || this.infinite ? '' : (integer || '').replace(/^0+/, '') || '0';
        this.fraction = this.NaN || this.infinite ? '' : (fraction || only_fraction || '').replace(/0+$/, '') || '0';
        this.decimal  = this.integer || this.fraction ? this.integer + (this.fraction === '0' ? '' : '.' + this.fraction) : '';
        delete this.integer;
        delete this.fraction;
        this.exponent = exponent ? exponent.replace(/^0+$/, '') : '';
        this.expSign  = this.exponent ? exp_sign || '+' : '';
        this.value    = this.NaN ? 'NaN' : (this.sign === '-' ? '-' : '') +
            (this.infinite ? 'INF' : this.decimal + (this.exponent ? 'e' + this.expSign + this.exponent : ''));

        this.numericSign  = this.sign === '+' && 1 || this.sign === '-' && -1 || 0;
        this.numericValue = this.NaN ? NaN
            : this.infinite ? this.numericSign * Infinity
                : this.exponent ? Number(this.sign + this.decimal + 'e' + this.expSign + this.exponent)
                    : Number(this.sign + this.decimal);

        if (this.type === double) Object.freeze(this);
    }

    valueOf() {
        return this.numericValue;
    }

}

module.exports = double;
