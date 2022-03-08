const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class QName extends model.anySimpleType {

    constructor(value) {
        super(value);

        // TODO

        if (this.type === QName) util.lockAllProp(this);
    }

}

module.exports = QName;
