const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class hexBinary extends model.anySimpleType {

    static id = util.xsdIRI.hexBinary;

    constructor(value) {
        if (util.isBuffer(value))
            value = value.toString('hex');

        super(value);

        this.value  = util.collapseWhiteSpace(this.value);
        this.buffer = Buffer.from(this.value, 'hex');
        this.value  = this.buffer.toString('hex');

        if (this.type === hexBinary) Object.freeze(this);
    }

}

module.exports = hexBinary;
