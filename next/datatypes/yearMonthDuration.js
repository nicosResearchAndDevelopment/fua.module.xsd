const
    util  = require('../module.xsd.util.js'),
    model = require('../module.xsd.model.js');

class yearMonthDuration extends model.duration {

    static id = util.xsdIRI.yearMonthDuration;

    constructor(value) {
        super(value);

        if (this.days || this.hours || this.minutes || this.seconds || this.milliseconds)
            throw new Error('expected to match yearMonthDuration pattern');
        delete this.days;
        delete this.hours;
        delete this.minutes;
        delete this.seconds;
        delete this.milliseconds;

        if (this.type === yearMonthDuration) Object.freeze(this);
    }

}

module.exports = yearMonthDuration;
