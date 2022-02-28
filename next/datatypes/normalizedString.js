const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class normalizedString extends model.string {

    set value(value) {
        if (!util.isString(value)) throw new Error('expected value to be a string');
        super.value = value.replace(/\s/g, ' ');
    }

}

module.exports = normalizedString;
