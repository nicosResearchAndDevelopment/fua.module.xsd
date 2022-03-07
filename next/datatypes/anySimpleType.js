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

    set value(value) {
        if (!util.isString(value)) throw new Error('expected value to be a string');

        const list = this.type.list;
        if (list) {
            value = value.replace(/\s+/g, ' ').trim().split(' ').map(elem => list.from(elem));

            const length = this.type.length;
            if (length && value.length !== length)
                throw new Error('expected value to have a length of ' + length);

            const minLength = this.type.length;
            if (minLength && value.length < minLength)
                throw new Error('expected value to have a minimum length of ' + minLength);

            const maxLength = this.type.length;
            if (maxLength && value.length > maxLength)
                throw new Error('expected value to have a maximum length of ' + maxLength);
        } else {
            const whiteSpace = this.type.whiteSpace;
            if (whiteSpace === 'replace')
                value = value.replace(/\s/g, ' ');
            else if (whiteSpace === 'collapse')
                value = value.replace(/\s+/g, ' ').trim();
            // else if (whiteSpace !== 'preserve')
            //     throw new Error('invalid whiteSpace value');

            const enumeration = this.type.enumeration;
            if (enumeration && !enumeration.includes(value))
                throw new Error('expected value to be one of [' + enumeration.join(', ') + ']');

            const pattern = this.type.pattern;
            if (pattern && !pattern.test(value))
                throw new Error('expected value to match pattern ' + pattern.toString());

            const explicitTimezone = this.type.explicitTimezone;
            if (explicitTimezone === 'required' && !(value.endsWith('Z') || /[+-]\d{2}:\d{2}$/.test(value)))
                throw new Error('expected to include timezone offset');
            else if (explicitTimezone === 'prohibited' && (value.endsWith('Z') || /[+-]\d{2}:\d{2}$/.test(value)))
                throw new Error('expected to not include timezone offset');
            // else if (explicitTimezone !== 'optional')
            //     throw new Error('invalid explicitTimezone value');

            if (this.type === model.hexBinary) value = Buffer.from(value, 'hex');
            if (this.type === model.base64Binary) value = Buffer.from(value, 'base64');

            if (util.isBuffer(value)) {
                const length = this.type.length;
                if (length && value.size !== length)
                    throw new Error('expected value to have a length of ' + length);

                const minLength = this.type.length;
                if (minLength && value.size < minLength)
                    throw new Error('expected value to have a minimum length of ' + minLength);

                const maxLength = this.type.length;
                if (maxLength && value.size > maxLength)
                    throw new Error('expected value to have a maximum length of ' + maxLength);
            } else if (this.type.numeric) {
                value = Number(value);

                const maxInclusive = this.type.maxInclusive;
                // TODO

                const maxExclusive = this.type.maxExclusive;
                // TODO

                const minInclusive = this.type.minInclusive;
                // TODO

                const minExclusive = this.type.minExclusive;
                // TODO

                const totalDigits = this.type.totalDigits;
                // TODO

                const fractionDigits = this.type.fractionDigits;
                // TODO
            } else {
                const length = this.type.length;
                if (length && value.length !== length)
                    throw new Error('expected value to have a length of ' + length);

                const minLength = this.type.length;
                if (minLength && value.length < minLength)
                    throw new Error('expected value to have a minimum length of ' + minLength);

                const maxLength = this.type.length;
                if (maxLength && value.length > maxLength)
                    throw new Error('expected value to have a maximum length of ' + maxLength);
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
