const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class anySimpleType extends model.anyType {

    #value = '';

    constructor(value) {
        if (new.target === anySimpleType) throw new Error('abstract class cannot be constructed');
        if (!util.isString(value)) throw new Error('expected value to be a string');
        super();
        this.#value = value;
    }

    get value() {
        return this.#value;
    }

    set value(value) {
        if (!util.isString(value)) throw new Error('expected value to be a string');
        this.#value = value;
    }

    valueOf() {
        return this.value;
    }

    toString() {
        return this.value;
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
