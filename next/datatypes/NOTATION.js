const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class NOTATION extends model.anySimpleType {

    static id = util.xsdIRI.NOTATION;

    constructor(value) {
        super(value);

        this.value = util.collapseWhiteSpace(this.value);
        // TODO

        if (this.type === NOTATION) Object.freeze(this);
    }

}

module.exports = NOTATION;
