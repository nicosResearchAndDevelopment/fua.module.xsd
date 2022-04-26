const
    util  = require('./module.xsd.util.js'),
    model = require('./module.xsd.model.js');

class Datatype {

    constructor() {
        if (new.target === Datatype) throw new Error('abstract class cannot be constructed');

        this.type = new.target;
        util.hideProp(this, 'type').lockProp(this, 'type');
    }

    toJSON() {
        return {};
    }

}

module.exports = Datatype;
