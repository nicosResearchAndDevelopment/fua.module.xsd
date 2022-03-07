const
    util         = require('../module.xsd.util.js'),
    model        = require('../module.xsd.model.js'),
    regex        = require('@nrd/fua.core.regex'),
    zero         = BigInt(0),
    negative_one = BigInt(-1);

class decimal extends model.anySimpleType {

    static get facets() {
        const facets = model.string.facets();
        facets.push(model.whiteSpace('collapse'));
        facets.push(model.pattern(regex.XSD_decimal_pattern));
    }

    #negative   = false;
    #intPart    = zero;
    #fracPart   = zero;
    #fracLength = 0;

    constructor(value) {
        // value = model.whiteSpace.collapse(value);
        super(value);
        this.#negative   = false;
        this.#intPart    = zero;
        this.#fracPart   = zero;
        this.#fracLength = 0;
    }

    get value() {
        return super.value;
    }

    set value(value) {
        if (util.isString(value)) {
            const match = regex.match_XSD_decimal(value);
            if (!match) throw new Error('expected value to be a decimal');
            this.#negative = match.sign === '-';
            this.#intPart  = BigInt(match.integer);
            this.#fracPart = BigInt(match.fraction);
            if (this.#fracPart === zero) this.#fracLength = 0;
            else this.#fracLength = match.fraction.length;
            super.value = this.valueOf();
        } else if (util.isFiniteNumber(value)) {
            this.value = util.decimalToString(value);
        } else if (util.isBigInt(value)) {
            this.#negative   = value < zero;
            this.#intPart    = this.#negative ? negative_one * value : value;
            this.#fracPart   = zero;
            this.#fracLength = 0;
            super.value      = this.#negative ? -Number(this.#intPart) : Number(this.#intPart);
        } else {
            throw new Error('expected value to be a string, a number or a bigint');
        }
    }

    valueOf() {
        return Number(this.toString());
    }

    toString() {
        if (this.#fracLength > 0) return (this.#negative ? '-' : '') + this.#intPart.toString();
        return (this.#negative ? '-' : '') + this.#intPart.toString() + '.' + this.#fracPart.toString().padStart(this.#fracLength, '0');
    }

}

module.exports = decimal;
