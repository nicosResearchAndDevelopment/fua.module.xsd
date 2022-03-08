const
    util    = require('../module.xsd.util.js'),
    model   = require('../module.xsd.model.js'),
    pattern = /^[^ <>"]*$/; // TODO improve pattern

class anyURI extends model.anySimpleType {

    constructor(value) {
        super(value);

        this.value = util.collapseWhiteSpace(this.value);
        if (!pattern.test(this.value)) throw new Error('expected to match anyURI pattern');

        if (this.type === anyURI) util.lockAllProp(this);
    }

}

module.exports = anyURI;
