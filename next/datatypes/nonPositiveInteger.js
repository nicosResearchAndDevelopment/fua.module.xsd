const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class nonPositiveInteger extends model.integer {

    static id = util.xsdIRI.nonPositiveInteger;

    constructor(value) {
        super(value);

        if (this.integer === '0') this.sign = '-';
        else if (this.sign === '+') throw new Error('expected to be a non positive integer');

        if (this.type === nonPositiveInteger) Object.freeze(this);
    }

}

module.exports = nonPositiveInteger;
