const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class float extends model.double {

    constructor(value) {
        super(value);

        // NOTE derivation from double is not intended in the model but practical for this implementation

        if (this.type === float) util.lockAllProp(this);
    }

    valueOf() {
        return Math.fround(super.valueOf());
    }

}

module.exports = float;
