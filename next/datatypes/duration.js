const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class duration extends model.anySimpleType {

    constructor(value) {
        super(value);

        // TODO

        if (this.type === duration) util.lockAllProp(this);
    }

}

module.exports = duration;
