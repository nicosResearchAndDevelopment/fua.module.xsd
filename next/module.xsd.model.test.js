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

        test('xsd:string', function () {
            expect(new model.string('  Hello  World! \n Lorem Ipsum  ')).toMatchObject({
                value: '  Hello  World! \n Lorem Ipsum  '
            });
            expect(() => new model.string()).toThrow();
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
            expect(new model.string(123456).toJSON()).toEqual({
                '@type':  'xsd:string',
                '@value': '123456'
            });
        });

        test('xsd:boolean', function () {
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
            expect(() => new model.boolean()).toThrow();
            expect(() => new model.boolean(2)).toThrow();
            expect(() => new model.boolean('Hello World!')).toThrow();
            expect(new model.boolean(false).toJSON()).toEqual({
                '@type':  'xsd:boolean',
                '@value': 'false'
            });
        });

        test('xsd:decimal', function () {
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
            expect(() => new model.decimal('INF')).toThrow();
            expect(() => new model.decimal(-Infinity)).toThrow();
            expect(() => new model.decimal(NaN)).toThrow();
            expect(() => new model.decimal(true)).toThrow();
            expect(() => new model.decimal('Hello World!')).toThrow();
            expect(() => new model.decimal('x 100')).toThrow();
            expect(() => new model.decimal('100x')).toThrow();
            expect(new model.decimal('+100').toJSON()).toEqual({
                '@type':  'xsd:decimal',
                '@value': '100'
            });
        });

        test('xsd:float', function () {
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
            expect(() => new model.float('Infinity')).toThrow();
            expect(() => new model.float('nan')).toThrow();
            expect(() => new model.float(true)).toThrow();
            expect(() => new model.float('Hello World!')).toThrow();
            expect(() => new model.float('x 100')).toThrow();
            expect(() => new model.float('100x')).toThrow();
            expect(new model.float('+100').toJSON()).toEqual({
                '@type':  'xsd:float',
                '@value': '100'
            });
        });

        test('xsd:double', function () {
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
            expect(() => new model.double('Infinity')).toThrow();
            expect(() => new model.double('nan')).toThrow();
            expect(() => new model.double(true)).toThrow();
            expect(() => new model.double('Hello World!')).toThrow();
            expect(() => new model.double('x 100')).toThrow();
            expect(() => new model.double('100x')).toThrow();
            expect(new model.double('+100').toJSON()).toEqual({
                '@type':  'xsd:double',
                '@value': '100'
            });
        });

        test('xsd:duration', function () {
            this.skip(); // TODO
        });

        test('xsd:dateTime', function () {
            this.skip(); // TODO
        });

        test('xsd:time', function () {
            this.skip(); // TODO
        });

        test('xsd:date', function () {
            this.skip(); // TODO
        });

        test('xsd:gYearMonth', function () {
            this.skip(); // TODO
        });

        test('xsd:gYear', function () {
            this.skip(); // TODO
        });

        test('xsd:gMonthDay', function () {
            this.skip(); // TODO
        });

        test('xsd:gDay', function () {
            this.skip(); // TODO
        });

        test('xsd:gMonth', function () {
            this.skip(); // TODO
        });

        test('xsd:hexBinary', function () {
            this.skip(); // TODO
        });

        test('xsd:base64Binary', function () {
            this.skip(); // TODO
        });

        test('xsd:anyURI'); // TODO

        test('xsd:QName'); // TODO

        test('xsd:NOTATION'); // TODO

    });

    describe('other datatypes', function () {

        test('xsd:normalizedString', function () {
            expect(new model.normalizedString('  Hello  World! \n Lorem Ipsum  ')).toMatchObject({
                value: '  Hello  World!   Lorem Ipsum  '
            });
            expect(new model.normalizedString(' \t\t \r\n ')).toMatchObject({
                value: '       '
            });
            expect(new model.normalizedString('\t\tHello World!\r\n').toJSON()).toEqual({
                '@type':  'xsd:normalizedString',
                '@value': '  Hello World!  '
            });
        });

        test('xsd:token', function () {
            expect(new model.token('  Hello  World! \n Lorem Ipsum  ')).toMatchObject({
                value: 'Hello World! Lorem Ipsum'
            });
            expect(new model.token(' \t\t \r\n ')).toMatchObject({
                value: ''
            });
            expect(new model.token({toString: () => '\t\tHello World!\r\n'}).toJSON()).toEqual({
                '@type':  'xsd:token',
                '@value': 'Hello World!'
            });
        });

        test('xsd:language'); // TODO

        test('xsd:NMTOKEN'); // TODO

        test('xsd:NMTOKENS'); // TODO

        test('xsd:Name'); // TODO

        test('xsd:NCName'); // TODO

        test('xsd:ID'); // TODO

        test('xsd:IDREF'); // TODO

        test('xsd:IDREFS'); // TODO

        test('xsd:ENTITY'); // TODO

        test('xsd:ENTITIES'); // TODO

        test('xsd:integer', function () {
            logValue(new model.integer('123456'));
            // logValue(new model.integer('123456.456'));
            this.skip(); // TODO
        });

        test('xsd:nonPositiveInteger', function () {
            this.skip(); // TODO
        });

        test('xsd:negativeInteger', function () {
            this.skip(); // TODO
        });

        test('xsd:long', function () {
            this.skip(); // TODO
        });

        test('xsd:int', function () {
            this.skip(); // TODO
        });

        test('xsd:short', function () {
            this.skip(); // TODO
        });

        test('xsd:byte', function () {
            this.skip(); // TODO
        });

        test('xsd:nonNegativeInteger', function () {
            this.skip(); // TODO
        });

        test('xsd:unsignedLong', function () {
            this.skip(); // TODO
        });

        test('xsd:unsignedInt', function () {
            this.skip(); // TODO
        });

        test('xsd:unsignedShort', function () {
            this.skip(); // TODO
        });

        test('xsd:unsignedByte', function () {
            this.skip(); // TODO
        });

        test('xsd:positiveInteger', function () {
            this.skip(); // TODO
        });

        test('xsd:yearMonthDuration', function () {
            this.skip(); // TODO
        });

        test('xsd:dayTimeDuration', function () {
            this.skip(); // TODO
        });

        test('xsd:dateTimeStamp', function () {
            this.skip(); // TODO
        });

    });

});
