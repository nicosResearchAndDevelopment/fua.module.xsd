const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class IDREFS extends model.IDREF {

    constructor(value) {
        super(value);

        // TODO
        // FIXME list derivation will probably throw in parent type

        if (this.type === IDREFS) util.lockAllProp(this);
    }

}

module.exports = IDREFS;
