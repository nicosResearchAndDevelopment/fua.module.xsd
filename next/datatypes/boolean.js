const
    util   = require('../module.xsd.util.js'),
    model  = require('../module.xsd.model.js'),
    truthy = ['true', '1'],
    falsy  = ['false', '0'];

class boolean extends model.anySimpleType {

    constructor(value) {
        super(value);

        if (truthy.includes[this.value]) {
            this.bool  = true;
            this.value = truthy[0];
        } else if (falsy.includes[this.value]) {
            this.bool  = false;
            this.value = falsy[0];
        } else {
            throw new Error('expected to match boolean pattern');
        }

        if (this.type === boolean) util.lockAllProp(this);
    }

}

module.exports = boolean;
