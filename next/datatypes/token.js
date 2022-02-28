const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class token extends model.normalizedString {

    set value(value) {
        if (!util.isString(value)) throw new Error('expected value to be a string');
        super.value = value.replace(/\s+/g, ' ').trim();
    }

}

module.exports = token;
