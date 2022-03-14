const
    util    = require('../module.xsd.util.js'),
    model   = require('../module.xsd.model.js'),
    pattern = /^(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\.[0-9]+)?(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;

class time extends model.anySimpleType {

    constructor(value) {
        if (util.isFiniteNumber(value))
            value = new Date(value * 1000);
        if (util.isDate(value))
            value = value.getUTCHours().toString().padStart(2, '0') + ':' +
                value.getUTCMinutes().toString().padStart(2, '0') + ':' +
                value.getUTCSeconds().toString().padStart(2, '0') + '.' +
                value.getUTCMilliseconds().toString().padStart(3, '0') + 'Z';

        super(value);

        this.value                                                         = util.collapseWhiteSpace(this.value);
        const [match, hh, mm, ss, ss_frac, tz_sign, tz_hh, tz_mm, utc_tag] = pattern.exec(this.value) || [];
        if (!match) throw new Error('expected to match dateTime pattern');

        this.hour        = parseInt(hh);
        this.minute      = parseInt(mm);
        this.second      = parseInt(ss);
        this.millisecond = ss_frac ? parseFloat(ss_frac.substr(1, 3).padEnd(3, '0') + '.' + ss_frac.substr(4)) : 0;
        this.offset      = tz_sign ? (tz_sign === '-' ? -1 : 1) * (60 * parseInt(tz_hh) + parseInt(tz_mm)) : null;
        this.utc         = !!utc_tag || this.offset === 0;

        if (this.type === time) Object.freeze(this);
    }

}

module.exports = time;
