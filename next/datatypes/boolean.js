const
    util   = require('../module.xsd.util.js'),
    model  = require('../module.xsd.model.js'),
    truthy = ['true', '1'],
    falsy  = ['false', '0'];

class boolean extends model.anySimpleType {

    constructor(value) {
        if (util.isBoolean(value) || value === 0 || value === 1)
            value = value ? truthy[0] : falsy[0];

        super(value);

        this.value = util.collapseWhiteSpace(this.value);
        if (truthy.includes(this.value)) {
            this.boolValue = true;
            this.value     = truthy[0];
        } else if (falsy.includes(this.value)) {
            this.boolValue = false;
            this.value     = falsy[0];
        } else {
            throw new Error('expected to match boolean pattern');
        }

        if (this.type === boolean) Object.freeze(this);
    }

    valueOf() {
        return this.boolValue;
    }

}

module.exports = boolean;
