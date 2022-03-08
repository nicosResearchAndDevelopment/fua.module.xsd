const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class yearMonthDuration extends model.duration {

    constructor(value) {
        super(value);

        // TODO

        if (this.type === yearMonthDuration) util.lockAllProp(this);
    }

}

module.exports = yearMonthDuration;
