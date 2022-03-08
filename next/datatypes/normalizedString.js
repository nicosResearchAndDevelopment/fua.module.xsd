const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js'),
    facets = {
        whiteSpace: model.whiteSpace('replace')
    };

class normalizedString extends model.string {

    // get value() {
    //     return super.value;
    // }
    //
    // set value(value) {
    //     if (!util.isString(value)) throw new Error('expected value to be a string');
    //     super.value = value.replace(/[\t\r\n]/g, ' ');
    // }

    // static get whiteSpace() {
    //     return 'replace';
    // }

    // static get facets() {
    //     const facets = model.string.facets();
    //     facets.push(model.whiteSpace('replace'));
    //     return facets;
    // }

}

module.exports = normalizedString;
