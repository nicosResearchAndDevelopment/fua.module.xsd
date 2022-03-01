const
    util   = require('../module.xsd.util.js'),
    model  = require('../module.xsd.model.js'),
    facets = [model.whiteSpace('replace')];

class normalizedString extends model.string {

    get value() {
        return super.value;
    }

    // set value(value) {
    //     // if (!util.isString(value)) throw new Error('expected value to be a string');
    //     super.value = facets.reduce((result, facet) => facet(result), value);
    //     // super.value = value.replace(/\s/g, ' ');
    // }

    set value(value) {
        const prev = super.value;
        try {
            super.value = value;
            super.value = super.value.replace(/\s/g, ' ');
        } catch (err) {
            super.value = prev;
            throw err;
        }
    }

}

module.exports = normalizedString;
