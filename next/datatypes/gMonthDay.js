const
    util    = require('../module.xsd.util.js'),
    model   = require('../module.xsd.model.js'),
    pattern = /^--(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;

class gMonthDay extends model.anySimpleType {

    constructor(value) {
        if (util.isFiniteNumber(value))
            value = new Date(value * 1000);
        if (util.isDate(value))
            value = '--' + (value.getUTCMonth() + 1).toString().padStart(2, '0') + '-' +
                value.getUTCDate().toString().padStart(2, '0') + 'Z';

        super(value);

        this.value                                            = util.collapseWhiteSpace(this.value);
        const [match, MM, DD, tz_sign, tz_hh, tz_mm, utc_tag] = pattern.exec(this.value) || [];
        if (!match) throw new Error('expected to match gMonthDay pattern');

        this.month  = parseInt(MM);
        this.day    = parseInt(DD);
        this.offset = tz_sign ? (tz_sign === '-' ? -1 : 1) * (60 * parseInt(tz_hh) + parseInt(tz_mm)) : null;
        this.utc    = !!utc_tag || this.offset === 0;

        if (this.type === gMonthDay) Object.freeze(this);
    }

}

module.exports = gMonthDay;
