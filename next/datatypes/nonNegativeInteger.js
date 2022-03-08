const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class nonNegativeInteger extends model.integer {

    constructor(value) {
        super(value);

        if (this.integer === '0') this.sign = '+';
        else if (this.sign === '-') throw new Error('expected to be a non negative integer');

        if (this.type === nonNegativeInteger) util.lockAllProp(this);
    }

}

module.exports = nonNegativeInteger;
