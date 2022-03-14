const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class dateTimeStamp extends model.dateTime {

    constructor(value) {
        super(value);

        if (!(this.utc && this.offset === null)) throw new Error('expected to match dateTimeStamp pattern');
        delete this.offset;

        if (this.type === dateTimeStamp) Object.freeze(this);
    }

}

module.exports = dateTimeStamp;
