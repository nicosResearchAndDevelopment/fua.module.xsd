const
    util   = require('../module.xsd.util.js'),
    model  = require('../module.xsd.model.js'),
    facets = [model.whiteSpace('preserve')];

class string extends model.anySimpleType {

    get value() {
        return super.value;
    }

    set value(value) {
        // if (!util.isString(value)) throw new Error('expected value to be a string');
        super.value = facets.reduce((result, facet) => facet(result), value);
        // switch (this.type.whiteSpace) {
        //     case 'replace':
        //         value = value.replace(/\s/g, ' ');
        //         break;
        //     case 'collapse':
        //         value = value.replace(/\s+/g, ' ').trim();
        //         break;
        //     case 'preserve':
        //     default:
        // }
        // super.value = value;
    }

    // set value(value) {
    //     if (!util.isString(value)) throw new Error('expected value to be a string');
    //     super.value = value;
    // }

}

module.exports = string;
