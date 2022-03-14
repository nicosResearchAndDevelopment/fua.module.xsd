const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class anySimpleType extends model.anyType {

    constructor(value) {
        if (new.target === anySimpleType) throw new Error('abstract class cannot be constructed');
        super();

        if (!util.isString(value)) throw new Error('expected value to be a string');
        this.value = value;

        // if (this.type === anySimpleType) Object.freeze(this);
    }

    valueOf() {
        return this.toString();
    }

    toString() {
        return '' + this.value;
    }

    toJSON() {
        const result     = super.toJSON();
        result['@value'] = this.toString();
        return result;
    }

}

module.exports = anySimpleType;
