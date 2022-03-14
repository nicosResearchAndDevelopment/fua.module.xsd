const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class NMTOKEN extends model.token {

    constructor(value) {
        super(value);

        // TODO

        if (this.type === NMTOKEN) Object.freeze(this);
    }

}

module.exports = NMTOKEN;
