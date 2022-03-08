const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class normalizedString extends model.string {

    constructor(value) {
        super(value);

        this.value = this.value.replace(/[\t\r\n]/g, ' ');

        if (this.type === normalizedString) util.lockAllProp(this);
    }

}

module.exports = normalizedString;
