const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class integer extends model.decimal {

    constructor(value) {
        super(value);

        if (this.fraction !== '0') throw new Error('expected to be an integer');
        delete this.fraction;

        if (this.type === integer) Object.freeze(this);
    }

}

module.exports = integer;
