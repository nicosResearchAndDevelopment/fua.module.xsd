const
    util    = require('../module.xsd.util.js'),
    model   = require('../module.xsd.model.js'),
    pattern = /^--(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;

class gYearMonth extends model.anySimpleType {

    constructor(value) {
        super(value);

        this.value                                              = util.collapseWhiteSpace(this.value);
        const [match, YYYY, MM, tz_sign, tz_hh, tz_mm, utc_tag] = pattern.exec(this.value) || [];
        if (!match) throw new Error('expected to match dateTime pattern');

        this.year   = parseInt(YYYY);
        this.month  = parseInt(MM);
        this.offset = tz_sign ? (tz_sign === '-' ? -1 : 1) * (60 * parseInt(tz_hh) + parseInt(tz_mm)) : null;
        this.utc    = !!utc_tag || this.offset === 0;

        if (this.type === gYearMonth) util.lockAllProp(this);
    }

}

module.exports = gYearMonth;
