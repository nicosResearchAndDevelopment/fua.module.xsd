const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class dateTime extends model.anySimpleType {

    constructor(value) {
        super(value);

        // TODO

        if (this.type === dateTime) util.lockAllProp(this);
    }

}

module.exports = dateTime;
