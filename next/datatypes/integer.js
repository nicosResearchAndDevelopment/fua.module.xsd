const
    util   = require('../module.xsd.util.js'),
    model  = require('../module.xsd.model.js'),
    regex  = require('@nrd/fua.core.regex'),
    facets = {
        whiteSpace: model.whiteSpace('collapse'),
        pattern:    model.pattern(regex.XSD_integer_pattern),
        numeric:    model.numeric(true)
    };

class integer extends model.decimal {

    static get pattern() {
        return regex.XSD_integer_pattern;
    }

    static get fractionDigits() {
        return 0;
    }

}

module.exports = integer;
