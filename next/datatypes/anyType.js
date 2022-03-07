const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class anyType {

    #datatype = null;
    #locked   = false;

    constructor() {
        if (new.target === anyType) throw new Error('abstract class cannot be constructed');
        this.#datatype = new.target;
    }

    get type() {
        return this.#datatype;
    }

    get locked() {
        return this.#locked;
    }

    lock() {
        this.#locked = true;
        return this;
    }

    toJSON() {
        return {'@type': this.#datatype.id};
    }

    static get id() {
        return util.xsdIRI(this.name);
    }

    static from(value) {
        if (value instanceof this) return this;
        if (value instanceof anyType)
            throw new Error(`expected ${this.id} but got ${value.type.id}`);
        if (util.isObject(value) && util.isString(value['@value']))
            return new this(value['@value']);
        return new this(value);
    }

}

module.exports = anyType;
