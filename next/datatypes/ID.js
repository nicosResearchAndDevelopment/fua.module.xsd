const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class ID extends model.NCName {

    constructor(value) {
        super(value);

        // TODO

        if (this.type === ID) Object.freeze(this);
    }

}

module.exports = ID;
