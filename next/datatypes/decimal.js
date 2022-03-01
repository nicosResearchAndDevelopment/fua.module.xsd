const
    util    = require('../module.xsd.util.js'),
    model   = require('../module.xsd.model.js'),
    pattern = /^([+-])?(?:(\d+)(?:\.(\d*))?|\.(\d+))$/;

class decimal extends model.anySimpleType {

    #sign         = '';
    #decimalPart  = BigInt(0);
    #fractionPart = BigInt(0);

    get value() {
        return super.value;
    }

    set value(value) {
        if (util.isString(value)) {
            const [match, sign, decimalPart, fractionPart, onlyFractionPart] = pattern.exec(value) || [];
            if (!match) throw new Error('expected value to be a decimal');
            this.#sign         = (sign === '-') ? '-' : '';
            this.#decimalPart  = BigInt(decimalPart || '0');
            this.#fractionPart = BigInt('1' + (fractionPart || onlyFractionPart || '0').replace(/0+$/, ''));
            super.value        = parseFloat(this.toString());
        } else if (util.isFiniteNumber(value)) {
            throw new Error('currently not implemented');
            // super.value = BigInt(value);
        } else if (util.isBigInt(value)) {
            this.#fractionPart = BigInt(0);
            if (value < BigInt(0)) {
                this.#sign        = '-';
                this.#decimalPart = BigInt(-1) * value;
                super.value       = -Number(this.#decimalPart);
            } else {
                this.#sign        = '';
                this.#decimalPart = value;
                super.value       = Number(this.#decimalPart);
            }
        } else {
            throw new Error('expected value to be a string, a number or a bigint');
        }
    }

    valueOf() {
        return super.valueOf();
    }

    toString() {
        // const str = super.value.toString(), frac = str.substr(-this.#fractions).padStart(this.#fractions, '0');
        // return str.substr(0, str.length - frac.length) + '.' + frac;
        if (this.#fractionPart === BigInt(0)) return this.#sign + this.#decimalPart.toString();
        return this.#sign + this.#decimalPart.toString() + '.' + this.#fractionPart.toString().substr(1);
    }

}

module.exports = decimal;
