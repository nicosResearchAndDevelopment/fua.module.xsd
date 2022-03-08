const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class NCName extends model.Name {

    constructor(value) {
        super(value);

        // TODO

        if (this.type === NCName) util.lockAllProp(this);
    }

}

module.exports = NCName;
