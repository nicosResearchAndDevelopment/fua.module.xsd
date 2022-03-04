const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class boolean extends model.anySimpleType {

    get value() {
        return super.value;
    }

    set value(value) {
        switch (value) {
            case true:
            case 'true':
            case '1':
                super.value = true;
                break;
            case false:
            case 'false':
            case '0':
                super.value = false;
                break;
            default:
                throw new Error('expected value to be a boolean or a boolean string');
        }
    }

    toString() {
        return super.value.toString();
    }

}

module.exports = boolean;
