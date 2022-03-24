const
    util    = require('../module.xsd.util.js'),
    model   = require('../module.xsd.model.js'),
    pattern = /^(-?)P(?=.)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?=.)(?:(\d+)H)?(?:(\d+)M)?(?:(\d*)(\.\d+)?S)?)?$/;

class duration extends model.anySimpleType {

    static id = util.xsdIRI.duration;

    constructor(value) {
        if (util.isFiniteNumber(value))
            value = (value < 0 ? '-' : '') + 'PT' + Math.abs(value) + 'S';

        super(value);

        this.value                                             = util.collapseWhiteSpace(this.value);
        const [match, sign, YYYY, MM, DD, hh, mm, ss, ss_frac] = pattern.exec(this.value) || [];
        if (!match) throw new Error('expected to match duration pattern');

        this.sign         = sign || '+';
        this.years        = parseInt(YYYY);
        this.months       = parseInt(MM);
        this.days         = parseInt(DD);
        this.hours        = parseInt(hh);
        this.minutes      = parseInt(mm);
        this.seconds      = parseInt(ss);
        this.milliseconds = ss_frac ? parseFloat(ss_frac.substr(1, 3).padEnd(3, '0') + '.' + ss_frac.substr(4)) : 0;

        if (this.type === duration) Object.freeze(this);
    }

}

module.exports = duration;
