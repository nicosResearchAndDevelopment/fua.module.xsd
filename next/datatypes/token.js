const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class token extends model.normalizedString {

    constructor(value) {
        super(value);

        this.value = util.collapseWhiteSpace(this.value);

        if (this.type === token) util.lockAllProp(this);
    }

}

module.exports = token;
