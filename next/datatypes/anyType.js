const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class anyType {

    constructor() {
        if (new.target === anyType) throw new Error('abstract class cannot be constructed');

        this.type = new.target;
        util.hideProp(this, 'type').lockProp(this, 'type');
    }

    toJSON() {
        return {'@type': this.type.id};
    }

    static get id() {
        return util.xsdIRI(this.name);
    }

}

module.exports = anyType;
