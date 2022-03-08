const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class gMonthDay extends model.anySimpleType {

    constructor(value) {
        super(value);

        // TODO

        if (this.type === gMonthDay) util.lockAllProp(this);
    }

}

module.exports = gMonthDay;
