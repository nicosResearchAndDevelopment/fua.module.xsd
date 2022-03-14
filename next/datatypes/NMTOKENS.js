const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class NMTOKENS extends model.NMTOKEN {

    constructor(value) {
        super(value);

        // TODO
        // FIXME list derivation will probably throw in parent type

        if (this.type === NMTOKENS) Object.freeze(this);
    }

}

module.exports = NMTOKENS;
