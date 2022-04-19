// XML Schema Definition Language (XSD) 1.1
// Part 1 - Structures: https://www.w3.org/TR/xmlschema11-1/
// Part 2 - Datatypes: https://www.w3.org/TR/xmlschema11-2/

const
    util  = require('./module.xsd.util.js'),
    model = require('./module.xsd.model.js'),
    types = Object.fromEntries(Object.entries(model)
        .map(([key, value]) => [[util.xsdIRI(key), value], [util.xsdURI(key), value]]).flat(1));

exports.from = function (param) {
    if (param instanceof model.anyType)
        return param;
    let type, value;
    if (util.isObject(param)) {
        if (util.isObject(param.datatype)) {
            value = param.value;
            type  = param.datatype.value;
        } else {
            value = param['@value'];
            type  = param['@type'];
        }
    } else if (util.isAnyNumber(param)) {
        if (util.isInteger(param)) {
            value = param;
            type  = util.xsdIRI.integer;
        } else {
            value = param;
            type  = util.xsdIRI.double;
        }
    } else if (util.isString(param)) {
        value = param;
        type  = util.xsdIRI.string;
    } else if (util.isBoolean(param)) {
        value = param;
        type  = util.xsdIRI.boolean;
    }
    util.assert(util.isString(type), 'expected type to be a string');
    util.assert(type in types, 'unknown type ' + type);
    return new types[type](value);
};

// TODO
