const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class normalizedString extends model.string {

    static id = util.xsdIRI.normalizedString;

    constructor(value) {
        super(value);

        this.value = util.replaceWhiteSpace(this.value);

        if (this.type === normalizedString) Object.freeze(this);
    }

}

module.exports = normalizedString;
