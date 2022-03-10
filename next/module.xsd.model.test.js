const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    {inspect}        = require('util'),
    logValue         = value => console.log(inspect(value, false, null, true)),
    model            = require('./module.xsd.model.js');

describe('next/module.xsd/model', function () {

    test('DEVELOP', function () {

        this.skip();
        console.log(model);

    });

    describe('primitive datatypes', function () {

        describe('xsd:string', function () {
            // https://www.w3.org/TR/xmlschema11-2/#string
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-string

            test('basic examples', function () {
                expect(new model.string('\r\n  Auf den\r\n  Hund gekommen\r\n').valueOf())
                    .toBe('\r\n  Auf den\r\n  Hund gekommen\r\n');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new model.string()).toThrow();
                expect(() => new model.string(null)).toThrow();
            }); // test('negative examples')

            test('object model', function () {
                expect(new model.string('  Hello  World! \n Lorem Ipsum  ')).toMatchObject({
                    value: '  Hello  World! \n Lorem Ipsum  '
                });
                expect(new model.string(false)).toMatchObject({
                    value: 'false'
                });
                expect(new model.string(123.456)).toMatchObject({
                    value: '123.456'
                });
                expect(new model.string({toString: () => 'Hello World!'})).toMatchObject({
                    value: 'Hello World!'
                });
                expect(new model.string({})).toMatchObject({
                    value: '[object Object]'
                });
            }); // test('object model')

            test('json serialization', function () {
                expect(new model.string(123456).toJSON()).toEqual({
                    '@type':  'xsd:string',
                    '@value': '123456'
                });
            }); // test('json serialization')

        }); // describe('xsd:string')

        describe('xsd:boolean', function () {
            // https://www.w3.org/TR/xmlschema11-2/#boolean
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-boolean

            test('basic examples', function () {
                expect(new model.boolean('true').valueOf()).toBe(true);
                expect(new model.boolean('1').valueOf()).toBe(true);
                expect(new model.boolean('false').valueOf()).toBe(false);
                expect(new model.boolean('0').valueOf()).toBe(false);
            }); // test('basic examples')

            test('native values', function () {
                expect(new model.boolean(true).valueOf()).toBe(true);
                expect(new model.boolean(1).valueOf()).toBe(true);
                expect(new model.boolean(false).valueOf()).toBe(false);
                expect(new model.boolean(0).valueOf()).toBe(false);
            }); // test('native values')

            test('negative examples', function () {
                expect(() => new model.boolean('vrai')).toThrow();
                expect(() => new model.boolean('faux')).toThrow();
                expect(() => new model.boolean('wahr')).toThrow();
                expect(() => new model.boolean('falsch')).toThrow();

                expect(() => new model.boolean()).toThrow();
                expect(() => new model.boolean('Hello World!')).toThrow();
                expect(() => new model.boolean(42)).toThrow();
                expect(() => new model.boolean(new Date())).toThrow();
            }); // test('negative examples')

            test('object model', function () {
                expect(new model.boolean('false')).toMatchObject({
                    value: 'false'
                });
                expect(new model.boolean('1')).toMatchObject({
                    value: 'true'
                });
                expect(new model.boolean(0)).toMatchObject({
                    value: 'false'
                });
                expect(new model.boolean(true)).toMatchObject({
                    value: 'true'
                });
            }); // test('object model')

            test('json serialization', function () {
                expect(new model.boolean(false).toJSON()).toEqual({
                    '@type':  'xsd:boolean',
                    '@value': 'false'
                });
            }); // test('json serialization')

        }); // describe('xsd:boolean')

        describe('xsd:decimal', function () {
            // https://www.w3.org/TR/xmlschema11-2/#decimal
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-decimal

            test('basic examples', function () {
                expect(new model.decimal('123.456').valueOf()).toBe(123.456);
                expect(new model.decimal('+1234.456').valueOf()).toBe(1234.456);
                expect(new model.decimal('-1234.456').valueOf()).toBe(-1234.456);
                expect(new model.decimal('-.456').valueOf()).toBe(-.456);
                expect(new model.decimal('-456').valueOf()).toBe(-456);
            }); // test('basic examples')

            test('native values', function () {
                expect(new model.decimal(42).valueOf()).toBe(42);
                expect(new model.decimal(123.456).valueOf()).toBe(123.456);
                expect(new model.decimal(.1337).valueOf()).toBe(.1337);
            });

            test('negative examples', function () {
                expect(() => new model.decimal('1 234.456')).toThrow(); // spaces are invalid
                expect(() => new model.decimal('1234.456E+2')).toThrow(); // exponent notation is invalid
                expect(() => new model.decimal('+ 1234.456')).toThrow(); // spaces are invalid
                expect(() => new model.decimal('+1,234.456')).toThrow(); // thousands separator are invalid

                expect(() => new model.decimal('INF')).toThrow();
                expect(() => new model.decimal(-Infinity)).toThrow();
                expect(() => new model.decimal(NaN)).toThrow();
                expect(() => new model.decimal(true)).toThrow();
                expect(() => new model.decimal('Hello World!')).toThrow();
                expect(() => new model.decimal('x 100')).toThrow();
                expect(() => new model.decimal('100x')).toThrow();
            }); // test('negative examples')

            test('object model', function () {
                expect(new model.decimal('123.456')).toMatchObject({
                    value:    '123.456',
                    sign:     '+',
                    integer:  '123',
                    fraction: '456'
                });
                expect(new model.decimal('   -000123.456000   ')).toMatchObject({
                    value:    '-123.456',
                    sign:     '-',
                    integer:  '123',
                    fraction: '456'
                });
                expect(new model.decimal('   -00012300   ')).toMatchObject({
                    value:    '-12300',
                    sign:     '-',
                    integer:  '12300',
                    fraction: '0'
                });
                expect(new model.decimal('.456000')).toMatchObject({
                    value:    '0.456',
                    sign:     '+',
                    integer:  '0',
                    fraction: '456'
                });
                expect(new model.decimal(-123.456)).toMatchObject({
                    value: '-123.456'
                });
                expect(new model.decimal(1e100 + 1.1)).toMatchObject({
                    value: '1'.padEnd(101, '0')
                });
            }); // test('object model')

            test('json serialization', function () {
                expect(new model.decimal('+100').toJSON()).toEqual({
                    '@type':  'xsd:decimal',
                    '@value': '100'
                });
            }); // test('json serialization')

        }); // describe('xsd:decimal')

        describe('xsd:float', function () {
            // https://www.w3.org/TR/xmlschema11-2/#float
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-float

            test('basic examples', function () {
                expect(new model.float('123.456').valueOf()).toBeCloseTo(123.456);
                expect(new model.float('+1234.456').valueOf()).toBeCloseTo(1234.456);
                expect(new model.float('-1.2344e56').valueOf()).toBe(-Infinity);
                expect(new model.float('-.45E-6').valueOf()).toBeCloseTo(-.45E-6);
                expect(new model.float('INF').valueOf()).toBe(Infinity);
                expect(new model.float('-INF').valueOf()).toBe(-Infinity);
                expect(new model.float('NaN').valueOf()).toBe(NaN);
            }); // test('basic examples')

            test('native values', function () {
                expect(new model.float(42).valueOf()).toBeCloseTo(42);
                expect(new model.float(.1337).valueOf()).toBeCloseTo(.1337);
                expect(new model.float(-Infinity).valueOf()).toBe(-Infinity);
            }); // test('native values')

            test('negative examples', function () {
                expect(() => new model.float('1234.4E 56')).toThrow(); // spaces are invalid
                expect(() => new model.float('1E+2.5')).toThrow(); // exponent must be an integer
                // expect(() => new model.float('+INF')).toThrow(); // positive infinity must not be signed
                expect(() => new model.float('NAN')).toThrow(); // special values are case-sensitive

                expect(() => new model.float('Infinity')).toThrow();
                expect(() => new model.float('nan')).toThrow();
                expect(() => new model.float(true)).toThrow();
                expect(() => new model.float('Hello World!')).toThrow();
                expect(() => new model.float('x 100')).toThrow();
                expect(() => new model.float('100x')).toThrow();
            }); // test('negative examples')

            test('object model', function () {
                expect(new model.float('123.456')).toMatchObject({
                    value:    '123.45600128173828',
                    NaN:      false,
                    infinite: false,
                    sign:     '+',
                    decimal:  '123.45600128173828',
                    expSign:  '',
                    exponent: ''
                });
                expect(new model.float('   -000123.456000e+1   ')).toMatchObject({
                    value:    '-123.456005859375e+1',
                    NaN:      false,
                    infinite: false,
                    sign:     '-',
                    decimal:  '123.456005859375',
                    expSign:  '+',
                    exponent: '1'
                });
                expect(new model.float('   -00012300   ')).toMatchObject({
                    value:    '-12300',
                    NaN:      false,
                    infinite: false,
                    sign:     '-',
                    decimal:  '12300',
                    expSign:  '',
                    exponent: ''
                });
                expect(new model.float('.456000')).toMatchObject({
                    value:    '0.4560000002384186',
                    NaN:      false,
                    infinite: false,
                    sign:     '+',
                    decimal:  '0.4560000002384186',
                    expSign:  '',
                    exponent: ''
                });
                expect(new model.float('INF')).toMatchObject({
                    value:    'INF',
                    NaN:      false,
                    infinite: true,
                    sign:     '+'
                });
                expect(new model.float('NaN')).toMatchObject({
                    value:    'NaN',
                    NaN:      true,
                    infinite: false,
                    sign:     ''
                });
                expect(new model.float(-123.456)).toMatchObject({
                    value: '-123.45600128173828'
                });
                expect(new model.float(1e100 + 1.1)).toMatchObject({
                    value: 'INF'
                });
                expect(new model.float(1e1000)).toMatchObject({
                    value: 'INF'
                });
                expect(new model.float('1e1000')).toMatchObject({
                    value: 'INF'
                });
                expect(new model.float(-Infinity)).toMatchObject({
                    value:    '-INF',
                    infinite: true,
                    sign:     '-'
                });
            }); // test('object model')

            test('json serialization', function () {
                expect(new model.float('+100').toJSON()).toEqual({
                    '@type':  'xsd:float',
                    '@value': '100'
                });
            }); // test('json serialization')

        }); // describe('xsd:float')

        describe('xsd:double', function () {
            // https://www.w3.org/TR/xmlschema11-2/#double
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-double

            test('basic examples', function () {
                expect(new model.double('123.456').valueOf()).toBeCloseTo(123.456);
                expect(new model.double('+1234.456').valueOf()).toBeCloseTo(1234.456);
                expect(new model.double('-1.2344e56').valueOf()).toBeCloseTo(-1.2344e56);
                expect(new model.double('-.45E-6').valueOf()).toBeCloseTo(-.45E-6);
                expect(new model.double('INF').valueOf()).toBe(Infinity);
                expect(new model.double('-INF').valueOf()).toBe(-Infinity);
                expect(new model.double('NaN').valueOf()).toBe(NaN);
            }); // test('basic examples')

            test('native values', function () {
                expect(new model.double(42).valueOf()).toBeCloseTo(42);
                expect(new model.double(.1337).valueOf()).toBeCloseTo(.1337);
                expect(new model.double(-Infinity).valueOf()).toBe(-Infinity);
            }); // test('native values')

            test('negative examples', function () {
                expect(() => new model.double('1234.4E 56')).toThrow(); // spaces are invalid
                expect(() => new model.double('1E+2.5')).toThrow(); // exponent must be an integer
                // expect(() => new model.double('+INF')).toThrow(); // positive infinity must not be signed
                expect(() => new model.double('NAN')).toThrow(); // special values are case-sensitive

                expect(() => new model.double('Infinity')).toThrow();
                expect(() => new model.double('nan')).toThrow();
                expect(() => new model.double(true)).toThrow();
                expect(() => new model.double('Hello World!')).toThrow();
                expect(() => new model.double('x 100')).toThrow();
                expect(() => new model.double('100x')).toThrow();
            }); // test('negative examples')

            test('object model', function () {
                expect(new model.double('123.456')).toMatchObject({
                    value:    '123.456',
                    NaN:      false,
                    infinite: false,
                    sign:     '+',
                    decimal:  '123.456',
                    expSign:  '',
                    exponent: ''
                });
                expect(new model.double('   -000123.456000e+1   ')).toMatchObject({
                    value:    '-123.456e+1',
                    NaN:      false,
                    infinite: false,
                    sign:     '-',
                    decimal:  '123.456',
                    expSign:  '+',
                    exponent: '1'
                });
                expect(new model.double('   -00012300   ')).toMatchObject({
                    value:    '-12300',
                    NaN:      false,
                    infinite: false,
                    sign:     '-',
                    decimal:  '12300',
                    expSign:  '',
                    exponent: ''
                });
                expect(new model.double('.456000')).toMatchObject({
                    value:    '0.456',
                    NaN:      false,
                    infinite: false,
                    sign:     '+',
                    decimal:  '0.456',
                    expSign:  '',
                    exponent: ''
                });
                expect(new model.double('INF')).toMatchObject({
                    value:    'INF',
                    NaN:      false,
                    infinite: true,
                    sign:     '+'
                });
                expect(new model.double('NaN')).toMatchObject({
                    value:    'NaN',
                    NaN:      true,
                    infinite: false,
                    sign:     ''
                });
                expect(new model.double(-123.456)).toMatchObject({
                    value: '-123.456'
                });
                expect(new model.double(1e100 + 1.1)).toMatchObject({
                    value: '1e+100'
                });
                expect(new model.double(1e1000)).toMatchObject({
                    value: 'INF'
                });
                expect(new model.double('1e1000')).toMatchObject({
                    value: 'INF'
                });
                expect(new model.double(-Infinity)).toMatchObject({
                    value:    '-INF',
                    infinite: true,
                    sign:     '-'
                });
            }); // test('object model')

            test('json serialization', function () {
                expect(new model.double('+100').toJSON()).toEqual({
                    '@type':  'xsd:double',
                    '@value': '100'
                });
            }); // test('json serialization')

        }); // describe('xsd:double')

        describe('xsd:duration', function () {
            // https://www.w3.org/TR/xmlschema11-2/#duration
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-duration

            test('basic examples', function () {
                expect(new model.duration('PT1004199059S').valueOf()).toBe('PT1004199059S');
                expect(new model.duration('PT130S').valueOf()).toBe('PT130S');
                expect(new model.duration('PT2M10S').valueOf()).toBe('PT2M10S');
                expect(new model.duration('P1DT2S').valueOf()).toBe('P1DT2S');
                expect(new model.duration('-P1Y').valueOf()).toBe('-P1Y');
                expect(new model.duration('P1Y2M3DT5H20M30.123S').valueOf()).toBe('P1Y2M3DT5H20M30.123S');
            }); // test('basic examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('negative examples', function () {
                this.skip(); // TODO
                expect(() => new model.duration('1Y')).toThrow(); // missing leading P
                expect(() => new model.duration('P1S')).toThrow(); // missing divider T
                expect(() => new model.duration('P-1Y')).toThrow(); // all parts must be positive
                expect(() => new model.duration('P1M2Y')).toThrow(); // invalid order
                expect(() => new model.duration('P1Y-1M')).toThrow(); // all parts must be positive
            }); // test('negative examples')

            test('object model', function () {
                expect(new model.duration('PT1004199059S')).toMatchObject({
                    value:   'PT1004199059S',
                    sign:    '+',
                    seconds: 1004199059
                });
                expect(new model.duration('PT130S')).toMatchObject({
                    value:   'PT130S',
                    sign:    '+',
                    seconds: 130
                });
                expect(new model.duration('PT2M10S')).toMatchObject({
                    value:   'PT2M10S',
                    sign:    '+',
                    minutes: 2,
                    seconds: 10
                });
                expect(new model.duration('P1DT2S')).toMatchObject({
                    value:   'P1DT2S',
                    sign:    '+',
                    days:    1,
                    seconds: 2
                });
                expect(new model.duration('-P1Y')).toMatchObject({
                    value: '-P1Y',
                    sign:  '-',
                    years: 1
                });
                expect(new model.duration('P1Y2M3DT5H20M30.123S')).toMatchObject({
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
                expect(new model.duration('PT1.1S')).toMatchObject({
                    value:        'PT1.1S',
                    sign:         '+',
                    seconds:      1,
                    milliseconds: 100
                });
            }); // test('object model')

            test('json serialization', function () {
                expect(new model.duration('PT1004199059S').toJSON()).toEqual({
                    '@type':  'xsd:duration',
                    '@value': 'PT1004199059S'
                });
            }); // test('json serialization')

        }); // describe('xsd:duration')

        describe('xsd:dateTime', function () {
            // https://www.w3.org/TR/xmlschema11-2/#dateTime
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-datetime

            test('basic examples', function () {
                expect(new model.dateTime('2001-10-26T21:32:52').valueOf()).toBe('2001-10-26T21:32:52');
                expect(new model.dateTime('2001-10-26T21:32:52+02:00').valueOf()).toBe('2001-10-26T21:32:52+02:00');
                expect(new model.dateTime('2001-10-26T19:32:52Z').valueOf()).toBe('2001-10-26T19:32:52Z');
                expect(new model.dateTime('2001-10-26T19:32:52+00:00').valueOf()).toBe('2001-10-26T19:32:52+00:00');
                expect(new model.dateTime('-2001-10-26T21:32:52').valueOf()).toBe('-2001-10-26T21:32:52');
                expect(new model.dateTime('2001-10-26T21:32:52.12679').valueOf()).toBe('2001-10-26T21:32:52.12679');
            }); // test('basic examples')

            test('native values', function () {
                const currentDate = new Date();
                expect(new model.dateTime(currentDate).valueOf()).toBe(currentDate.toISOString());
            }); // test('native values')

            test('negative examples', function () {
                expect(() => new model.dateTime('2001-10-26')).toThrow(); // all parts are required
                expect(() => new model.dateTime('2001-10-26T21:32')).toThrow(); // all parts are required
                expect(() => new model.dateTime('2001-10-26T25:32:52+02:00')).toThrow(); // hour is out of range
                expect(() => new model.dateTime('01-10-26T21:32')).toThrow(); // all parts are required
            }); // test('negative examples')

            test('object model', function () {
                expect(new model.dateTime('2001-10-26T21:32:52')).toMatchObject({
                    value:  '2001-10-26T21:32:52',
                    year:   2001,
                    month:  10,
                    day:    26,
                    hour:   21,
                    minute: 32,
                    second: 52,
                    utc:    false
                });
                expect(new model.dateTime('2001-10-26T21:32:52+02:00')).toMatchObject({
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
                expect(new model.dateTime('2001-10-26T19:32:52Z')).toMatchObject({
                    value:  '2001-10-26T19:32:52Z',
                    year:   2001,
                    month:  10,
                    day:    26,
                    hour:   19,
                    minute: 32,
                    second: 52,
                    utc:    true
                });
                expect(new model.dateTime('2001-10-26T19:32:52+00:00')).toMatchObject({
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
                expect(new model.dateTime('-2001-10-26T21:32:52')).toMatchObject({
                    value:  '-2001-10-26T21:32:52',
                    year:   -2001,
                    month:  10,
                    day:    26,
                    hour:   21,
                    minute: 32,
                    second: 52,
                    utc:    false
                });
                expect(new model.dateTime('2001-10-26T21:32:52.12679')).toMatchObject({
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
                expect(new model.dateTime('2001-10-26T21:32:52.12679').toJSON()).toEqual({
                    '@type':  'xsd:dateTime',
                    '@value': '2001-10-26T21:32:52.12679'
                });
            }); // test('json serialization')

        }); // describe('xsd:dateTime')

        describe('xsd:time', function () {
            // https://www.w3.org/TR/xmlschema11-2/#time
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-time

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

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

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

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

        }); // describe('xsd:gYearMonth')

        describe('xsd:gYear', function () {
            // https://www.w3.org/TR/xmlschema11-2/#gYear
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gyear

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

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

        }); // describe('xsd:gMonthDay')

        describe('xsd:gDay', function () {
            // https://www.w3.org/TR/xmlschema11-2/#gDay
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gday

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

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

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

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

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

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

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

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

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

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

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

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

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

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

            test('basic examples', function () {
                expect(new model.normalizedString('\r\n  Auf den\r\n  Hund gekommen\r\n').valueOf()).toBe('    Auf den    Hund gekommen  ');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => model.normalizedString()).toThrow();
                expect(() => model.normalizedString(null)).toThrow();
            }); // test('negative examples')

            test('object model', function () {
                expect(new model.normalizedString('  Hello  World! \n Lorem Ipsum  ')).toMatchObject({
                    value: '  Hello  World!   Lorem Ipsum  '
                });
                expect(new model.normalizedString(' \t\t \r\n ')).toMatchObject({
                    value: '       '
                });
                expect(new model.normalizedString(1e3)).toMatchObject({
                    value: '1000'
                });
                expect(new model.normalizedString({'lorem': 'ipsum'})).toMatchObject({
                    value: '[object Object]'
                });
            }); // test('object model')

            test('json serialization', function () {
                expect(new model.normalizedString('\t\tHello World!\r\n').toJSON()).toEqual({
                    '@type':  'xsd:normalizedString',
                    '@value': '  Hello World!  '
                });
            }); // test('json serialization')

        }); // describe('xsd:normalizedString')

        describe('xsd:token', function () {
            // https://www.w3.org/TR/xmlschema11-2/#token
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-token

            test('basic examples', function () {
                expect(new model.token('\r\n  Auf den\r\n  Hund gekommen\r\n').valueOf()).toBe('Auf den Hund gekommen');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => model.token()).toThrow();
                expect(() => model.token(null)).toThrow();
            }); // test('negative examples')

            test('object model', function () {
                expect(new model.token('  Hello  World! \n Lorem Ipsum  ')).toMatchObject({
                    value: 'Hello World! Lorem Ipsum'
                });
                expect(new model.token(' \t\t \r\n ')).toMatchObject({
                    value: ''
                });
            }); // test('object model')

            test('json serialization', function () {
                expect(new model.token({toString: () => '\t\tHello World!\r\n'}).toJSON()).toEqual({
                    '@type':  'xsd:token',
                    '@value': 'Hello World!'
                });
            }); // test('json serialization')

        }); // describe('xsd:token')

        describe('xsd:language', function () {
            // https://www.w3.org/TR/xmlschema11-2/#language
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-language

            test('basic examples', function () {
                expect(new model.language('en').valueOf()).toBe('en');
                expect(new model.language('en-US').valueOf()).toBe('en-US');
                expect(new model.language('de').valueOf()).toBe('de');
                expect(new model.language('de-DE').valueOf()).toBe('de-DE');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new model.language('Hello World!')).toThrow();

                expect(() => new model.language(true)).toThrow();
                expect(() => new model.language(1e3)).toThrow();
                expect(() => new model.language()).toThrow();
                expect(() => new model.language({'lorem': 'ipsum'})).toThrow();
                expect(() => new model.language(null)).toThrow();
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

            test('basic examples', function () {
                expect(new model.NMTOKEN('Snoopy').valueOf()).toBe('Snoopy');
                expect(new model.NMTOKEN('CMS').valueOf()).toBe('CMS');
                expect(new model.NMTOKEN('1950-10-04').valueOf()).toBe('1950-10-04');
                expect(new model.NMTOKEN('0836217462').valueOf()).toBe('0836217462');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new model.NMTOKEN('brachte die klassische Musik in die Peanuts-Comics ein')).toThrow(); // spaces are invalid
                expect(() => new model.NMTOKEN('kühn,dreist')).toThrow(); // commas are invalid

                expect(() => new model.NMTOKEN(true)).toThrow();
                expect(() => new model.NMTOKEN(1e3)).toThrow();
                expect(() => new model.NMTOKEN()).toThrow();
                expect(() => new model.NMTOKEN({'lorem': 'ipsum'})).toThrow();
                expect(() => new model.NMTOKEN(null)).toThrow();
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

            test('basic examples', function () {
                expect(new model.NMTOKENS('Snoopy').valueOf()).toMatchObject(['Snoopy']);
                expect(new model.NMTOKENS('CMS').valueOf()).toMatchObject(['CMS']);
                expect(new model.NMTOKENS('1950-10-04').valueOf()).toMatchObject(['1950-10-04']);
                expect(new model.NMTOKENS('0836217462 0836217463').valueOf()).toMatchObject(['0836217462', '0836217463']);
                expect(new model.NMTOKENS('brachte die klassische Musik in die Peanuts-Comics ein').valueOf())
                    .toMatchObject(['brachte', 'die', 'klassische', 'Musik', 'in', 'die', 'Peanuts-Comics', 'ein']);
            }); // test('basic examples')

            test('native values', function () {
                expect(new model.NMTOKENS(['0836217462', '0836217463']).valueOf()).toMatchObject(['0836217462', '0836217463']);
            }); // test('native values')

            test('negative examples', function () {
                expect(() => new model.NMTOKENS('brachte die klassische Musik in die "Peanuts"-Comics ein')).toThrow(); // quotations are invalid
                expect(() => new model.NMTOKENS('kühn,dreist')).toThrow(); // commas are invalid

                expect(() => new model.NMTOKENS(true)).toThrow();
                expect(() => new model.NMTOKENS(1e3)).toThrow();
                expect(() => new model.NMTOKENS()).toThrow();
                expect(() => new model.NMTOKENS({'lorem': 'ipsum'})).toThrow();
                expect(() => new model.NMTOKENS(null)).toThrow();
            }); // test('negative examples')

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

            test('basic examples', function () {
                expect(new model.Name('Snoopy').valueOf()).toBe('Snoopy');
                expect(new model.Name('CMS').valueOf()).toBe('CMS');
                expect(new model.Name('_1950-10-04_10:00').valueOf()).toBe('_1950-10-04_10:00');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new model.Name('0836217462')).toThrow(); // must not begin with a number
                expect(() => new model.Name('kühn,dreist')).toThrow(); // commas are invalid

                expect(() => new model.Name(true)).toThrow();
                expect(() => new model.Name(1e3)).toThrow();
                expect(() => new model.Name()).toThrow();
                expect(() => new model.Name({'lorem': 'ipsum'})).toThrow();
                expect(() => new model.Name(null)).toThrow();
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

            test('basic examples', function () {
                expect(new model.NCName('Snoopy').valueOf()).toBe('Snoopy');
                expect(new model.NCName('CMS').valueOf()).toBe('CMS');
                expect(new model.NCName('_1950-10-04_10-00').valueOf()).toBe('_1950-10-04_10-00');
                expect(new model.NCName('kühn_dreist').valueOf()).toBe('kühn_dreist');
            }); // test('basic examples')

            test('negative examples', function () {
                expect(() => new model.NCName('_1950-10-04:10-00')).toThrow(); // colons are invalid
                expect(() => new model.NCName('kühn:dreist')).toThrow(); // colons are invalid

                expect(() => new model.NCName(true)).toThrow();
                expect(() => new model.NCName(1e3)).toThrow();
                expect(() => new model.NCName()).toThrow();
                expect(() => new model.NCName({'lorem': 'ipsum'})).toThrow();
                expect(() => new model.NCName(null)).toThrow();
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

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

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

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

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

            test('basic examples', function () {
                expect(new model.integer('-123456789012345678901234567890').valueOf()).toBe(-123456789012345678901234567890);
                expect(new model.integer('2147483647').valueOf()).toBe(2147483647);
                expect(new model.integer('0').valueOf()).toBe(0);
                expect(new model.integer('-0000000000000000000005').valueOf()).toBe(-5);
            }); // test('basic examples')

            test('native values', function () {
                expect(new model.integer(42).valueOf()).toBe(42);
                expect(new model.integer(-123).valueOf()).toBe(-123);
                expect(new model.integer(0).valueOf()).toBe(0);
            }); // test('native values')

            test('negative examples', function () {
                expect(() => new model.integer('1.')).toThrow();
                expect(() => new model.integer('2.6')).toThrow();
                expect(() => new model.integer('A')).toThrow();

                expect(() => new model.integer(true)).toThrow();
                expect(() => new model.integer('Hello World!')).toThrow();
            }); // test('negative examples')

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

            test('basic examples', function () {
                expect(new model.nonPositiveInteger('-123456789012345678901234567890').valueOf()).toBe(-123456789012345678901234567890);
                expect(new model.nonPositiveInteger('0').valueOf()).toBe(0);
                expect(new model.nonPositiveInteger('-0000000000000000000005').valueOf()).toBe(-5);
                expect(new model.nonPositiveInteger('-2147483647').valueOf()).toBe(-2147483647);
            }); // test('basic examples')

            test('native values', function () {
                expect(new model.nonPositiveInteger(-123).valueOf()).toBe(-123);
                expect(new model.nonPositiveInteger(0).valueOf()).toBe(0);
            }); // test('native values')

            test('negative examples', function () {
                expect(() => new model.nonPositiveInteger('-1.')).toThrow();
                expect(() => new model.nonPositiveInteger('1.')).toThrow();

                expect(() => new model.nonPositiveInteger(42)).toThrow();
                expect(() => new model.nonPositiveInteger(true)).toThrow();
                expect(() => new model.nonPositiveInteger('Hello World!')).toThrow();
            }); // test('negative examples')

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

            test('basic examples', function () {
                expect(new model.negativeInteger('-123456789012345678901234567890').valueOf()).toBe(-123456789012345678901234567890);
                expect(new model.negativeInteger('-1').valueOf()).toBe(-1);
                expect(new model.negativeInteger('-0000000000000000000005').valueOf()).toBe(-5);
            }); // test('basic examples')

            test('native values', function () {
                expect(new model.negativeInteger(-123).valueOf()).toBe(-123);
            }); // test('native values')

            test('negative examples', function () {
                expect(() => new model.negativeInteger('0')).toThrow();
                expect(() => new model.negativeInteger('-1.')).toThrow();

                expect(() => new model.negativeInteger(0)).toThrow();
                expect(() => new model.negativeInteger(42)).toThrow();
                expect(() => new model.negativeInteger(true)).toThrow();
                expect(() => new model.negativeInteger('Hello World!')).toThrow();
            }); // test('negative examples')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:negativeInteger')

        describe('xsd:long', function () {
            // https://www.w3.org/TR/xmlschema11-2/#long
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-long

            test('basic examples', function () {
                expect(new model.long('-9223372036854775808').valueOf()).toBe(-9223372036854775808);
                expect(new model.long('0').valueOf()).toBe(0);
                expect(new model.long('-0000000000000000000005').valueOf()).toBe(-5);
                expect(new model.long('9223372036854775807').valueOf()).toBe(9223372036854775807);
            }); // test('basic examples')

            test('native values', function () {
                expect(new model.long(42).valueOf()).toBe(42);
                expect(new model.long(-123).valueOf()).toBe(-123);
                expect(new model.long(0).valueOf()).toBe(0);
            }); // test('native values')

            test('negative examples', function () {
                expect(() => new model.long('9223372036854775808')).toThrow();
                expect(() => new model.long('1.')).toThrow();

                expect(() => new model.long(true)).toThrow();
                expect(() => new model.long('Hello World!')).toThrow();
                expect(() => new model.long(9223372036854775808)).toThrow();
            }); // test('negative examples')

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

            test('basic examples', function () {
                expect(new model.int('-2147483648').valueOf()).toBe(-2147483648);
                expect(new model.int('0').valueOf()).toBe(0);
                expect(new model.int('-0000000000000000000005').valueOf()).toBe(-5);
                expect(new model.int('2147483647').valueOf()).toBe(2147483647);
            }); // test('basic examples')

            test('native values', function () {
                expect(new model.int(42).valueOf()).toBe(42);
                expect(new model.int(-123).valueOf()).toBe(-123);
                expect(new model.int(0).valueOf()).toBe(0);
            }); // test('native values')

            test('negative examples', function () {
                expect(() => new model.int('-2147483649')).toThrow();
                expect(() => new model.int('100000000000')).toThrow();

                expect(() => new model.int(true)).toThrow();
                expect(() => new model.int('Hello World!')).toThrow();
                expect(() => new model.int(2147483648)).toThrow();
            }); // test('negative examples')

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

            test('basic examples', function () {
                expect(new model.short('-32768').valueOf()).toBe(-32768);
                expect(new model.short('0').valueOf()).toBe(0);
                expect(new model.short('-0000000000000000000005').valueOf()).toBe(-5);
                expect(new model.short('32767').valueOf()).toBe(32767);
            }); // test('basic examples')

            test('native values', function () {
                expect(new model.short(42).valueOf()).toBe(42);
                expect(new model.short(-123).valueOf()).toBe(-123);
                expect(new model.short(0).valueOf()).toBe(0);
            }); // test('native values')

            test('negative examples', function () {
                expect(() => new model.short('32768')).toThrow();
                expect(() => new model.short('1.')).toThrow();

                expect(() => new model.short(true)).toThrow();
                expect(() => new model.short('Hello World!')).toThrow();
                expect(() => new model.short(32768)).toThrow();
            }); // test('negative examples')

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

            test('basic examples', function () {
                expect(new model.byte('27').valueOf()).toBe(27);
                expect(new model.byte('-34').valueOf()).toBe(-34);
                expect(new model.byte('+105').valueOf()).toBe(105);
                expect(new model.byte('0').valueOf()).toBe(0);
            }); // test('basic examples')

            test('native values', function () {
                expect(new model.byte(42).valueOf()).toBe(42);
                expect(new model.byte(-123).valueOf()).toBe(-123);
                expect(new model.byte(0).valueOf()).toBe(0);
            }); // test('native values')

            test('negative examples', function () {
                expect(() => new model.byte('0A')).toThrow();
                expect(() => new model.byte('1524')).toThrow();
                expect(() => new model.byte('INF')).toThrow();

                expect(() => new model.byte(true)).toThrow();
                expect(() => new model.byte('Hello World!')).toThrow();
                expect(() => new model.byte(128)).toThrow();
            }); // test('negative examples')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:byte')

        describe('xsd:nonNegativeInteger', function () {
            // https://www.w3.org/TR/xmlschema11-2/#nonNegativeInteger
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-nonnegativeinteger

            test('basic examples', function () {
                expect(new model.nonNegativeInteger('+123456789012345678901234567890').valueOf()).toBe(123456789012345678901234567890);
                expect(new model.nonNegativeInteger('0').valueOf()).toBe(0);
                expect(new model.nonNegativeInteger('0000000000000000000005').valueOf()).toBe(5);
                expect(new model.nonNegativeInteger('2147483647').valueOf()).toBe(2147483647);
            }); // test('basic examples')

            test('native values', function () {
                expect(new model.nonNegativeInteger(42).valueOf()).toBe(42);
                expect(new model.nonNegativeInteger(0).valueOf()).toBe(0);
            }); // test('native values')

            test('negative examples', function () {
                expect(() => new model.nonNegativeInteger('1.')).toThrow();
                expect(() => new model.nonNegativeInteger('-1.')).toThrow();

                expect(() => new model.nonNegativeInteger(-123)).toThrow();
                expect(() => new model.nonNegativeInteger(true)).toThrow();
                expect(() => new model.nonNegativeInteger('Hello World!')).toThrow();
            }); // test('negative examples')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:nonNegativeInteger')

        describe('xsd:unsignedLong', function () {
            // https://www.w3.org/TR/xmlschema11-2/#unsignedLong
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-unsignedlong

            test('basic examples', function () {
                expect(new model.unsignedLong('18446744073709551615').valueOf()).toBe(18446744073709551615);
                expect(new model.unsignedLong('0').valueOf()).toBe(0);
                expect(new model.unsignedLong('+0000000000000000000005').valueOf()).toBe(5);
                expect(new model.unsignedLong('1').valueOf()).toBe(1);
            }); // test('basic examples')

            test('native values', function () {
                expect(new model.unsignedLong(42).valueOf()).toBe(42);
                expect(new model.unsignedLong(0).valueOf()).toBe(0);
            }); // test('native values')

            test('negative examples', function () {
                expect(() => new model.unsignedLong('-1')).toThrow();
                expect(() => new model.unsignedLong('1.')).toThrow();

                expect(() => new model.unsignedLong(-123)).toThrow();
                expect(() => new model.unsignedLong(true)).toThrow();
                expect(() => new model.unsignedLong('Hello World!')).toThrow();
                expect(() => new model.unsignedLong(18446744073709551616)).toThrow();
            }); // test('negative examples')

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

            test('basic examples', function () {
                expect(new model.unsignedInt('4294967295').valueOf()).toBe(4294967295);
                expect(new model.unsignedInt('0').valueOf()).toBe(0);
                expect(new model.unsignedInt('+0000000000000000000005').valueOf()).toBe(5);
                expect(new model.unsignedInt('1').valueOf()).toBe(1);
            }); // test('basic examples')

            test('native values', function () {
                expect(new model.unsignedInt(42).valueOf()).toBe(42);
                expect(new model.unsignedInt(0).valueOf()).toBe(0);
            }); // test('native values')

            test('negative examples', function () {
                expect(() => new model.unsignedInt('-1')).toThrow();
                expect(() => new model.unsignedInt('1.')).toThrow();

                expect(() => new model.unsignedInt(-123)).toThrow();
                expect(() => new model.unsignedInt(true)).toThrow();
                expect(() => new model.unsignedInt('Hello World!')).toThrow();
                expect(() => new model.unsignedInt(4294967296)).toThrow();
            }); // test('negative examples')

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

            test('basic examples', function () {
                expect(new model.unsignedShort('65535').valueOf()).toBe(65535);
                expect(new model.unsignedShort('0').valueOf()).toBe(0);
                expect(new model.unsignedShort('+0000000000000000000005').valueOf()).toBe(5);
                expect(new model.unsignedShort('1').valueOf()).toBe(1);
            }); // test('basic examples')

            test('native values', function () {
                expect(new model.unsignedShort(42).valueOf()).toBe(42);
                expect(new model.unsignedShort(0).valueOf()).toBe(0);
            }); // test('native values')

            test('negative examples', function () {
                expect(() => new model.unsignedShort('-1')).toThrow();
                expect(() => new model.unsignedShort('1.')).toThrow();

                expect(() => new model.unsignedShort(-123)).toThrow();
                expect(() => new model.unsignedShort(true)).toThrow();
                expect(() => new model.unsignedShort('Hello World!')).toThrow();
                expect(() => new model.unsignedShort(65536)).toThrow();
            }); // test('negative examples')

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

            test('basic examples', function () {
                expect(new model.unsignedByte('255').valueOf()).toBe(255);
                expect(new model.unsignedByte('0').valueOf()).toBe(0);
                expect(new model.unsignedByte('+0000000000000000000005').valueOf()).toBe(5);
                expect(new model.unsignedByte('1').valueOf()).toBe(1);
            }); // test('basic examples')

            test('native values', function () {
                expect(new model.unsignedByte(42).valueOf()).toBe(42);
                expect(new model.unsignedByte(0).valueOf()).toBe(0);
            }); // test('native values')

            test('negative examples', function () {
                expect(() => new model.unsignedByte('-1')).toThrow();
                expect(() => new model.unsignedByte('1.')).toThrow();

                expect(() => new model.unsignedByte(-123)).toThrow();
                expect(() => new model.unsignedByte(true)).toThrow();
                expect(() => new model.unsignedByte('Hello World!')).toThrow();
                expect(() => new model.unsignedByte(256)).toThrow();
            }); // test('negative examples')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:unsignedByte')

        describe('xsd:positiveInteger', function () {
            // https://www.w3.org/TR/xmlschema11-2/#positiveInteger
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-positiveinteger

            test('basic examples', function () {
                expect(new model.positiveInteger('123456789012345678901234567890').valueOf()).toBe(123456789012345678901234567890);
                expect(new model.positiveInteger('1').valueOf()).toBe(1);
                expect(new model.positiveInteger('0000000000000000000005').valueOf()).toBe(5);
            }); // test('basic examples')

            test('native values', function () {
                expect(new model.positiveInteger(42).valueOf()).toBe(42);
            }); // test('native values')

            test('negative examples', function () {
                expect(() => new model.positiveInteger('0')).toThrow();
                expect(() => new model.positiveInteger('1.')).toThrow();

                expect(() => new model.positiveInteger(0)).toThrow();
                expect(() => new model.positiveInteger(-123)).toThrow();
                expect(() => new model.positiveInteger(true)).toThrow();
                expect(() => new model.positiveInteger('Hello World!')).toThrow();
            }); // test('negative examples')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:positiveInteger')

        describe('xsd:yearMonthDuration', function () {
            // https://www.w3.org/TR/xmlschema11-2/#yearMonthDuration

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:yearMonthDuration')

        describe('xsd:dayTimeDuration', function () {
            // https://www.w3.org/TR/xmlschema11-2/#dayTimeDuration

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:dayTimeDuration')

        describe('xsd:dateTimeStamp', function () {
            // https://www.w3.org/TR/xmlschema11-2/#dateTimeStamp

            test('basic examples', function () {
                this.skip(); // TODO
            }); // test('basic examples')

            test('native values', function () {
                this.skip(); // TODO
            }); // test('native values')

            test('negative examples', function () {
                this.skip(); // TODO
            }); // test('negative examples')

            test('object model', function () {
                this.skip(); // TODO
            }); // test('object model')

            test('json serialization', function () {
                this.skip(); // TODO
            }); // test('json serialization')

        }); // describe('xsd:dateTimeStamp')

    }); // describe('other datatypes')

});
