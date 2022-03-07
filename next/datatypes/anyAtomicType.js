const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class anyAtomicType extends model.anySimpleType {

    constructor(value) {
        super(value);
        throw new Error('virtual class cannot be constructed');
    }

    static [Symbol.hasInstance](object) {
        return (object instanceof model.string)
            || (object instanceof model.boolean)
            || (object instanceof model.decimal)
            || (object instanceof model.float)
            || (object instanceof model.double)
            || (object instanceof model.duration)
            || (object instanceof model.dateTime)
            || (object instanceof model.time)
            || (object instanceof model.date)
            || (object instanceof model.gYearMonth)
            || (object instanceof model.gYear)
            || (object instanceof model.gMonthDay)
            || (object instanceof model.gDay)
            || (object instanceof model.gMonth)
            || (object instanceof model.hexBinary)
            || (object instanceof model.base64Binary)
            || (object instanceof model.anyURI)
            || (object instanceof model.QName)
            || (object instanceof model.NOTATION);
    }

}

module.exports = anyAtomicType;
