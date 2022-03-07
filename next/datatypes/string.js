const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class string extends model.anySimpleType {

    static get facets() {
        const facets = model.anySimpleType.facets();
        facets.push(model.whiteSpace('preserve'));
    }

}

module.exports = string;
