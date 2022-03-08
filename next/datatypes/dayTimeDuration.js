const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class dayTimeDuration extends model.duration {

    constructor(value) {
        super(value);

        // TODO

        if (this.type === dayTimeDuration) util.lockAllProp(this);
    }

}

module.exports = dayTimeDuration;
