const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class hexBinary extends model.anySimpleType {

    constructor(value) {
        super(value);

        this.buffer = Buffer.from(this.value, 'hex');
        this.value  = this.buffer.toString('hex');

        if (this.type === hexBinary) util.lockAllProp(this);
    }

    toString() {
        return this.buffer.toString('hex');
    }

}

module.exports = hexBinary;
