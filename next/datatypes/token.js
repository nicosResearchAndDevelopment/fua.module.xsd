const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class token extends model.normalizedString {

    static get whiteSpace() {
        return 'collapse';
    }

    // static get facets() {
    //     const facets = model.string.facets();
    //     facets.push(model.whiteSpace('collapse'));
    //     return facets;
    // }

}

module.exports = token;
