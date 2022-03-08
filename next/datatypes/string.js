const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class string extends model.anySimpleType {

    constructor(value) {
        super(value);

        if (this.type === string) util.lockAllProp(this);
    }

}

module.exports = string;
