const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class string extends model.anySimpleType {

    set value(value) {
        if (!util.isString(value)) throw new Error('expected value to be a string');
        switch (this.type.whiteSpace) {
            case 'replace':
                value = value.replace(/\s/g, ' ');
                break;
            case 'collapse':
                value = value.replace(/\s+/g, ' ').trim();
                break;
            case 'preserve':
            default:
        }
        super.value = value;
    }

}

module.exports = string;
