const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class date extends model.anySimpleType {

    constructor(value) {
        super(value);

        // TODO

        if (this.type === date) util.lockAllProp(this);
    }

}

module.exports = date;
