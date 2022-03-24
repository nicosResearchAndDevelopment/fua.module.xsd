const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class anyType {

    static id = util.xsdIRI.anyType;

    constructor() {
        if (new.target === anyType) throw new Error('abstract class cannot be constructed');

        this.type = new.target;
        util.hideProp(this, 'type').lockProp(this, 'type');
    }

    toJSON() {
        return {'@type': this.type.id};
    }

}

module.exports = anyType;
