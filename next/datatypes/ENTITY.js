const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class ENTITY extends model.NCName {

    static id = util.xsdIRI.ENTITY;

    constructor(value) {
        super(value);

        // TODO

        if (this.type === ENTITY) Object.freeze(this);
    }

}

module.exports = ENTITY;
