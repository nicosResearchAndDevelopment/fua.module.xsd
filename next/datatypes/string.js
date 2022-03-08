const
    util        = require('../module.xsd.util.js'),
    model       = require('../module.xsd.model.js'),
    facets = {
        whiteSpace: model.whiteSpace('preserve')
    };

class string extends model.anySimpleType {

    // get value() {
    //     return super.value;
    // }
    //
    // set value(value) {
    //     if (!util.isString(value)) throw new Error('expected value to be a string');
    //     super.value = value;
    // }

    // static get whiteSpace() {
    //     return 'preserve';
    // }

    // static get facets() {
    //     const facets = model.anySimpleType.facets();
    //     facets.push(model.whiteSpace('preserve'));
    //     return facets;
    // }

}

module.exports = string;
