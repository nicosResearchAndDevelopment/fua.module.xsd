const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class IDREF extends model.NCName {

    static id = util.xsdIRI.IDREF;

    constructor(value) {
        super(value);

        // TODO

        if (this.type === IDREF) Object.freeze(this);
    }

}

module.exports = IDREF;
