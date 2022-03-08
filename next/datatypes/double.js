const
    util   = require('../module.xsd.util.js'),
    model  = require('../module.xsd.model.js'),
    regex  = require('@nrd/fua.core.regex'),
    facets = {
        whiteSpace: model.whiteSpace('collapse'),
        pattern:    model.pattern(regex.XSD_float_pattern),
        numeric:    model.numeric(true)
    };

class double extends model.anySimpleType {

}

module.exports = double;
