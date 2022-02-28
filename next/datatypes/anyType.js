const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class anyType {

    static get id() {
        return this.name;
    }

    static from(param) {
        if (param instanceof this) return param;
        if (param instanceof anyType)
            throw new Error('expected param to be an instance of ' + this.id + ', but got instance of ' + param.type);
        if (this !== anyType) return new this(param);
        if (!util.isObject(param) || !util.isString(param['@type']))
            throw new Error('expected param @type to be a string');
        switch (util.isObject(param) && param['@type'] || '') {
            case util.xsdIRI.string:
            case util.xsdURI.string:
                return new model.string(param);
            // boolean
            // decimal
            // float
            // double
            // duration
            // dateTime
            // time
            // date
            // gYearMonth
            // gYear
            // gMonthDay
            // gDay
            // gMonth
            // hexBinary
            // base64Binary
            // anyURI
            // QName
            // NOTATION
            // normalizedString
            // token
            // language
            // NMTOKEN
            // NMTOKENS
            // Name
            // NCName
            // ID
            // IDREF
            // IDREFS
            // ENTITY
            // ENTITIES
            // integer
            // nonPositiveInteger
            // negativeInteger
            // long
            // int
            // short
            // byte
            // nonNegativeInteger
            // unsignedLong
            // unsignedInt
            // unsignedShort
            // unsignedByte
            // positiveInteger
            // yearMonthDuration
            // dayTimeDuration
            // dateTimeStamp
            default:
                return new anyType(param);
        }
    }

    #datatype = null;
    #value    = null;

    constructor(value) {
        if (new.target === anyType) throw new Error('abstract class cannot be constructed');
        this.#datatype = new.target;
        this.value     = value;
    }

    get type() {
        return this.#datatype;
    }

    get value() {
        return this.#value;
    }

    set value(value) {
        this.#value = value;
    }

    toJSON() {
        return {'@type': util.xsdIRI(this.#datatype.id)};
    }

}

module.exports = anyType;
