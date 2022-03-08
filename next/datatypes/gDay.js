const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class gDay extends model.anySimpleType {

    constructor(value) {
        super(value);

        // TODO

        if (this.type === gDay) util.lockAllProp(this);
    }

}

module.exports = gDay;
