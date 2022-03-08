const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class anyURI extends model.anySimpleType {

    constructor(value) {
        super(value);

        this.value = util.collapseWhiteSpace(this.value);
        // TODO

        if (this.type === anyURI) util.lockAllProp(this);
    }

}

module.exports = anyURI;
