const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class string extends model.anySimpleType {

    static id = util.xsdIRI.string;

    constructor(value) {
        if (!util.isString(value) && util.isFunction(value?.toString))
            value = value.toString();

        super(value);

        if (this.type === string) Object.freeze(this);
    }

}

module.exports = string;
