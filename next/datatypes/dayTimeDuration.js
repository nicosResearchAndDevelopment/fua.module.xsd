const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class dayTimeDuration extends model.duration {

    constructor(value) {
        super(value);

        if (this.years || this.months)
            throw new Error('expected to match dayTimeDuration pattern');
        delete this.years;
        delete this.months;

        if (this.type === dayTimeDuration) util.lockAllProp(this);
    }

}

module.exports = dayTimeDuration;
