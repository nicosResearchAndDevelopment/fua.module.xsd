const
    util    = require('../module.xsd.util.js'),
    model   = require('../module.xsd.model.js'),
    pattern = /^(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9](?:\.[0-9]+)?)(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;

class time extends model.anySimpleType {

    constructor(value) {
        super(value);

        this.value                                                   = util.collapseWhiteSpace(this.value);
        const [match, hh, mm, ss_ms, tz_sign, tz_hh, tz_mm, utc_tag] = pattern.exec(this.value) || [];
        if (!match) throw new Error('expected to match dateTime pattern');

        this.hour        = parseInt(hh);
        this.minute      = parseInt(mm);
        this.second      = parseInt(ss_ms);
        this.millisecond = Math.round(1000 * (parseFloat(ss_ms) - this.second));
        this.offset      = tz_sign ? (tz_sign === '-' ? -1 : 1) * (60 * parseInt(tz_hh) + parseInt(tz_mm)) : null;
        this.utc         = !!utc_tag || this.offset === 0;

        if (this.type === time) util.lockAllProp(this);
    }

}

module.exports = time;
