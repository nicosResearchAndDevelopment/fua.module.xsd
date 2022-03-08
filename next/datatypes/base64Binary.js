const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class base64Binary extends model.anySimpleType {

    constructor(value) {
        super(value);

        this.value  = util.collapseWhiteSpace(this.value);
        this.buffer = Buffer.from(this.value, 'base64');
        this.value  = this.buffer.toString('base64');

        if (this.type === base64Binary) util.lockAllProp(this);
    }

    toString() {
        return this.buffer.toString('base64');
    }

}

module.exports = base64Binary;
