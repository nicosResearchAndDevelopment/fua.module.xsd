const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class time extends model.anySimpleType {

    constructor(value) {
        super(value);

        // TODO

        if (this.type === time) util.lockAllProp(this);
    }

}

module.exports = time;
