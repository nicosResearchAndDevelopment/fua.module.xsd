const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class token extends model.normalizedString {

    static id = util.xsdIRI.token;

    constructor(value) {
        super(value);

        this.value = util.collapseWhiteSpace(this.value);

        if (this.type === token) Object.freeze(this);
    }

}

module.exports = token;
