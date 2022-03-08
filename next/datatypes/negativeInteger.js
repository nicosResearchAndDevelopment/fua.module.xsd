const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class negativeInteger extends model.nonPositiveInteger {

    constructor(value) {
        super(value);

        if (this.integer === '0') throw new Error('expected to be a negative integer');

        if (this.type === negativeInteger) util.lockAllProp(this);
    }

}

module.exports = negativeInteger;
