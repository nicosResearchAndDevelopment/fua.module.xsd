const
    util    = require('../module.xsd.util.js'),
    model   = require('../module.xsd.model.js'),
    pattern = /^(-?)P(?=.)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?=.)(?:(\d+)H)?(?:(\d+)M)?(?:(\d*(?:\.\d+)?)S)?)?$/;

class duration extends model.anySimpleType {

    constructor(value) {
        super(value);

        this.value                                       = util.collapseWhiteSpace(this.value);
        const [match, sign, YYYY, MM, DD, hh, mm, ss_ms] = pattern.exec(this.value) || [];
        if (!match) throw new Error('expected to match duration pattern');

        this.sign         = sign || '+';
        this.years        = parseInt(YYYY);
        this.months       = parseInt(MM);
        this.days         = parseInt(DD);
        this.hours        = parseInt(hh);
        this.minutes      = parseInt(mm);
        this.seconds      = parseInt(ss_ms);
        this.milliseconds = Math.round(1000 * (parseFloat(ss_ms) - this.second));

        if (this.type === duration) util.lockAllProp(this);
    }

}

module.exports = duration;
