const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class language extends model.token {

    constructor(value) {
        super(value);

        // TODO

        if (this.type === language) util.lockAllProp(this);
    }

}

module.exports = language;
