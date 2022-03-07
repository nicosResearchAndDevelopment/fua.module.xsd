const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class anySimpleType extends model.anyType {

    #value = '';

    constructor(value) {
        if (new.target === anySimpleType) throw new Error('abstract class cannot be constructed');
        // if (!util.isString(value)) throw new Error('expected value to be a string');
        super();
        // this.#value = value;
        this.value = value;
    }

    get value() {
        return this.#value;
    }

    // set value(value) {
    //     const facets = this.type.facets || [];
    //     for (let facet of facets) {
    //         value = facet(value);
    //     }
    //     this.#value = value;
    // }

    set value(value) {
        if (!util.isString(value)) throw new Error('expected value to be a string');

        const list = this.type.list;
        if (list) {
            value = value.replace(/\s+/g, ' ').trim().split(' ').map(elem => list.from(elem));

            const length = this.type.length;
            // FIXME length is a property of function which cannot be used
            // if (util.isNotNull(length)) {
            //     if (value.length !== length)
            //         throw new Error('expected value to have a length of ' + length);
            // }

            const minLength = this.type.minLength;
            if (util.isNotNull(minLength)) {
                if (value.length < minLength)
                    throw new Error('expected value to have a minimum length of ' + minLength);
            }

            const maxLength = this.type.maxLength;
            if (util.isNotNull(maxLength)) {
                if (value.length > maxLength)
                    throw new Error('expected value to have a maximum length of ' + maxLength);
            }
        } else {
            const whiteSpace = this.type.whiteSpace;
            if (util.isNotNull(whiteSpace)) {
                switch (whiteSpace) {
                    case 'replace':
                        value = value.replace(/\s/g, ' ');
                        break;
                    case 'collapse':
                        value = value.replace(/\s+/g, ' ').trim();
                        break;
                    case 'preserve':
                        break;
                    default:
                        throw new Error('invalid whiteSpace value');
                }
            }

            const enumeration = this.type.enumeration;
            if (util.isNotNull(enumeration)) {
                if (!enumeration.includes(value))
                    throw new Error('expected value to be one of [' + enumeration.join(', ') + ']');
            }

            const pattern = this.type.pattern;
            if (util.isNotNull(pattern)) {
                if (!pattern.test(value))
                    throw new Error('expected value to match pattern ' + pattern.toString());
            }

            const explicitTimezone = this.type.explicitTimezone;
            if (util.isNotNull(explicitTimezone)) {
                switch (explicitTimezone) {
                    case 'required':
                        if (!(value.endsWith('Z') || /[+-]\d{2}:\d{2}$/.test(value)))
                            throw new Error('expected to include timezone offset');
                        break;
                    case 'prohibited':
                        if (value.endsWith('Z') || /[+-]\d{2}:\d{2}$/.test(value))
                            throw new Error('expected to not include timezone offset');
                        break;
                    case 'optional':
                        break;
                    default:
                        throw new Error('invalid explicitTimezone value');
                }
            }

            const binary = this.type.binary;
            if (util.isNotNull(binary)) {
                value = Buffer.from(value, binary);

                const length = this.type.length;
                // FIXME length is a property of function which cannot be used
                // if (util.isNotNull(length)) {
                //     if (value.size !== length)
                //         throw new Error('expected value to have a length of ' + length);
                // }

                const minLength = this.type.minLength;
                if (util.isNotNull(minLength)) {
                    if (value.size < minLength)
                        throw new Error('expected value to have a minimum length of ' + minLength);
                }

                const maxLength = this.type.maxLength;
                if (util.isNotNull(maxLength)) {
                    if (value.size > maxLength)
                        throw new Error('expected value to have a maximum length of ' + maxLength);
                }
            } else if (this.type.numeric) {
                value = Number(value);

                const maxInclusive = this.type.maxInclusive;
                if (util.isNotNull(maxInclusive)) {
                    if (value > maxInclusive)
                        throw new Error('expected value to have a maximum of ' + maxInclusive);
                }

                const maxExclusive = this.type.maxExclusive;
                if (util.isNotNull(maxExclusive)) {
                    if (value >= maxExclusive)
                        throw new Error('expected value to be less than ' + maxExclusive);
                }

                const minInclusive = this.type.minInclusive;
                if (util.isNotNull(minInclusive)) {
                    if (value < minInclusive)
                        throw new Error('expected value to have a minimum of ' + minInclusive);
                }

                const minExclusive = this.type.minExclusive;
                if (util.isNotNull(minExclusive)) {
                    if (value <= minExclusive)
                        throw new Error('expected value to be greater than ' + minExclusive);
                }

                const totalDigits = this.type.totalDigits;
                if (util.isNotNull(totalDigits)) {
                    if (!(isNaN(value) || value === Infinity || value === -Infinity)) {
                        const
                            integerDigits = 1 + Math.floor(Math.log10(value)),
                            factor        = 10 ** (totalDigits - integerDigits);
                        value             = Math.round(factor * value) / factor;
                    }
                }

                const fractionDigits = this.type.fractionDigits;
                if (util.isNotNull(fractionDigits)) {
                    if (!(isNaN(value) || value === Infinity || value === -Infinity)) {
                        const factor = 10 ** fractionDigits;
                        value        = Math.round(factor * value) / factor;
                    }
                }
            } else {
                const length = this.type.length;
                // FIXME length is a property of function which cannot be used
                // if (util.isNotNull(length)) {
                //     if (value.length !== length)
                //         throw new Error('expected value to have a length of ' + length);
                // }

                const minLength = this.type.minLength;
                if (util.isNotNull(minLength)) {
                    if (value.length < minLength)
                        throw new Error('expected value to have a minimum length of ' + minLength);
                }

                const maxLength = this.type.maxLength;
                if (util.isNotNull(maxLength)) {
                    if (value.length > maxLength)
                        throw new Error('expected value to have a maximum length of ' + maxLength);
                }
            }
        }

        this.#value = value;
    }

    valueOf() {
        return this.#value;
    }

    toString() {
        return '' + this.#value;
    }

    toJSON() {
        const result     = super.toJSON();
        result['@value'] = this.toString();
        return result;
    }

    static get facets() {
        return [];
    }

    // static equal(left, right) {
    //     if (!(left instanceof anySimpleType)) throw new Error('expected left to be a Datatype');
    //     if (!(right instanceof anySimpleType)) throw new Error('expected right to be a Datatype');
    //     return left.type === right.type && left.value === right.value;
    // }
    //
    // static notEqual(left, right) {
    //     if (!(left instanceof anySimpleType)) throw new Error('expected left to be a Datatype');
    //     if (!(right instanceof anySimpleType)) throw new Error('expected right to be a Datatype');
    //     return left.type !== right.type || left.value !== right.value;
    // }
    //
    // static lessThan(left, right) {
    //     if (!(left instanceof anySimpleType)) throw new Error('expected left to be a Datatype');
    //     if (!(right instanceof anySimpleType)) throw new Error('expected right to be a Datatype');
    //     return left.type === right.type && left.value < right.value;
    // }
    //
    // static lessThanOrEqual(left, right) {
    //     if (!(left instanceof anySimpleType)) throw new Error('expected left to be a Datatype');
    //     if (!(right instanceof anySimpleType)) throw new Error('expected right to be a Datatype');
    //     return left.type === right.type && left.value <= right.value;
    // }
    //
    // static greaterThan(left, right) {
    //     if (!(left instanceof anySimpleType)) throw new Error('expected left to be a Datatype');
    //     if (!(right instanceof anySimpleType)) throw new Error('expected right to be a Datatype');
    //     return left.type === right.type && left.value > right.value;
    // }
    //
    // static greaterThanOrEqual(left, right) {
    //     if (!(left instanceof anySimpleType)) throw new Error('expected left to be a Datatype');
    //     if (!(right instanceof anySimpleType)) throw new Error('expected right to be a Datatype');
    //     return left.type === right.type && left.value >= right.value;
    // }

}

module.exports = anySimpleType;
