const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class anyType {

    static get id() {
        return util.xsdIRI(this.name);
    }

    #datatype = null;
    #value    = null;

    constructor(value) {
        if (new.target === anyType) throw new Error('abstract class cannot be constructed');
        this.#datatype = new.target;
        this.value     = value;
    }

    get type() {
        return this.#datatype;
    }

    get value() {
        return this.#value;
    }

    set value(value) {
        this.#value = value;
    }

    toJSON() {
        return {'@type': this.#datatype.id};
    }

}

module.exports = anyType;
