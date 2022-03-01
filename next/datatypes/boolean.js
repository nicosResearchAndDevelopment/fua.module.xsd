const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class boolean extends model.anySimpleType {

    get value() {
        return super.value;
    }

    set value(value) {
        if (util.isString(value)) {
            super.value = Buffer.from(value, 'base64');
        } else if (util.isBoolean(value)) {
            super.value = value;
        } else {
            throw new Error('expected value to be a string or a boolean');
        }
    }

    toString() {
        return super.value.toString('base64');
    }

}

module.exports = boolean;
