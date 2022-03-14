const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class ENTITY extends model.NCName {

    constructor(value) {
        super(value);

        // TODO

        if (this.type === ENTITY) Object.freeze(this);
    }

}

module.exports = ENTITY;
