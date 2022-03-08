const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class gYearMonth extends model.anySimpleType {

    constructor(value) {
        super(value);

        // TODO

        if (this.type === gYearMonth) util.lockAllProp(this);
    }

}

module.exports = gYearMonth;
