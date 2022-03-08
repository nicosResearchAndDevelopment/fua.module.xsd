const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class token extends model.normalizedString {

    constructor(value) {
        super(value);

        this.value = this.value.replace(/ +/g, ' ').trim();

        if (this.type === token) util.lockAllProp(this);
    }

}

module.exports = token;
