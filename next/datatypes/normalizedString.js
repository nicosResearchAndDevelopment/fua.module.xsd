const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class normalizedString extends model.string {

    static get whiteSpace() {
        return 'replace';
    }

    // static get facets() {
    //     const facets = model.string.facets();
    //     facets.push(model.whiteSpace('replace'));
    //     return facets;
    // }

}

module.exports = normalizedString;
