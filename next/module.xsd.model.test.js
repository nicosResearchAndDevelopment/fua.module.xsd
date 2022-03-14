const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    {inspect}        = require('util'),
    {URL}            = require('url'),
    model            = require('./module.xsd.model.js');

describe('next/module.xsd/model', function () {

    describe('primitive datatypes', function () {

        describe('xsd:string', function () {
            // https://www.w3.org/TR/xmlschema11-2/#string
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-string
            const xsd_string = model.string;

            test('basic examples', function () {
                expect(new xsd_string('\r\n  Auf den\r\n  Hund gekommen\r\n').valueOf())
                    .toBe('\r\n  Auf den\r\n  Hund gekommen\r\n');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_string()).toThrow();
                expect(() => new xsd_string(null)).toThrow();
            }); // test('negative examples')

            test('object model', function () {
                expect(new xsd_string('  Hello  World! \n Lorem Ipsum  ')).toMatchObject({
                    value: '  Hello  World! \n Lorem Ipsum  '
                });
                expect(new xsd_string(false)).toMatchObject({
                    value: 'false'
                });
                expect(new xsd_string(123.456)).toMatchObject({
                    value: '123.456'
                });
                expect(new xsd_string({toString: () => 'Hello World!'})).toMatchObject({
                    value: 'Hello World!'
                });
                expect(new xsd_string({})).toMatchObject({
                    value: '[object Object]'
                });
            }); // test('object model')

            test('json serialization', function () {
                expect(new xsd_string(123456).toJSON()).toEqual({
                    '@type':  'xsd:string',
                    '@value': '123456'
                });
            }); // test('json serialization')

        }); // describe('xsd:string')

        describe('xsd:boolean', function () {
            // https://www.w3.org/TR/xmlschema11-2/#boolean
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-boolean
            const xsd_boolean = model.boolean;

            test('basic examples', function () {
                expect(new xsd_boolean('true').valueOf()).toBe(true);
                expect(new xsd_boolean('1').valueOf()).toBe(true);
                expect(new xsd_boolean('false').valueOf()).toBe(false);
                expect(new xsd_boolean('0').valueOf()).toBe(false);
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_boolean('vrai')).toThrow();
                expect(() => new xsd_boolean('faux')).toThrow();
                expect(() => new xsd_boolean('wahr')).toThrow();
                expect(() => new xsd_boolean('falsch')).toThrow();

                expect(() => new xsd_boolean()).toThrow();
                expect(() => new xsd_boolean('Hello World!')).toThrow();
                expect(() => new xsd_boolean(42)).toThrow();
                expect(() => new xsd_boolean(new Date())).toThrow();
            }); // test('negative examples')

            test('native values', function () {
                expect(new xsd_boolean(true).valueOf()).toBe(true);
                expect(new xsd_boolean(1).valueOf()).toBe(true);
                expect(new xsd_boolean(false).valueOf()).toBe(false);
                expect(new xsd_boolean(0).valueOf()).toBe(false);
            }); // test('native values')

            test('object model', function () {
                expect(new xsd_boolean('false')).toMatchObject({
                    value: 'false'
                });
                expect(new xsd_boolean('1')).toMatchObject({
                    value: 'true'
                });
                expect(new xsd_boolean(0)).toMatchObject({
                    value: 'false'
                });
                expect(new xsd_boolean(true)).toMatchObject({
                    value: 'true'
                });
            }); // test('object model')

            test('json serialization', function () {
                expect(new xsd_boolean(false).toJSON()).toEqual({
                    '@type':  'xsd:boolean',
                    '@value': 'false'
                });
            }); // test('json serialization')

        }); // describe('xsd:boolean')

        describe('xsd:decimal', function () {
            // https://www.w3.org/TR/xmlschema11-2/#decimal
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-decimal
            const xsd_decimal = model.decimal;

            test('basic examples', function () {
                expect(new xsd_decimal('123.456').valueOf()).toBe(123.456);
                expect(new xsd_decimal('+1234.456').valueOf()).toBe(1234.456);
                expect(new xsd_decimal('-1234.456').valueOf()).toBe(-1234.456);
                expect(new xsd_decimal('-.456').valueOf()).toBe(-.456);
                expect(new xsd_decimal('-456').valueOf()).toBe(-456);
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_decimal('1 234.456')).toThrow(); // spaces are invalid
                expect(() => new xsd_decimal('1234.456E+2')).toThrow(); // exponent notation is invalid
                expect(() => new xsd_decimal('+ 1234.456')).toThrow(); // spaces are invalid
                expect(() => new xsd_decimal('+1,234.456')).toThrow(); // thousands separator are invalid

                expect(() => new xsd_decimal('INF')).toThrow();
                expect(() => new xsd_decimal(-Infinity)).toThrow();
                expect(() => new xsd_decimal(NaN)).toThrow();
                expect(() => new xsd_decimal(true)).toThrow();
                expect(() => new xsd_decimal('Hello World!')).toThrow();
                expect(() => new xsd_decimal('x 100')).toThrow();
                expect(() => new xsd_decimal('100x')).toThrow();
            }); // test('negative examples')

            test('native values', function () {
                expect(new xsd_decimal(42).valueOf()).toBe(42);
                expect(new xsd_decimal(123.456).valueOf()).toBe(123.456);
                expect(new xsd_decimal(.1337).valueOf()).toBe(.1337);
            }); // test('native values')

            test('object model', function () {
                expect(new xsd_decimal('123.456')).toMatchObject({
                    value:    '123.456',
                    sign:     '+',
                    integer:  '123',
                    fraction: '456'
                });
                expect(new xsd_decimal('   -000123.456000   ')).toMatchObject({
                    value:    '-123.456',
                    sign:     '-',
                    integer:  '123',
                    fraction: '456'
                });
                expect(new xsd_decimal('   -00012300   ')).toMatchObject({
                    value:    '-12300',
                    sign:     '-',
                    integer:  '12300',
                    fraction: '0'
                });
                expect(new xsd_decimal('.456000')).toMatchObject({
                    value:    '0.456',
                    sign:     '+',
                    integer:  '0',
                    fraction: '456'
                });
                expect(new xsd_decimal(-123.456)).toMatchObject({
                    value: '-123.456'
                });
                expect(new xsd_decimal(1e100 + 1.1)).toMatchObject({
                    value: '1'.padEnd(101, '0')
                });
            }); // test('object model')

            test('json serialization', function () {
                expect(new xsd_decimal('+100').toJSON()).toEqual({
                    '@type':  'xsd:decimal',
                    '@value': '100'
                });
            }); // test('json serialization')

        }); // describe('xsd:decimal')

        describe('xsd:float', function () {
            // https://www.w3.org/TR/xmlschema11-2/#float
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-float
            const xsd_float = model.float;

            test('basic examples', function () {
                expect(new xsd_float('123.456').valueOf()).toBeCloseTo(123.456);
                expect(new xsd_float('+1234.456').valueOf()).toBeCloseTo(1234.456);
                expect(new xsd_float('-1.2344e56').valueOf()).toBe(-Infinity);
                expect(new xsd_float('-.45E-6').valueOf()).toBeCloseTo(-.45E-6);
                expect(new xsd_float('INF').valueOf()).toBe(Infinity);
                expect(new xsd_float('-INF').valueOf()).toBe(-Infinity);
                expect(new xsd_float('NaN').valueOf()).toBe(NaN);
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_float('1234.4E 56')).toThrow(); // spaces are invalid
                expect(() => new xsd_float('1E+2.5')).toThrow(); // exponent must be an integer
                // expect(() => new xsd_float('+INF')).toThrow(); // positive infinity must not be signed
                expect(() => new xsd_float('NAN')).toThrow(); // special values are case-sensitive

                expect(() => new xsd_float('Infinity')).toThrow();
                expect(() => new xsd_float('nan')).toThrow();
                expect(() => new xsd_float(true)).toThrow();
                expect(() => new xsd_float('Hello World!')).toThrow();
                expect(() => new xsd_float('x 100')).toThrow();
                expect(() => new xsd_float('100x')).toThrow();
            }); // test('negative examples')

            test('native values', function () {
                expect(new xsd_float(42).valueOf()).toBeCloseTo(42);
                expect(new xsd_float(.1337).valueOf()).toBeCloseTo(.1337);
                expect(new xsd_float(-Infinity).valueOf()).toBe(-Infinity);
            }); // test('native values')

            test('object model', function () {
                expect(new xsd_float('123.456')).toMatchObject({
                    value:    '123.45600128173828',
                    NaN:      false,
                    infinite: false,
                    sign:     '+',
                    decimal:  '123.45600128173828',
                    expSign:  '',
                    exponent: ''
                });
                expect(new xsd_float('   -000123.456000e+1   ')).toMatchObject({
                    value:    '-123.456005859375e+1',
                    NaN:      false,
                    infinite: false,
                    sign:     '-',
                    decimal:  '123.456005859375',
                    expSign:  '+',
                    exponent: '1'
                });
                expect(new xsd_float('   -00012300   ')).toMatchObject({
                    value:    '-12300',
                    NaN:      false,
                    infinite: false,
                    sign:     '-',
                    decimal:  '12300',
                    expSign:  '',
                    exponent: ''
                });
                expect(new xsd_float('.456000')).toMatchObject({
                    value:    '0.4560000002384186',
                    NaN:      false,
                    infinite: false,
                    sign:     '+',
                    decimal:  '0.4560000002384186',
                    expSign:  '',
                    exponent: ''
                });
                expect(new xsd_float('INF')).toMatchObject({
                    value:    'INF',
                    NaN:      false,
                    infinite: true,
                    sign:     '+'
                });
                expect(new xsd_float('NaN')).toMatchObject({
                    value:    'NaN',
                    NaN:      true,
                    infinite: false,
                    sign:     ''
                });
                expect(new xsd_float(-123.456)).toMatchObject({
                    value: '-123.45600128173828'
                });
                expect(new xsd_float(1e100 + 1.1)).toMatchObject({
                    value: 'INF'
                });
                expect(new xsd_float(1e1000)).toMatchObject({
                    value: 'INF'
                });
                expect(new xsd_float('1e1000')).toMatchObject({
                    value: 'INF'
                });
                expect(new xsd_float(-Infinity)).toMatchObject({
                    value:    '-INF',
                    infinite: true,
                    sign:     '-'
                });
            }); // test('object model')

            test('json serialization', function () {
                expect(new xsd_float('+100').toJSON()).toEqual({
                    '@type':  'xsd:float',
                    '@value': '100'
                });
            }); // test('json serialization')

        }); // describe('xsd:float')

        describe('xsd:double', function () {
            // https://www.w3.org/TR/xmlschema11-2/#double
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-double
            const xsd_double = model.double;

            test('basic examples', function () {
                expect(new xsd_double('123.456').valueOf()).toBeCloseTo(123.456);
                expect(new xsd_double('+1234.456').valueOf()).toBeCloseTo(1234.456);
                expect(new xsd_double('-1.2344e56').valueOf()).toBeCloseTo(-1.2344e56);
                expect(new xsd_double('-.45E-6').valueOf()).toBeCloseTo(-.45E-6);
                expect(new xsd_double('INF').valueOf()).toBe(Infinity);
                expect(new xsd_double('-INF').valueOf()).toBe(-Infinity);
                expect(new xsd_double('NaN').valueOf()).toBe(NaN);
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_double('1234.4E 56')).toThrow(); // spaces are invalid
                expect(() => new xsd_double('1E+2.5')).toThrow(); // exponent must be an integer
                // expect(() => new xsd_double('+INF')).toThrow(); // positive infinity must not be signed
                expect(() => new xsd_double('NAN')).toThrow(); // special values are case-sensitive

                expect(() => new xsd_double('Infinity')).toThrow();
                expect(() => new xsd_double('nan')).toThrow();
                expect(() => new xsd_double(true)).toThrow();
                expect(() => new xsd_double('Hello World!')).toThrow();
                expect(() => new xsd_double('x 100')).toThrow();
                expect(() => new xsd_double('100x')).toThrow();
            }); // test('negative examples')

            test('native values', function () {
                expect(new xsd_double(42).valueOf()).toBeCloseTo(42);
                expect(new xsd_double(.1337).valueOf()).toBeCloseTo(.1337);
                expect(new xsd_double(-Infinity).valueOf()).toBe(-Infinity);
            }); // test('native values')

            test('object model', function () {
                expect(new xsd_double('123.456')).toMatchObject({
                    value:    '123.456',
                    NaN:      false,
                    infinite: false,
                    sign:     '+',
                    decimal:  '123.456',
                    expSign:  '',
                    exponent: ''
                });
                expect(new xsd_double('   -000123.456000e+1   ')).toMatchObject({
                    value:    '-123.456e+1',
                    NaN:      false,
                    infinite: false,
                    sign:     '-',
                    decimal:  '123.456',
                    expSign:  '+',
                    exponent: '1'
                });
                expect(new xsd_double('   -00012300   ')).toMatchObject({
                    value:    '-12300',
                    NaN:      false,
                    infinite: false,
                    sign:     '-',
                    decimal:  '12300',
                    expSign:  '',
                    exponent: ''
                });
                expect(new xsd_double('.456000')).toMatchObject({
                    value:    '0.456',
                    NaN:      false,
                    infinite: false,
                    sign:     '+',
                    decimal:  '0.456',
                    expSign:  '',
                    exponent: ''
                });
                expect(new xsd_double('INF')).toMatchObject({
                    value:    'INF',
                    NaN:      false,
                    infinite: true,
                    sign:     '+'
                });
                expect(new xsd_double('NaN')).toMatchObject({
                    value:    'NaN',
                    NaN:      true,
                    infinite: false,
                    sign:     ''
                });
                expect(new xsd_double(-123.456)).toMatchObject({
                    value: '-123.456'
                });
                expect(new xsd_double(1e100 + 1.1)).toMatchObject({
                    value: '1e+100'
                });
                expect(new xsd_double(1e1000)).toMatchObject({
                    value: 'INF'
                });
                expect(new xsd_double('1e1000')).toMatchObject({
                    value: 'INF'
                });
                expect(new xsd_double(-Infinity)).toMatchObject({
                    value:    '-INF',
                    infinite: true,
                    sign:     '-'
                });
            }); // test('object model')

            test('json serialization', function () {
                expect(new xsd_double('+100').toJSON()).toEqual({
                    '@type':  'xsd:double',
                    '@value': '100'
                });
            }); // test('json serialization')

        }); // describe('xsd:double')

        describe('xsd:duration', function () {
            // https://www.w3.org/TR/xmlschema11-2/#duration
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-duration
            const xsd_duration = model.duration;

            test('basic examples', function () {
                expect(new xsd_duration('PT1004199059S').valueOf()).toBe('PT1004199059S');
                expect(new xsd_duration('PT130S').valueOf()).toBe('PT130S');
                expect(new xsd_duration('PT2M10S').valueOf()).toBe('PT2M10S');
                expect(new xsd_duration('P1DT2S').valueOf()).toBe('P1DT2S');
                expect(new xsd_duration('-P1Y').valueOf()).toBe('-P1Y');
                expect(new xsd_duration('P1Y2M3DT5H20M30.123S').valueOf()).toBe('P1Y2M3DT5H20M30.123S');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_duration('1Y')).toThrow(); // missing leading P
                expect(() => new xsd_duration('P1S')).toThrow(); // missing divider T
                expect(() => new xsd_duration('P-1Y')).toThrow(); // all parts must be positive
                expect(() => new xsd_duration('P1M2Y')).toThrow(); // invalid order
                expect(() => new xsd_duration('P1Y-1M')).toThrow(); // all parts must be positive
            }); // test('negative examples')

            test('native values', function () {
                expect(new xsd_duration(1004199059).valueOf()).toBe('PT1004199059S');
                expect(new xsd_duration(0).valueOf()).toBe('PT0S');
                expect(new xsd_duration(-356).valueOf()).toBe('-PT356S');
            }); // test('native values')

            test('object model', function () {
                expect(new xsd_duration('PT1004199059S')).toMatchObject({
                    value:   'PT1004199059S',
                    sign:    '+',
                    seconds: 1004199059
                });
                expect(new xsd_duration('PT130S')).toMatchObject({
                    value:   'PT130S',
                    sign:    '+',
                    seconds: 130
                });
                expect(new xsd_duration('PT2M10S')).toMatchObject({
                    value:   'PT2M10S',
                    sign:    '+',
                    minutes: 2,
                    seconds: 10
                });
                expect(new xsd_duration('P1DT2S')).toMatchObject({
                    value:   'P1DT2S',
                    sign:    '+',
                    days:    1,
                    seconds: 2
                });
                expect(new xsd_duration('-P1Y')).toMatchObject({
                    value: '-P1Y',
                    sign:  '-',
                    years: 1
                });
                expect(new xsd_duration('P1Y2M3DT5H20M30.123S')).toMatchObject({
                    value:        'P1Y2M3DT5H20M30.123S',
                    sign:         '+',
                    years:        1,
                    months:       2,
                    days:         3,
                    hours:        5,
                    minutes:      20,
                    seconds:      30,
                    milliseconds: 123
                });
                expect(new xsd_duration('PT1.1S')).toMatchObject({
                    value:        'PT1.1S',
                    sign:         '+',
                    seconds:      1,
                    milliseconds: 100
                });
            }); // test('object model')

            test('json serialization', function () {
                expect(new xsd_duration('PT1004199059S').toJSON()).toEqual({
                    '@type':  'xsd:duration',
                    '@value': 'PT1004199059S'
                });
            }); // test('json serialization')

        }); // describe('xsd:duration')

        describe('xsd:dateTime', function () {
            // https://www.w3.org/TR/xmlschema11-2/#dateTime
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-datetime
            const xsd_dateTime = model.dateTime;

            test('basic examples', function () {
                expect(new xsd_dateTime('2001-10-26T21:32:52').valueOf()).toBe('2001-10-26T21:32:52');
                expect(new xsd_dateTime('2001-10-26T21:32:52+02:00').valueOf()).toBe('2001-10-26T21:32:52+02:00');
                expect(new xsd_dateTime('2001-10-26T19:32:52Z').valueOf()).toBe('2001-10-26T19:32:52Z');
                expect(new xsd_dateTime('2001-10-26T19:32:52+00:00').valueOf()).toBe('2001-10-26T19:32:52+00:00');
                expect(new xsd_dateTime('-2001-10-26T21:32:52').valueOf()).toBe('-2001-10-26T21:32:52');
                expect(new xsd_dateTime('2001-10-26T21:32:52.12679').valueOf()).toBe('2001-10-26T21:32:52.12679');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_dateTime('2001-10-26')).toThrow(); // all parts are required
                expect(() => new xsd_dateTime('2001-10-26T21:32')).toThrow(); // all parts are required
                expect(() => new xsd_dateTime('2001-10-26T25:32:52+02:00')).toThrow(); // hour is out of range
                expect(() => new xsd_dateTime('01-10-26T21:32')).toThrow(); // all parts are required
            }); // test('negative examples')

            test('native values', function () {
                const currentDate = new Date(), unixTime = currentDate.valueOf() / 1000;
                expect(new xsd_dateTime(currentDate)).toMatchObject({
                    year:        currentDate.getUTCFullYear(),
                    month:       currentDate.getUTCMonth() + 1,
                    day:         currentDate.getUTCDate(),
                    hour:        currentDate.getUTCHours(),
                    minute:      currentDate.getUTCMinutes(),
                    second:      currentDate.getUTCSeconds(),
                    millisecond: currentDate.getUTCMilliseconds()
                });
                expect(new xsd_dateTime(currentDate).valueOf()).toBe(currentDate.toISOString());
                expect(new xsd_dateTime(unixTime).valueOf()).toBe(new xsd_dateTime(currentDate).valueOf());
            }); // test('native values')

            test('object model', function () {
                expect(new xsd_dateTime('2001-10-26T21:32:52')).toMatchObject({
                    value:  '2001-10-26T21:32:52',
                    year:   2001,
                    month:  10,
                    day:    26,
                    hour:   21,
                    minute: 32,
                    second: 52,
                    utc:    false
                });
                expect(new xsd_dateTime('2001-10-26T21:32:52+02:00')).toMatchObject({
                    value:  '2001-10-26T21:32:52+02:00',
                    year:   2001,
                    month:  10,
                    day:    26,
                    hour:   21,
                    minute: 32,
                    second: 52,
                    utc:    false,
                    offset: 120
                });
                expect(new xsd_dateTime('2001-10-26T19:32:52Z')).toMatchObject({
                    value:  '2001-10-26T19:32:52Z',
                    year:   2001,
                    month:  10,
                    day:    26,
                    hour:   19,
                    minute: 32,
                    second: 52,
                    utc:    true
                });
                expect(new xsd_dateTime('2001-10-26T19:32:52+00:00')).toMatchObject({
                    value:  '2001-10-26T19:32:52+00:00',
                    year:   2001,
                    month:  10,
                    day:    26,
                    hour:   19,
                    minute: 32,
                    second: 52,
                    utc:    true,
                    offset: 0
                });
                expect(new xsd_dateTime('-2001-10-26T21:32:52')).toMatchObject({
                    value:  '-2001-10-26T21:32:52',
                    year:   -2001,
                    month:  10,
                    day:    26,
                    hour:   21,
                    minute: 32,
                    second: 52,
                    utc:    false
                });
                expect(new xsd_dateTime('2001-10-26T21:32:52.12679')).toMatchObject({
                    value:       '2001-10-26T21:32:52.12679',
                    year:        2001,
                    month:       10,
                    day:         26,
                    hour:        21,
                    minute:      32,
                    second:      52,
                    millisecond: 126.79,
                    utc:         false
                });
            }); // test('object model')

            test('json serialization', function () {
                expect(new xsd_dateTime('2001-10-26T21:32:52.12679').toJSON()).toEqual({
                    '@type':  'xsd:dateTime',
                    '@value': '2001-10-26T21:32:52.12679'
                });
            }); // test('json serialization')

        }); // describe('xsd:dateTime')

        describe('xsd:time', function () {
            // https://www.w3.org/TR/xmlschema11-2/#time
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-time
            const xsd_time = model.time;

            test('basic examples', function () {
                expect(new xsd_time('21:32:52').valueOf()).toBe('21:32:52');
                expect(new xsd_time('21:32:52+02:00').valueOf()).toBe('21:32:52+02:00');
                expect(new xsd_time('19:32:52Z').valueOf()).toBe('19:32:52Z');
                expect(new xsd_time('19:32:52+00:00').valueOf()).toBe('19:32:52+00:00');
                expect(new xsd_time('21:32:52.12679').valueOf()).toBe('21:32:52.12679');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_time('21:32')).toThrow(); // all parts are required
                expect(() => new xsd_time('25:25:10')).toThrow(); // hour is out of range
                expect(() => new xsd_time('-10:00:00')).toThrow(); // hour is out of range
                expect(() => new xsd_time('1:20:10')).toThrow(); // all digits are required
            }); // test('negative examples')

            test('native values', function () {
                const currentDate = new Date(), unixTime = currentDate.valueOf() / 1000;
                expect(new xsd_time(currentDate)).toMatchObject({
                    hour:        currentDate.getUTCHours(),
                    minute:      currentDate.getUTCMinutes(),
                    second:      currentDate.getUTCSeconds(),
                    millisecond: currentDate.getUTCMilliseconds()
                });
                expect(new xsd_time(unixTime).valueOf()).toBe(new xsd_time(currentDate).valueOf());
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:time')

        describe('xsd:date', function () {
            // https://www.w3.org/TR/xmlschema11-2/#date
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-date
            const xsd_date = model.date;

            test('basic examples', function () {
                expect(new xsd_date('2001-10-26').valueOf()).toBe('2001-10-26');
                expect(new xsd_date('2001-10-26+02:00').valueOf()).toBe('2001-10-26+02:00');
                expect(new xsd_date('2001-10-26Z').valueOf()).toBe('2001-10-26Z');
                expect(new xsd_date('2001-10-26+00:00').valueOf()).toBe('2001-10-26+00:00');
                expect(new xsd_date('-2001-10-26').valueOf()).toBe('-2001-10-26');
                expect(new xsd_date('-20000-04-01').valueOf()).toBe('-20000-04-01');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_date('2001-10')).toThrow(); // all parts are required
                expect(() => new xsd_date('2001-10-32')).toThrow(); // day is out of range
                expect(() => new xsd_date('2001-13-26+02:00')).toThrow(); // month is out of range
                expect(() => new xsd_date('01-10-26')).toThrow(); // the century is missing
            }); // test('negative examples')

            test('native values', function () {
                const currentDate = new Date(), unixTime = currentDate.valueOf() / 1000;
                expect(new xsd_date(currentDate)).toMatchObject({
                    year:  currentDate.getUTCFullYear(),
                    month: currentDate.getUTCMonth() + 1,
                    day:   currentDate.getUTCDate()
                });
                expect(new xsd_date(unixTime).valueOf()).toBe(new xsd_date(currentDate).valueOf());
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:date')

        describe('xsd:gYearMonth', function () {
            // https://www.w3.org/TR/xmlschema11-2/#gYearMonth
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gyearmonth
            const xsd_gYearMonth = model.gYearMonth;

            test('basic examples', function () {
                expect(new xsd_gYearMonth('2001-10').valueOf()).toBe('2001-10');
                expect(new xsd_gYearMonth('2001-10+02:00').valueOf()).toBe('2001-10+02:00');
                expect(new xsd_gYearMonth('2001-10Z').valueOf()).toBe('2001-10Z');
                expect(new xsd_gYearMonth('2001-10+00:00').valueOf()).toBe('2001-10+00:00');
                expect(new xsd_gYearMonth('-2001-10').valueOf()).toBe('-2001-10');
                expect(new xsd_gYearMonth('-20000-04').valueOf()).toBe('-20000-04');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_gYearMonth('2001')).toThrow(); // month is missing
                expect(() => new xsd_gYearMonth('2001-13')).toThrow(); // month is out of range
                expect(() => new xsd_gYearMonth('2001-13-26+02:00')).toThrow(); // month is out of range
                expect(() => new xsd_gYearMonth('01-10')).toThrow(); // century is missing
            }); // test('negative examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:gYearMonth')

        describe('xsd:gYear', function () {
            // https://www.w3.org/TR/xmlschema11-2/#gYear
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gyear
            const xsd_gYear = model.gYear;

            test('basic examples', function () {
                expect(new xsd_gYear('2001').valueOf()).toBe('2001');
                expect(new xsd_gYear('2001+02:00').valueOf()).toBe('2001+02:00');
                expect(new xsd_gYear('2001Z').valueOf()).toBe('2001Z');
                expect(new xsd_gYear('2001+00:00').valueOf()).toBe('2001+00:00');
                expect(new xsd_gYear('-2001').valueOf()).toBe('-2001');
                expect(new xsd_gYear('-20000').valueOf()).toBe('-20000');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_gYear('01')).toThrow(); // century is missing
                expect(() => new xsd_gYear('2001-12')).toThrow(); // month part is forbidden
            }); // test('negative examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:gYear')

        describe('xsd:gMonthDay', function () {
            // https://www.w3.org/TR/xmlschema11-2/#gMonthDay
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gmonthday
            const xsd_gMonthDay = model.gMonthDay;

            test('basic examples', function () {
                expect(new xsd_gMonthDay('--05-01').valueOf()).toBe('--05-01');
                expect(new xsd_gMonthDay('--11-01Z').valueOf()).toBe('--11-01Z');
                expect(new xsd_gMonthDay('--11-01+02:00').valueOf()).toBe('--11-01+02:00');
                expect(new xsd_gMonthDay('--11-01-04:00').valueOf()).toBe('--11-01-04:00');
                expect(new xsd_gMonthDay('--11-15').valueOf()).toBe('--11-15');
                expect(new xsd_gMonthDay('--02-29').valueOf()).toBe('--02-29');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_gMonthDay('-01-30-')).toThrow(); // the format is "--MM-DD"
                expect(() => new xsd_gMonthDay('--01-35')).toThrow(); // day is out of range
                expect(() => new xsd_gMonthDay('--1-5')).toThrow(); // leading zeros are missing
                expect(() => new xsd_gMonthDay('01-15')).toThrow(); // "--" is missing
            }); // test('negative examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:gMonthDay')

        describe('xsd:gDay', function () {
            // https://www.w3.org/TR/xmlschema11-2/#gDay
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gday
            const xsd_gDay = model.gDay;

            test('basic examples', function () {
                expect(new xsd_gDay('---01').valueOf()).toBe('---01');
                expect(new xsd_gDay('---01Z').valueOf()).toBe('---01Z');
                expect(new xsd_gDay('---01+02:00').valueOf()).toBe('---01+02:00');
                expect(new xsd_gDay('---01-04:00').valueOf()).toBe('---01-04:00');
                expect(new xsd_gDay('---15').valueOf()).toBe('---15');
                expect(new xsd_gDay('---31').valueOf()).toBe('---31');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_gDay('--30-')).toThrow(); // the format is "---DD"
                expect(() => new xsd_gDay('---35')).toThrow(); // day is out of range
                expect(() => new xsd_gDay('---5')).toThrow(); // all digits are required
                expect(() => new xsd_gDay('15')).toThrow(); // "---" is missing
            }); // test('negative examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:gDay')

        describe('xsd:gMonth', function () {
            // https://www.w3.org/TR/xmlschema11-2/#gMonth
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gmonth
            const xsd_gMonth = model.gMonth;

            test('basic examples', function () {
                expect(new xsd_gMonth('--05').valueOf()).toBe('--05');
                expect(new xsd_gMonth('--11Z').valueOf()).toBe('--11Z');
                expect(new xsd_gMonth('--11+02:00').valueOf()).toBe('--11+02:00');
                expect(new xsd_gMonth('--11-04:00').valueOf()).toBe('--11-04:00');
                expect(new xsd_gMonth('--02').valueOf()).toBe('--02');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_gMonth('-01-')).toThrow(); // the format is "--MM"
                expect(() => new xsd_gMonth('--13')).toThrow(); // month is out of range
                expect(() => new xsd_gMonth('--1')).toThrow(); // all digits are required
                expect(() => new xsd_gMonth('01')).toThrow(); // "--" is missing
            }); // test('negative examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:gMonth')

        describe('xsd:hexBinary', function () {
            // https://www.w3.org/TR/xmlschema11-2/#hexBinary
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-hexbinary
            const xsd_hexBinary = model.hexBinary;

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:hexBinary')

        describe('xsd:base64Binary', function () {
            // https://www.w3.org/TR/xmlschema11-2/#base64Binary
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-base64binary
            const xsd_base64Binary = model.base64Binary;

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:base64Binary')

        describe('xsd:anyURI', function () {
            // https://www.w3.org/TR/xmlschema11-2/#anyURI
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-anyuri
            const xsd_anyURI = model.anyURI;

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:anyURI')

        describe('xsd:QName', function () {
            // https://www.w3.org/TR/xmlschema11-2/#QName
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-qname
            const xsd_QName = model.QName;

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:QName')

        describe('xsd:NOTATION', function () {
            // https://www.w3.org/TR/xmlschema11-2/#NOTATION
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-notation
            const xsd_NOTATION = model.NOTATION;

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:NOTATION')

    }); // describe('primitive datatypes')

    describe('other datatypes', function () {

        describe('xsd:normalizedString', function () {
            // https://www.w3.org/TR/xmlschema11-2/#normalizedString
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-normalizedstring
            const xsd_normalizedString = model.normalizedString;

            test('basic examples', function () {
                expect(new xsd_normalizedString('\r\n  Auf den\r\n  Hund gekommen\r\n').valueOf()).toBe('    Auf den    Hund gekommen  ');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => xsd_normalizedString()).toThrow();
                expect(() => xsd_normalizedString(null)).toThrow();
            }); // test('negative examples')

            test('object model', function () {
                expect(new xsd_normalizedString('  Hello  World! \n Lorem Ipsum  ')).toMatchObject({
                    value: '  Hello  World!   Lorem Ipsum  '
                });
                expect(new xsd_normalizedString(' \t\t \r\n ')).toMatchObject({
                    value: '       '
                });
                expect(new xsd_normalizedString(1e3)).toMatchObject({
                    value: '1000'
                });
                expect(new xsd_normalizedString({'lorem': 'ipsum'})).toMatchObject({
                    value: '[object Object]'
                });
            }); // test('object model')

            test('json serialization', function () {
                expect(new xsd_normalizedString('\t\tHello World!\r\n').toJSON()).toEqual({
                    '@type':  'xsd:normalizedString',
                    '@value': '  Hello World!  '
                });
            }); // test('json serialization')

        }); // describe('xsd:normalizedString')

        describe('xsd:token', function () {
            // https://www.w3.org/TR/xmlschema11-2/#token
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-token
            const xsd_token = model.token;

            test('basic examples', function () {
                expect(new xsd_token('\r\n  Auf den\r\n  Hund gekommen\r\n').valueOf()).toBe('Auf den Hund gekommen');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => xsd_token()).toThrow();
                expect(() => xsd_token(null)).toThrow();
            }); // test('negative examples')

            test('object model', function () {
                expect(new xsd_token('  Hello  World! \n Lorem Ipsum  ')).toMatchObject({
                    value: 'Hello World! Lorem Ipsum'
                });
                expect(new xsd_token(' \t\t \r\n ')).toMatchObject({
                    value: ''
                });
            }); // test('object model')

            test('json serialization', function () {
                expect(new xsd_token({toString: () => '\t\tHello World!\r\n'}).toJSON()).toEqual({
                    '@type':  'xsd:token',
                    '@value': 'Hello World!'
                });
            }); // test('json serialization')

        }); // describe('xsd:token')

        describe('xsd:language', function () {
            // https://www.w3.org/TR/xmlschema11-2/#language
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-language
            const xsd_language = model.language;

            test('basic examples', function () {
                expect(new xsd_language('en').valueOf()).toBe('en');
                expect(new xsd_language('en-US').valueOf()).toBe('en-US');
                expect(new xsd_language('de').valueOf()).toBe('de');
                expect(new xsd_language('de-DE').valueOf()).toBe('de-DE');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_language('Hello World!')).toThrow();

                expect(() => new xsd_language(true)).toThrow();
                expect(() => new xsd_language(1e3)).toThrow();
                expect(() => new xsd_language()).toThrow();
                expect(() => new xsd_language({'lorem': 'ipsum'})).toThrow();
                expect(() => new xsd_language(null)).toThrow();
            }); // test('negative examples')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:language')

        describe('xsd:NMTOKEN', function () {
            // https://www.w3.org/TR/xmlschema11-2/#NMTOKEN
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-nmtoken
            const xsd_NMTOKEN = model.NMTOKEN;

            test('basic examples', function () {
                expect(new xsd_NMTOKEN('Snoopy').valueOf()).toBe('Snoopy');
                expect(new xsd_NMTOKEN('CMS').valueOf()).toBe('CMS');
                expect(new xsd_NMTOKEN('1950-10-04').valueOf()).toBe('1950-10-04');
                expect(new xsd_NMTOKEN('0836217462').valueOf()).toBe('0836217462');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_NMTOKEN('brachte die klassische Musik in die Peanuts-Comics ein')).toThrow(); // spaces are invalid
                expect(() => new xsd_NMTOKEN('kühn,dreist')).toThrow(); // commas are invalid

                expect(() => new xsd_NMTOKEN(true)).toThrow();
                expect(() => new xsd_NMTOKEN(1e3)).toThrow();
                expect(() => new xsd_NMTOKEN()).toThrow();
                expect(() => new xsd_NMTOKEN({'lorem': 'ipsum'})).toThrow();
                expect(() => new xsd_NMTOKEN(null)).toThrow();
            }); // test('negative examples')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:NMTOKEN')

        describe('xsd:NMTOKENS', function () {
            // https://www.w3.org/TR/xmlschema11-2/#NMTOKENS
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-nmtokens
            const xsd_NMTOKENS = model.NMTOKENS;

            test('basic examples', function () {
                expect(new xsd_NMTOKENS('Snoopy').valueOf()).toMatchObject(['Snoopy']);
                expect(new xsd_NMTOKENS('CMS').valueOf()).toMatchObject(['CMS']);
                expect(new xsd_NMTOKENS('1950-10-04').valueOf()).toMatchObject(['1950-10-04']);
                expect(new xsd_NMTOKENS('0836217462 0836217463').valueOf()).toMatchObject(['0836217462', '0836217463']);
                expect(new xsd_NMTOKENS('brachte die klassische Musik in die Peanuts-Comics ein').valueOf())
                    .toMatchObject(['brachte', 'die', 'klassische', 'Musik', 'in', 'die', 'Peanuts-Comics', 'ein']);
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_NMTOKENS('brachte die klassische Musik in die "Peanuts"-Comics ein')).toThrow(); // quotations are invalid
                expect(() => new xsd_NMTOKENS('kühn,dreist')).toThrow(); // commas are invalid

                expect(() => new xsd_NMTOKENS(true)).toThrow();
                expect(() => new xsd_NMTOKENS(1e3)).toThrow();
                expect(() => new xsd_NMTOKENS()).toThrow();
                expect(() => new xsd_NMTOKENS({'lorem': 'ipsum'})).toThrow();
                expect(() => new xsd_NMTOKENS(null)).toThrow();
            }); // test('negative examples')

            test('native values', function () {
                expect(new xsd_NMTOKENS(['0836217462', '0836217463']).valueOf()).toMatchObject(['0836217462', '0836217463']);
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:NMTOKENS')

        describe('xsd:Name', function () {
            // https://www.w3.org/TR/xmlschema11-2/#Name
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-name
            const xsd_Name = model.Name;

            test('basic examples', function () {
                expect(new xsd_Name('Snoopy').valueOf()).toBe('Snoopy');
                expect(new xsd_Name('CMS').valueOf()).toBe('CMS');
                expect(new xsd_Name('_1950-10-04_10:00').valueOf()).toBe('_1950-10-04_10:00');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_Name('0836217462')).toThrow(); // must not begin with a number
                expect(() => new xsd_Name('kühn,dreist')).toThrow(); // commas are invalid

                expect(() => new xsd_Name(true)).toThrow();
                expect(() => new xsd_Name(1e3)).toThrow();
                expect(() => new xsd_Name()).toThrow();
                expect(() => new xsd_Name({'lorem': 'ipsum'})).toThrow();
                expect(() => new xsd_Name(null)).toThrow();
            }); // test('negative examples')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:Name')

        describe('xsd:NCName', function () {
            // https://www.w3.org/TR/xmlschema11-2/#NCName
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-ncname
            const xsd_NCName = model.NCName;

            test('basic examples', function () {
                expect(new xsd_NCName('Snoopy').valueOf()).toBe('Snoopy');
                expect(new xsd_NCName('CMS').valueOf()).toBe('CMS');
                expect(new xsd_NCName('_1950-10-04_10-00').valueOf()).toBe('_1950-10-04_10-00');
                expect(new xsd_NCName('kühn_dreist').valueOf()).toBe('kühn_dreist');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_NCName('_1950-10-04:10-00')).toThrow(); // colons are invalid
                expect(() => new xsd_NCName('kühn:dreist')).toThrow(); // colons are invalid

                expect(() => new xsd_NCName(true)).toThrow();
                expect(() => new xsd_NCName(1e3)).toThrow();
                expect(() => new xsd_NCName()).toThrow();
                expect(() => new xsd_NCName({'lorem': 'ipsum'})).toThrow();
                expect(() => new xsd_NCName(null)).toThrow();
            }); // test('negative examples')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:NCName')

        describe('xsd:ID', function () {
            // https://www.w3.org/TR/xmlschema11-2/#ID
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-id
            const xsd_ID = model.ID;

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:ID')

        describe('xsd:IDREF', function () {
            // https://www.w3.org/TR/xmlschema11-2/#IDREF
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-idref
            const xsd_IDREF = model.IDREF;

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:IDREF')

        describe('xsd:IDREFS', function () {
            // https://www.w3.org/TR/xmlschema11-2/#IDREFS
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-idrefs
            const xsd_IDREFS = model.IDREFS;

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:IDREFS')

        describe('xsd:ENTITY', function () {
            // https://www.w3.org/TR/xmlschema11-2/#ENTITY
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-entity
            const xsd_ENTITY = model.ENTITY;

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:ENTITY')

        describe('xsd:ENTITIES', function () {
            // https://www.w3.org/TR/xmlschema11-2/#ENTITIES
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-entities
            const xsd_ENTITIES = model.ENTITIES;

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:ENTITIES')

        describe('xsd:integer', function () {
            // https://www.w3.org/TR/xmlschema11-2/#integer
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-integer
            const xsd_integer = model.integer;

            test('basic examples', function () {
                expect(new xsd_integer('-123456789012345678901234567890').valueOf()).toBe(-123456789012345678901234567890);
                expect(new xsd_integer('2147483647').valueOf()).toBe(2147483647);
                expect(new xsd_integer('0').valueOf()).toBe(0);
                expect(new xsd_integer('-0000000000000000000005').valueOf()).toBe(-5);
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_integer('1.')).toThrow();
                expect(() => new xsd_integer('2.6')).toThrow();
                expect(() => new xsd_integer('A')).toThrow();

                expect(() => new xsd_integer(true)).toThrow();
                expect(() => new xsd_integer('Hello World!')).toThrow();
            }); // test('negative examples')

            test('native values', function () {
                expect(new xsd_integer(42).valueOf()).toBe(42);
                expect(new xsd_integer(-123).valueOf()).toBe(-123);
                expect(new xsd_integer(0).valueOf()).toBe(0);
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:integer')

        describe('xsd:nonPositiveInteger', function () {
            // https://www.w3.org/TR/xmlschema11-2/#nonPositiveInteger
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-nonpositiveinteger
            const xsd_nonPositiveInteger = model.nonPositiveInteger;

            test('basic examples', function () {
                expect(new xsd_nonPositiveInteger('-123456789012345678901234567890').valueOf()).toBe(-123456789012345678901234567890);
                expect(new xsd_nonPositiveInteger('0').valueOf()).toBe(0);
                expect(new xsd_nonPositiveInteger('-0000000000000000000005').valueOf()).toBe(-5);
                expect(new xsd_nonPositiveInteger('-2147483647').valueOf()).toBe(-2147483647);
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_nonPositiveInteger('-1.')).toThrow();
                expect(() => new xsd_nonPositiveInteger('1.')).toThrow();

                expect(() => new xsd_nonPositiveInteger(42)).toThrow();
                expect(() => new xsd_nonPositiveInteger(true)).toThrow();
                expect(() => new xsd_nonPositiveInteger('Hello World!')).toThrow();
            }); // test('negative examples')

            test('native values', function () {
                expect(new xsd_nonPositiveInteger(-123).valueOf()).toBe(-123);
                expect(new xsd_nonPositiveInteger(0).valueOf()).toBe(0);
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:nonPositiveInteger')

        describe('xsd:negativeInteger', function () {
            // https://www.w3.org/TR/xmlschema11-2/#negativeInteger
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-negativeinteger
            const xsd_negativeInteger = model.negativeInteger;

            test('basic examples', function () {
                expect(new xsd_negativeInteger('-123456789012345678901234567890').valueOf()).toBe(-123456789012345678901234567890);
                expect(new xsd_negativeInteger('-1').valueOf()).toBe(-1);
                expect(new xsd_negativeInteger('-0000000000000000000005').valueOf()).toBe(-5);
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_negativeInteger('0')).toThrow();
                expect(() => new xsd_negativeInteger('-1.')).toThrow();

                expect(() => new xsd_negativeInteger(0)).toThrow();
                expect(() => new xsd_negativeInteger(42)).toThrow();
                expect(() => new xsd_negativeInteger(true)).toThrow();
                expect(() => new xsd_negativeInteger('Hello World!')).toThrow();
            }); // test('negative examples')

            test('native values', function () {
                expect(new xsd_negativeInteger(-123).valueOf()).toBe(-123);
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:negativeInteger')

        describe('xsd:nonNegativeInteger', function () {
            // https://www.w3.org/TR/xmlschema11-2/#nonNegativeInteger
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-nonnegativeinteger
            const xsd_nonNegativeInteger = model.nonNegativeInteger;

            test('basic examples', function () {
                expect(new xsd_nonNegativeInteger('+123456789012345678901234567890').valueOf()).toBe(123456789012345678901234567890);
                expect(new xsd_nonNegativeInteger('0').valueOf()).toBe(0);
                expect(new xsd_nonNegativeInteger('0000000000000000000005').valueOf()).toBe(5);
                expect(new xsd_nonNegativeInteger('2147483647').valueOf()).toBe(2147483647);
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_nonNegativeInteger('1.')).toThrow();
                expect(() => new xsd_nonNegativeInteger('-1.')).toThrow();

                expect(() => new xsd_nonNegativeInteger(-123)).toThrow();
                expect(() => new xsd_nonNegativeInteger(true)).toThrow();
                expect(() => new xsd_nonNegativeInteger('Hello World!')).toThrow();
            }); // test('negative examples')

            test('native values', function () {
                expect(new xsd_nonNegativeInteger(42).valueOf()).toBe(42);
                expect(new xsd_nonNegativeInteger(0).valueOf()).toBe(0);
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:nonNegativeInteger')

        describe('xsd:positiveInteger', function () {
            // https://www.w3.org/TR/xmlschema11-2/#positiveInteger
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-positiveinteger
            const xsd_positiveInteger = model.positiveInteger;

            test('basic examples', function () {
                expect(new xsd_positiveInteger('123456789012345678901234567890').valueOf()).toBe(123456789012345678901234567890);
                expect(new xsd_positiveInteger('1').valueOf()).toBe(1);
                expect(new xsd_positiveInteger('0000000000000000000005').valueOf()).toBe(5);
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_positiveInteger('0')).toThrow();
                expect(() => new xsd_positiveInteger('1.')).toThrow();

                expect(() => new xsd_positiveInteger(0)).toThrow();
                expect(() => new xsd_positiveInteger(-123)).toThrow();
                expect(() => new xsd_positiveInteger(true)).toThrow();
                expect(() => new xsd_positiveInteger('Hello World!')).toThrow();
            }); // test('negative examples')

            test('native values', function () {
                expect(new xsd_positiveInteger(42).valueOf()).toBe(42);
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:positiveInteger')

        describe('xsd:long', function () {
            // https://www.w3.org/TR/xmlschema11-2/#long
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-long
            const xsd_long = model.long;

            test('basic examples', function () {
                expect(new xsd_long('-9223372036854775808').valueOf()).toBe(-9223372036854775808);
                expect(new xsd_long('0').valueOf()).toBe(0);
                expect(new xsd_long('-0000000000000000000005').valueOf()).toBe(-5);
                expect(new xsd_long('9223372036854775807').valueOf()).toBe(9223372036854775807);
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_long('9223372036854775808')).toThrow();
                expect(() => new xsd_long('1.')).toThrow();

                expect(() => new xsd_long(true)).toThrow();
                expect(() => new xsd_long('Hello World!')).toThrow();
                expect(() => new xsd_long(9223372036854775808)).toThrow();
            }); // test('negative examples')

            test('native values', function () {
                expect(new xsd_long(42).valueOf()).toBe(42);
                expect(new xsd_long(-123).valueOf()).toBe(-123);
                expect(new xsd_long(0).valueOf()).toBe(0);
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:long')

        describe('xsd:int', function () {
            // https://www.w3.org/TR/xmlschema11-2/#int
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-int
            const xsd_int = model.int;

            test('basic examples', function () {
                expect(new xsd_int('-2147483648').valueOf()).toBe(-2147483648);
                expect(new xsd_int('0').valueOf()).toBe(0);
                expect(new xsd_int('-0000000000000000000005').valueOf()).toBe(-5);
                expect(new xsd_int('2147483647').valueOf()).toBe(2147483647);
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_int('-2147483649')).toThrow();
                expect(() => new xsd_int('100000000000')).toThrow();

                expect(() => new xsd_int(true)).toThrow();
                expect(() => new xsd_int('Hello World!')).toThrow();
                expect(() => new xsd_int(2147483648)).toThrow();
            }); // test('negative examples')

            test('native values', function () {
                expect(new xsd_int(42).valueOf()).toBe(42);
                expect(new xsd_int(-123).valueOf()).toBe(-123);
                expect(new xsd_int(0).valueOf()).toBe(0);
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:int')

        describe('xsd:short', function () {
            // https://www.w3.org/TR/xmlschema11-2/#short
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-short
            const xsd_short = model.short;

            test('basic examples', function () {
                expect(new xsd_short('-32768').valueOf()).toBe(-32768);
                expect(new xsd_short('0').valueOf()).toBe(0);
                expect(new xsd_short('-0000000000000000000005').valueOf()).toBe(-5);
                expect(new xsd_short('32767').valueOf()).toBe(32767);
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_short('32768')).toThrow();
                expect(() => new xsd_short('1.')).toThrow();

                expect(() => new xsd_short(true)).toThrow();
                expect(() => new xsd_short('Hello World!')).toThrow();
                expect(() => new xsd_short(32768)).toThrow();
            }); // test('negative examples')

            test('native values', function () {
                expect(new xsd_short(42).valueOf()).toBe(42);
                expect(new xsd_short(-123).valueOf()).toBe(-123);
                expect(new xsd_short(0).valueOf()).toBe(0);
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:short')

        describe('xsd:byte', function () {
            // https://www.w3.org/TR/xmlschema11-2/#byte
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-byte
            const xsd_byte = model.byte;

            test('basic examples', function () {
                expect(new xsd_byte('27').valueOf()).toBe(27);
                expect(new xsd_byte('-34').valueOf()).toBe(-34);
                expect(new xsd_byte('+105').valueOf()).toBe(105);
                expect(new xsd_byte('0').valueOf()).toBe(0);
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_byte('0A')).toThrow();
                expect(() => new xsd_byte('1524')).toThrow();
                expect(() => new xsd_byte('INF')).toThrow();

                expect(() => new xsd_byte(true)).toThrow();
                expect(() => new xsd_byte('Hello World!')).toThrow();
                expect(() => new xsd_byte(128)).toThrow();
            }); // test('negative examples')

            test('native values', function () {
                expect(new xsd_byte(42).valueOf()).toBe(42);
                expect(new xsd_byte(-123).valueOf()).toBe(-123);
                expect(new xsd_byte(0).valueOf()).toBe(0);
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:byte')

        describe('xsd:unsignedLong', function () {
            // https://www.w3.org/TR/xmlschema11-2/#unsignedLong
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-unsignedlong
            const xsd_unsignedLong = model.unsignedLong;

            test('basic examples', function () {
                expect(new xsd_unsignedLong('18446744073709551615').valueOf()).toBe(18446744073709551615);
                expect(new xsd_unsignedLong('0').valueOf()).toBe(0);
                expect(new xsd_unsignedLong('+0000000000000000000005').valueOf()).toBe(5);
                expect(new xsd_unsignedLong('1').valueOf()).toBe(1);
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_unsignedLong('-1')).toThrow();
                expect(() => new xsd_unsignedLong('1.')).toThrow();

                expect(() => new xsd_unsignedLong(-123)).toThrow();
                expect(() => new xsd_unsignedLong(true)).toThrow();
                expect(() => new xsd_unsignedLong('Hello World!')).toThrow();
                expect(() => new xsd_unsignedLong(18446744073709551616)).toThrow();
            }); // test('negative examples')

            test('native values', function () {
                expect(new xsd_unsignedLong(42).valueOf()).toBe(42);
                expect(new xsd_unsignedLong(0).valueOf()).toBe(0);
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:unsignedLong')

        describe('xsd:unsignedInt', function () {
            // https://www.w3.org/TR/xmlschema11-2/#unsignedInt
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-unsignedint
            const xsd_unsignedInt = model.unsignedInt;

            test('basic examples', function () {
                expect(new xsd_unsignedInt('4294967295').valueOf()).toBe(4294967295);
                expect(new xsd_unsignedInt('0').valueOf()).toBe(0);
                expect(new xsd_unsignedInt('+0000000000000000000005').valueOf()).toBe(5);
                expect(new xsd_unsignedInt('1').valueOf()).toBe(1);
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_unsignedInt('-1')).toThrow();
                expect(() => new xsd_unsignedInt('1.')).toThrow();

                expect(() => new xsd_unsignedInt(-123)).toThrow();
                expect(() => new xsd_unsignedInt(true)).toThrow();
                expect(() => new xsd_unsignedInt('Hello World!')).toThrow();
                expect(() => new xsd_unsignedInt(4294967296)).toThrow();
            }); // test('negative examples')

            test('native values', function () {
                expect(new xsd_unsignedInt(42).valueOf()).toBe(42);
                expect(new xsd_unsignedInt(0).valueOf()).toBe(0);
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:unsignedInt')

        describe('xsd:unsignedShort', function () {
            // https://www.w3.org/TR/xmlschema11-2/#unsignedShort
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-unsignedshort
            const xsd_unsignedShort = model.unsignedShort;

            test('basic examples', function () {
                expect(new xsd_unsignedShort('65535').valueOf()).toBe(65535);
                expect(new xsd_unsignedShort('0').valueOf()).toBe(0);
                expect(new xsd_unsignedShort('+0000000000000000000005').valueOf()).toBe(5);
                expect(new xsd_unsignedShort('1').valueOf()).toBe(1);
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_unsignedShort('-1')).toThrow();
                expect(() => new xsd_unsignedShort('1.')).toThrow();

                expect(() => new xsd_unsignedShort(-123)).toThrow();
                expect(() => new xsd_unsignedShort(true)).toThrow();
                expect(() => new xsd_unsignedShort('Hello World!')).toThrow();
                expect(() => new xsd_unsignedShort(65536)).toThrow();
            }); // test('negative examples')

            test('native values', function () {
                expect(new xsd_unsignedShort(42).valueOf()).toBe(42);
                expect(new xsd_unsignedShort(0).valueOf()).toBe(0);
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:unsignedShort')

        describe('xsd:unsignedByte', function () {
            // https://www.w3.org/TR/xmlschema11-2/#unsignedByte
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-unsignedbyte
            const xsd_unsignedByte = model.unsignedByte;

            test('basic examples', function () {
                expect(new xsd_unsignedByte('255').valueOf()).toBe(255);
                expect(new xsd_unsignedByte('0').valueOf()).toBe(0);
                expect(new xsd_unsignedByte('+0000000000000000000005').valueOf()).toBe(5);
                expect(new xsd_unsignedByte('1').valueOf()).toBe(1);
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new xsd_unsignedByte('-1')).toThrow();
                expect(() => new xsd_unsignedByte('1.')).toThrow();

                expect(() => new xsd_unsignedByte(-123)).toThrow();
                expect(() => new xsd_unsignedByte(true)).toThrow();
                expect(() => new xsd_unsignedByte('Hello World!')).toThrow();
                expect(() => new xsd_unsignedByte(256)).toThrow();
            }); // test('negative examples')

            test('native values', function () {
                expect(new xsd_unsignedByte(42).valueOf()).toBe(42);
                expect(new xsd_unsignedByte(0).valueOf()).toBe(0);
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:unsignedByte')

        describe('xsd:yearMonthDuration', function () {
            // https://www.w3.org/TR/xmlschema11-2/#yearMonthDuration
            const xsd_yearMonthDuration = model.yearMonthDuration;

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:yearMonthDuration')

        describe('xsd:dayTimeDuration', function () {
            // https://www.w3.org/TR/xmlschema11-2/#dayTimeDuration
            const xsd_dayTimeDuration = model.dayTimeDuration;

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:dayTimeDuration')

        describe('xsd:dateTimeStamp', function () {
            // https://www.w3.org/TR/xmlschema11-2/#dateTimeStamp
            const xsd_dateTimeStamp = model.dateTimeStamp;

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:dateTimeStamp')

    }); // describe('other datatypes')

});
