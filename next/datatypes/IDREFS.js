const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class IDREFS extends model.IDREF {

    static id = util.xsdIRI.IDREFS;

    constructor(value) {
        super(value);

        // TODO
        // FIXME list derivation will probably throw in parent type

        if (this.type === IDREFS) Object.freeze(this);
    }

}

module.exports = IDREFS;
