const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class positiveInteger extends model.nonNegativeInteger {

    constructor(value) {
        super(value);

        if (this.integer === '0') throw new Error('expected to be a positive integer');

        if (this.type === positiveInteger) Object.freeze(this);
    }

}

module.exports = positiveInteger;
