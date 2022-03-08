const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class dateTimeStamp extends model.dateTime {

    constructor(value) {
        super(value);

        // TODO

        if (this.type === dateTimeStamp) util.lockAllProp(this);
    }

}

module.exports = dateTimeStamp;
