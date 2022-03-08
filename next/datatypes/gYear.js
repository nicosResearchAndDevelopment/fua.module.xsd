const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class gYear extends model.anySimpleType {

    constructor(value) {
        super(value);

        // TODO

        if (this.type === gYear) util.lockAllProp(this);
    }

}

module.exports = gYear;
