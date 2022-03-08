const
    util    = require('../module.xsd.util.js'),
    model   = require('../module.xsd.model.js'),
    pattern = /^[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*$/;

class language extends model.token {

    constructor(value) {
        super(value);

        if (!pattern.test(this.value)) throw new Error('expected to match language pattern');

        if (this.type === language) util.lockAllProp(this);
    }

}

module.exports = language;
