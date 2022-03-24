const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class Name extends model.token {

    static id = util.xsdIRI.Name;

    constructor(value) {
        super(value);

        // TODO

        if (this.type === Name) Object.freeze(this);
    }

}

module.exports = Name;
