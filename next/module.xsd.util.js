const
    _util = require('@nrd/fua.core.util'),
    util  = {
        ..._util,
        assert: _util.Assert('module.xsd')
    };

// TODO

module.exports = util;
