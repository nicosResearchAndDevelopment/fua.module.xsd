const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class gMonth extends model.anySimpleType {

    constructor(value) {
        super(value);

        // TODO

        if (this.type === gMonth) util.lockAllProp(this);
    }

}

module.exports = gMonth;
