const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js'),
    facets = {
        whiteSpace: model.whiteSpace('collapse')
    };

class token extends model.normalizedString {

    // get value() {
    //     return super.value;
    // }
    //
    // set value(value) {
    //     if (!util.isString(value)) throw new Error('expected value to be a string');
    //     super.value = value.replace(/\s+/g, ' ');
    // }

    // static get whiteSpace() {
    //     return 'collapse';
    // }

    // static get facets() {
    //     const facets = model.string.facets();
    //     facets.push(model.whiteSpace('collapse'));
    //     return facets;
    // }

}

module.exports = token;
