const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class QName extends model.anySimpleType {

    static id = util.xsdIRI.QName;

    constructor(value) {
        super(value);

        this.value = util.collapseWhiteSpace(this.value);
        // TODO

        if (this.type === QName) Object.freeze(this);
    }

}

module.exports = QName;
