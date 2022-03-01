const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class hexBinary extends model.anySimpleType {

    get value() {
        return super.value;
    }

    set value(value) {
        if (util.isString(value)) {
            super.value = Buffer.from(value, 'hex');
        } else if (util.isBuffer(value)) {
            super.value = value;
        } else {
            throw new Error('expected value to be a string or a Buffer');
        }
    }

    toString() {
        return super.value.toString('hex');
    }

}

module.exports = hexBinary;
