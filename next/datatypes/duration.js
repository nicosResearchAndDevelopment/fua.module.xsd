const
    util    = require('../module.xsd.util.js'),
    model   = require('../module.xsd.model.js'),
    pattern = /^(-?)P(?=.)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?=.)(?:(\d+)H)?(?:(\d+)M)?(?:(\d*)(\.\d+)?S)?)?$/;

class duration extends model.anySimpleType {

    constructor(value) {
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

        if (this.type === duration) util.lockAllProp(this);
    }

}

module.exports = duration;
