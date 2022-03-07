const
    util                  = require('../module.xsd.util.js'),
    ExplicitTimezoneError = util.createErrorClass('ExplicitTimezoneError', 'XSD_FACET_ERROR');

function explicitTimezone(param) {

    switch (param) {
        case 'required':
            return (value) => {
                if (!util.isString(value)) throw new ExplicitTimezoneError('expected to be a string');
                if (!(value.endsWith('Z') || /[+-]\d{2}:\d{2}$/.test(value)))
                    throw new ExplicitTimezoneError('expected to include timezone offset');
                return value;
            };
        case 'prohibited':
            return (value) => {
                if (!util.isString(value)) throw new ExplicitTimezoneError('expected to be a string');
                if (value.endsWith('Z') || /[+-]\d{2}:\d{2}$/.test(value))
                    throw new ExplicitTimezoneError('expected to not include timezone offset');
                return value;
            };
        case 'optional':
            return (value) => {
                if (!util.isString(value)) throw new ExplicitTimezoneError('expected to be a string');
                return value;
            };
        default:
            throw new Error('explicitTimezone must be one of [required, prohibited, optional]');
    }

}

module.exports = explicitTimezone;
