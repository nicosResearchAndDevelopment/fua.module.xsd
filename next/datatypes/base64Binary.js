const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class base64Binary extends model.anySimpleType {

    constructor(value) {
        if (util.isBuffer(value))
            value = value.toString('base64');

        super(value);

        this.value  = util.collapseWhiteSpace(this.value);
        this.buffer = Buffer.from(this.value, 'base64');
        this.value  = this.buffer.toString('base64');

        if (this.type === base64Binary) Object.freeze(this);
    }

}

module.exports = base64Binary;
