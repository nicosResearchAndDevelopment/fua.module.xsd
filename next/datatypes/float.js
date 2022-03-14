const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class float extends model.double {

    constructor(value) {
        super(value);

        // NOTE derivation from double is not intended in the model but practical for this implementation
        this.numericValue = Math.fround(this.numericValue);

        // FIXME lexical value and numeric value differentiation (infinity problem, precision problem)

        if (this.type === float) Object.freeze(this);
    }

}

module.exports = float;
