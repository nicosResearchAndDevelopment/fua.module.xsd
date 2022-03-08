const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class IDREF extends model.NCName {

    constructor(value) {
        super(value);

        // TODO

        if (this.type === IDREF) util.lockAllProp(this);
    }

}

module.exports = IDREF;
