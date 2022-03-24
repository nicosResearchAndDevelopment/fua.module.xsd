const
    util    = require('../module.xsd.util.js'),
    model   = require('../module.xsd.model.js'),
    {URL}   = require('url'),
    pattern = /^[^ <>"]*$/; // TODO improve pattern

class anyURI extends model.anySimpleType {

    static id = util.xsdIRI.anyURI;

    constructor(value) {
        if (value instanceof URL)
            value = value.toString();

        super(value);

        this.value = util.collapseWhiteSpace(this.value);
        if (!pattern.test(this.value)) throw new Error('expected to match anyURI pattern');

        if (this.type === anyURI) Object.freeze(this);
    }

}

module.exports = anyURI;
