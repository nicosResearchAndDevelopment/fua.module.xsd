const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class ENTITIES extends model.ENTITY {

    constructor(value) {
        super(value);

        // TODO
        // FIXME list derivation will probably throw in parent type

        if (this.type === ENTITIES) util.lockAllProp(this);
    }

}

module.exports = ENTITIES;
