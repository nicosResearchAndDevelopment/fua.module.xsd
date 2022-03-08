const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class NOTATION extends model.anySimpleType {

    constructor(value) {
        super(value);

        // TODO

        if (this.type === NOTATION) util.lockAllProp(this);
    }

}

module.exports = NOTATION;
