const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class anyAtomicType extends model.anySimpleType {

    constructor(value) {
        if (new.target === anyAtomicType) throw new Error('abstract class cannot be constructed');
        super(value);
    }

}

module.exports = anyAtomicType;
