const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    xsd              = require('../src/module.xsd.js');

describe('module.xsd', function () {

    test('xsd.createLiteral', function () {
        expect(xsd.createLiteral(0)).toMatchObject({
            '@type':  'xsd:integer',
            '@value': '0'
        });
        expect(xsd.createLiteral(false)).toMatchObject({
            '@type':  'xsd:boolean',
            '@value': 'false'
        });
        expect(xsd.createLiteral('')).toMatchObject({
            '@type':  'xsd:string',
            '@value': ''
        });
        expect(xsd.createLiteral(NaN)).toMatchObject({
            '@type':  'xsd:float',
            '@value': 'NaN'
        });
        expect(() => xsd.createLiteral()).toThrow();
        expect(() => xsd.createLiteral(null)).toThrow();
    });

    test('xsd.parseLiteral', function () {
        expect(xsd.parseLiteral({
            '@value': 'true',
            '@type':  'boolean'
        })).toBe(true);
        expect(xsd.parseLiteral({
            '@value': '42',
            '@type':  'integer'
        })).toBe(42);
        expect(xsd.parseLiteral({
            '@value': '112.322',
            '@type':  'decimal'
        })).toBe(112.322);
        expect(xsd.parseLiteral({
            '@value': '12e-1',
            '@type':  'double'
        })).toBe(1.2);
        expect(xsd.parseLiteral({
            '@value': '42',
            '@type':  'string'
        })).toBe('42');
    }); // xsd.parseLiteral

    test('xsd.analyseLiteral', function () {
        console.log(xsd.analyseLiteral({
            '@value': 'false',
            '@type':  'boolean'
        }));
        console.log(xsd.analyseLiteral({
            '@value': Buffer.from('Hello World!').toString('base64'),
            '@type':  'http://www.w3.org/2001/XMLSchema#base64Binary'
        }));
    }); // xsd.analyseLiteral

    describe('xsd.types', function () {

        test('anyURI'); // anyURI

        test('base64Binary', function () {
            const xsd_base64Binary = xsd.types.base64Binary;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-base64binary
            const
                example            = 'Hello World!',
                buffer             = Buffer.from(example),
                encoded            = buffer.toString('base64'),
                bufferResult       = xsd_base64Binary(buffer),
                encodedResult      = xsd_base64Binary(encoded);

            expect(bufferResult).toBeInstanceOf(Buffer);
            expect(bufferResult.toString()).toBe(example);

            expect(encodedResult).toBeInstanceOf(Buffer);
            expect(encodedResult.toString()).toBe(example);
        }); // base64Binary

        test('boolean', function () {
            const xsd_boolean = xsd.types.boolean;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-boolean
            expect(xsd_boolean('true')).toBe(true);
            expect(xsd_boolean('1')).toBe(true);
            expect(xsd_boolean('false')).toBe(false);
            expect(xsd_boolean('0')).toBe(false);

            expect(() => xsd_boolean('vrai')).toThrow();
            expect(() => xsd_boolean('faux')).toThrow();
            expect(() => xsd_boolean('wahr')).toThrow();
            expect(() => xsd_boolean('falsch')).toThrow();

            expect(xsd_boolean(true)).toBe(true);
            expect(xsd_boolean(1)).toBe(true);
            expect(xsd_boolean(false)).toBe(false);
            expect(xsd_boolean(0)).toBe(false);

            expect(() => xsd_boolean(42)).toThrow();
            expect(() => xsd_boolean(new Date())).toThrow();
        }); // boolean

        test('byte', function () {
            const xsd_byte = xsd.types.byte;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-byte
            expect(xsd_byte('27')).toBe(27);
            expect(xsd_byte('-34')).toBe(-34);
            expect(xsd_byte('+105')).toBe(105);
            expect(xsd_byte('0')).toBe(0);

            expect(() => xsd_byte('0A')).toThrow();
            expect(() => xsd_byte('1524')).toThrow();
            expect(() => xsd_byte('INF')).toThrow();

            expect(xsd_byte(42)).toBe(42);
            expect(xsd_byte(-123)).toBe(-123);
            expect(xsd_byte(0)).toBe(0);

            expect(() => xsd_byte(true)).toThrow();
            expect(() => xsd_byte('Hello World!')).toThrow();
            expect(() => xsd_byte(128)).toThrow();
        }); // byte

        test('date'); // date

        test('dateTime'); // dateTime

        test('decimal', function () {
            const xsd_decimal = xsd.types.decimal;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-decimal
            expect(xsd_decimal('123.456')).toBe(123.456);
            expect(xsd_decimal('+1234.456')).toBe(1234.456);
            expect(xsd_decimal('-1234.456')).toBe(-1234.456);
            expect(xsd_decimal('-.456')).toBe(-.456);
            expect(xsd_decimal('-456')).toBe(-456);

            expect(() => xsd_decimal('1 234.456')).toThrow(); // spaces are invalid
            expect(() => xsd_decimal('1234.456E+2')).toThrow(); // exponent notation is invalid
            expect(() => xsd_decimal('+ 1234.456')).toThrow(); // spaces are invalid
            expect(() => xsd_decimal('+1,234.456')).toThrow(); // thousands separator are invalid

            expect(xsd_decimal(42)).toBe(42);
            expect(xsd_decimal(123.456)).toBe(123.456);
            expect(xsd_decimal(.1337)).toBe(.1337);

            expect(() => xsd_decimal(true)).toThrow();
            expect(() => xsd_decimal('Hello World!')).toThrow();
        }); // decimal

        test('double', function () {
            const xsd_double = xsd.types.double;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-double
            expect(xsd_double('123.456')).toBeCloseTo(123.456);
            expect(xsd_double('+1234.456')).toBeCloseTo(1234.456);
            expect(xsd_double('-1.2344e56')).toBeCloseTo(-1.2344e56);
            expect(xsd_double('-.45E-6')).toBeCloseTo(-.45E-6);
            expect(xsd_double('INF')).toBe(Infinity);
            expect(xsd_double('-INF')).toBe(-Infinity);
            expect(xsd_double('NaN')).toBe(NaN);

            expect(() => xsd_double('1234.4E 56')).toThrow(); // spaces are invalid
            expect(() => xsd_double('1E+2.5')).toThrow(); // exponent must be an integer
            expect(() => xsd_double('+INF')).toThrow(); // positive infinity must not be signed
            expect(() => xsd_double('NAN')).toThrow(); // special values are case-sensitive

            expect(xsd_double(42)).toBeCloseTo(42);
            expect(xsd_double(.1337)).toBeCloseTo(.1337);
            expect(xsd_double(-Infinity)).toBe(-Infinity);

            expect(() => xsd_double(true)).toThrow();
            expect(() => xsd_double('Hello World!')).toThrow();
        }); // double

        test('duration'); // duration

        test('ENTITIES'); // ENTITIES

        test('ENTITY'); // ENTITY

        test('float', function () {
            const xsd_float = xsd.types.float;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-float
            expect(xsd_float('123.456')).toBeCloseTo(123.456);
            expect(xsd_float('+1234.456')).toBeCloseTo(1234.456);
            expect(xsd_float('-1.2344e56')).toBe(-Infinity);
            expect(xsd_float('-.45E-6')).toBeCloseTo(-.45E-6);
            expect(xsd_float('INF')).toBe(Infinity);
            expect(xsd_float('-INF')).toBe(-Infinity);
            expect(xsd_float('NaN')).toBe(NaN);

            expect(() => xsd_float('1234.4E 56')).toThrow(); // spaces are invalid
            expect(() => xsd_float('1E+2.5')).toThrow(); // exponent must be an integer
            expect(() => xsd_float('+INF')).toThrow(); // positive infinity must not be signed
            expect(() => xsd_float('NAN')).toThrow(); // special values are case-sensitive

            expect(xsd_float(42)).toBeCloseTo(42);
            expect(xsd_float(.1337)).toBeCloseTo(.1337);
            expect(xsd_float(-Infinity)).toBe(-Infinity);

            expect(() => xsd_float(true)).toThrow();
            expect(() => xsd_float('Hello World!')).toThrow();
        }); // float

        test('gDay'); // gDay

        test('gMonth'); // gMonth

        test('gMonthDay'); // gMonthDay

        test('gYear'); // gYear

        test('gYearMonth'); // gYearMonth

        test('hexBinary', function () {
            const xsd_hexBinary = xsd.types.hexBinary;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-hexbinary
            const
                example         = 'Hello World!',
                buffer          = Buffer.from(example),
                encoded         = buffer.toString('hex'),
                bufferResult    = xsd_hexBinary(buffer),
                encodedResult   = xsd_hexBinary(encoded);

            expect(bufferResult).toBeInstanceOf(Buffer);
            expect(bufferResult.toString()).toBe(example);

            expect(encodedResult).toBeInstanceOf(Buffer);
            expect(encodedResult.toString()).toBe(example);
        }); // hexBinary

        test('ID'); // ID

        test('IDREF'); // IDREF

        test('IDREFS'); // IDREFS

        test('int', function () {
            const xsd_int = xsd.types.int;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-int
            expect(xsd_int('-2147483648')).toBe(-2147483648);
            expect(xsd_int('0')).toBe(0);
            expect(xsd_int('-0000000000000000000005')).toBe(-5);
            expect(xsd_int('2147483647')).toBe(2147483647);

            expect(() => xsd_int('-2147483649')).toThrow();
            expect(() => xsd_int('100000000000')).toThrow();

            expect(xsd_int(42)).toBe(42);
            expect(xsd_int(-123)).toBe(-123);
            expect(xsd_int(0)).toBe(0);

            expect(() => xsd_int(true)).toThrow();
            expect(() => xsd_int('Hello World!')).toThrow();
            expect(() => xsd_int(2147483648)).toThrow();
        }); // int

        test('integer', function () {
            const xsd_integer = xsd.types.integer;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-integer
            expect(xsd_integer('-123456789012345678901234567890')).toBe(-123456789012345678901234567890);
            expect(xsd_integer('2147483647')).toBe(2147483647);
            expect(xsd_integer('0')).toBe(0);
            expect(xsd_integer('-0000000000000000000005')).toBe(-5);

            expect(() => xsd_integer('1.')).toThrow();
            expect(() => xsd_integer('2.6')).toThrow();
            expect(() => xsd_integer('A')).toThrow();

            expect(xsd_integer(42)).toBe(42);
            expect(xsd_integer(-123)).toBe(-123);
            expect(xsd_integer(0)).toBe(0);

            expect(() => xsd_integer(true)).toThrow();
            expect(() => xsd_integer('Hello World!')).toThrow();
        }); // integer

        test('language', function () {
            const xsd_language = xsd.types.language;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-language
            expect(xsd_language('en')).toBe('en');
            expect(xsd_language('en-US')).toBe('en-US');
            expect(xsd_language('de')).toBe('de');
            expect(xsd_language('de-DE')).toBe('de-DE');

            expect(() => xsd_language('Hello World!')).toThrow();

            expect(xsd_language({'@value': 'en'})).toBe('en');

            expect(() => xsd_language(true)).toThrow();
            expect(() => xsd_language(1e3)).toThrow();
            expect(() => xsd_language()).toThrow();
            expect(() => xsd_language({'lorem': 'ipsum'})).toThrow();
            expect(() => xsd_language(null)).toThrow();
        }); // language

        test('long', function () {
            const xsd_long = xsd.types.long;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-long
            expect(xsd_long('-9223372036854775808')).toBe(-9223372036854775808);
            expect(xsd_long('0')).toBe(0);
            expect(xsd_long('-0000000000000000000005')).toBe(-5);
            expect(xsd_long('9223372036854775807')).toBe(9223372036854775807);

            expect(() => xsd_long('9223372036854775808')).toThrow();
            expect(() => xsd_long('1.')).toThrow();

            expect(xsd_long(42)).toBe(42);
            expect(xsd_long(-123)).toBe(-123);
            expect(xsd_long(0)).toBe(0);

            expect(() => xsd_long(true)).toThrow();
            expect(() => xsd_long('Hello World!')).toThrow();
            expect(() => xsd_long(9223372036854775808)).toThrow();
        }); // long

        test('Name', function () {
            const xsd_Name = xsd.types.Name;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-name
            expect(xsd_Name('Snoopy')).toBe('Snoopy');
            expect(xsd_Name('CMS')).toBe('CMS');
            expect(xsd_Name('_1950-10-04_10:00')).toBe('_1950-10-04_10:00');

            expect(() => xsd_Name('0836217462')).toThrow(); // must not begin with a number
            expect(() => xsd_Name('kühn,dreist')).toThrow(); // commas are invalid

            expect(xsd_Name({'@value': 'Snoopy'})).toBe('Snoopy');

            expect(() => xsd_Name(true)).toThrow();
            expect(() => xsd_Name(1e3)).toThrow();
            expect(() => xsd_Name()).toThrow();
            expect(() => xsd_Name({'lorem': 'ipsum'})).toThrow();
            expect(() => xsd_Name(null)).toThrow();
        }); // Name

        test('NCName', function () {
            const xsd_NCName = xsd.types.NCName;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-ncname
            expect(xsd_NCName('Snoopy')).toBe('Snoopy');
            expect(xsd_NCName('CMS')).toBe('CMS');
            expect(xsd_NCName('_1950-10-04_10-00')).toBe('_1950-10-04_10-00');
            expect(xsd_NCName('kühn_dreist')).toBe('kühn_dreist');

            expect(() => xsd_NCName('_1950-10-04:10-00')).toThrow(); // colons are invalid
            expect(() => xsd_NCName('kühn:dreist')).toThrow(); // colons are invalid

            expect(xsd_NCName({'@value': 'Snoopy'})).toBe('Snoopy');

            expect(() => xsd_NCName(true)).toThrow();
            expect(() => xsd_NCName(1e3)).toThrow();
            expect(() => xsd_NCName()).toThrow();
            expect(() => xsd_NCName({'lorem': 'ipsum'})).toThrow();
            expect(() => xsd_NCName(null)).toThrow();
        }); // NCName

        test('negativeInteger', function () {
            const xsd_negativeInteger = xsd.types.negativeInteger;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-negativeinteger
            expect(xsd_negativeInteger('-123456789012345678901234567890')).toBe(-123456789012345678901234567890);
            expect(xsd_negativeInteger('-1')).toBe(-1);
            expect(xsd_negativeInteger('-0000000000000000000005')).toBe(-5);

            expect(() => xsd_negativeInteger('0')).toThrow();
            expect(() => xsd_negativeInteger('-1.')).toThrow();

            expect(xsd_negativeInteger(-123)).toBe(-123);

            expect(() => xsd_negativeInteger(0)).toThrow();
            expect(() => xsd_negativeInteger(42)).toThrow();
            expect(() => xsd_negativeInteger(true)).toThrow();
            expect(() => xsd_negativeInteger('Hello World!')).toThrow();
        }); // negativeInteger

        test('NMTOKEN', function () {
            const xsd_NMTOKEN = xsd.types.NMTOKEN;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-nmtoken
            expect(xsd_NMTOKEN('Snoopy')).toBe('Snoopy');
            expect(xsd_NMTOKEN('CMS')).toBe('CMS');
            expect(xsd_NMTOKEN('1950-10-04')).toBe('1950-10-04');
            expect(xsd_NMTOKEN('0836217462')).toBe('0836217462');

            expect(() => xsd_NMTOKEN('brachte die klassische Musik in die Peanuts-Comics ein')).toThrow(); // spaces are invalid
            expect(() => xsd_NMTOKEN('kühn,dreist')).toThrow(); // commas are invalid

            expect(xsd_NMTOKEN({'@value': 'Snoopy'})).toBe('Snoopy');

            expect(() => xsd_NMTOKEN(true)).toThrow();
            expect(() => xsd_NMTOKEN(1e3)).toThrow();
            expect(() => xsd_NMTOKEN()).toThrow();
            expect(() => xsd_NMTOKEN({'lorem': 'ipsum'})).toThrow();
            expect(() => xsd_NMTOKEN(null)).toThrow();
        }); // NMTOKEN

        test('NMTOKENS', function () {
            const xsd_NMTOKENS = xsd.types.NMTOKENS;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-nmtokens
            expect(xsd_NMTOKENS('Snoopy')).toMatchObject(['Snoopy']);
            expect(xsd_NMTOKENS('CMS')).toMatchObject(['CMS']);
            expect(xsd_NMTOKENS('1950-10-04')).toMatchObject(['1950-10-04']);
            expect(xsd_NMTOKENS('0836217462 0836217463')).toMatchObject(['0836217462', '0836217463']);
            expect(xsd_NMTOKENS('brachte die klassische Musik in die Peanuts-Comics ein'))
                .toMatchObject(['brachte', 'die', 'klassische', 'Musik', 'in', 'die', 'Peanuts-Comics', 'ein']);

            expect(() => xsd_NMTOKENS('brachte die klassische Musik in die "Peanuts"-Comics ein')).toThrow(); // quotations are invalid
            expect(() => xsd_NMTOKENS('kühn,dreist')).toThrow(); // commas are invalid

            expect(xsd_NMTOKENS({'@value': 'Snoopy'})).toMatchObject(['Snoopy']);
            expect(xsd_NMTOKENS(['0836217462', '0836217463'])).toMatchObject(['0836217462', '0836217463']);

            expect(() => xsd_NMTOKENS(true)).toThrow();
            expect(() => xsd_NMTOKENS(1e3)).toThrow();
            expect(() => xsd_NMTOKENS()).toThrow();
            expect(() => xsd_NMTOKENS({'lorem': 'ipsum'})).toThrow();
            expect(() => xsd_NMTOKENS(null)).toThrow();
        }); // NMTOKENS

        test('nonNegativeInteger', function () {
            const xsd_nonNegativeInteger = xsd.types.nonNegativeInteger;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-nonnegativeinteger
            expect(xsd_nonNegativeInteger('+123456789012345678901234567890')).toBe(123456789012345678901234567890);
            expect(xsd_nonNegativeInteger('0')).toBe(0);
            expect(xsd_nonNegativeInteger('0000000000000000000005')).toBe(5);
            expect(xsd_nonNegativeInteger('2147483647')).toBe(2147483647);

            expect(() => xsd_nonNegativeInteger('1.')).toThrow();
            expect(() => xsd_nonNegativeInteger('-1.')).toThrow();

            expect(xsd_nonNegativeInteger(42)).toBe(42);
            expect(xsd_nonNegativeInteger(0)).toBe(0);

            expect(() => xsd_nonNegativeInteger(-123)).toThrow();
            expect(() => xsd_nonNegativeInteger(true)).toThrow();
            expect(() => xsd_nonNegativeInteger('Hello World!')).toThrow();
        }); // nonNegativeInteger

        test('nonPositiveInteger', function () {
            const xsd_nonPositiveInteger = xsd.types.nonPositiveInteger;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-nonpositiveinteger
            expect(xsd_nonPositiveInteger('-123456789012345678901234567890')).toBe(-123456789012345678901234567890);
            expect(xsd_nonPositiveInteger('0')).toBe(0);
            expect(xsd_nonPositiveInteger('-0000000000000000000005')).toBe(-5);
            expect(xsd_nonPositiveInteger('-2147483647')).toBe(-2147483647);

            expect(() => xsd_nonPositiveInteger('-1.')).toThrow();
            expect(() => xsd_nonPositiveInteger('1.')).toThrow();

            expect(xsd_nonPositiveInteger(-123)).toBe(-123);
            expect(xsd_nonPositiveInteger(0)).toBe(0);

            expect(() => xsd_nonPositiveInteger(42)).toThrow();
            expect(() => xsd_nonPositiveInteger(true)).toThrow();
            expect(() => xsd_nonPositiveInteger('Hello World!')).toThrow();
        }); // nonPositiveInteger

        test('normalizedString', function () {
            const xsd_normalizedString = xsd.types.normalizedString;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-normalizedstring
            expect(xsd_normalizedString('\r\n  Auf den\r\n  Hund gekommen\r\n')).toBe('    Auf den    Hund gekommen  ');

            expect(xsd_normalizedString({'@value': 'Hello World!'})).toBe('Hello World!');

            expect(() => xsd_normalizedString(true)).toThrow();
            expect(() => xsd_normalizedString(1e3)).toThrow();
            expect(() => xsd_normalizedString()).toThrow();
            expect(() => xsd_normalizedString({'lorem': 'ipsum'})).toThrow();
            expect(() => xsd_normalizedString(null)).toThrow();
        }); // normalizedString

        test('NOTATION'); // NOTATION

        test('positiveInteger', function () {
            const xsd_positiveInteger = xsd.types.positiveInteger;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-positiveinteger
            expect(xsd_positiveInteger('123456789012345678901234567890')).toBe(123456789012345678901234567890);
            expect(xsd_positiveInteger('1')).toBe(1);
            expect(xsd_positiveInteger('0000000000000000000005')).toBe(5);

            expect(() => xsd_positiveInteger('0')).toThrow();
            expect(() => xsd_positiveInteger('1.')).toThrow();

            expect(xsd_positiveInteger(42)).toBe(42);

            expect(() => xsd_positiveInteger(0)).toThrow();
            expect(() => xsd_positiveInteger(-123)).toThrow();
            expect(() => xsd_positiveInteger(true)).toThrow();
            expect(() => xsd_positiveInteger('Hello World!')).toThrow();
        }); // positiveInteger

        test('QName'); // QName

        test('short', function () {
            const xsd_short = xsd.types.short;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-short
            expect(xsd_short('-32768')).toBe(-32768);
            expect(xsd_short('0')).toBe(0);
            expect(xsd_short('-0000000000000000000005')).toBe(-5);
            expect(xsd_short('32767')).toBe(32767);

            expect(() => xsd_short('32768')).toThrow();
            expect(() => xsd_short('1.')).toThrow();

            expect(xsd_short(42)).toBe(42);
            expect(xsd_short(-123)).toBe(-123);
            expect(xsd_short(0)).toBe(0);

            expect(() => xsd_short(true)).toThrow();
            expect(() => xsd_short('Hello World!')).toThrow();
            expect(() => xsd_short(32768)).toThrow();
        }); // short

        test('string', function () {
            const xsd_string = xsd.types.string;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-string
            expect(xsd_string('\r\n  Auf den\r\n  Hund gekommen\r\n')).toBe('\r\n  Auf den\r\n  Hund gekommen\r\n');

            expect(xsd_string({'@value': 'Hello World!'})).toBe('Hello World!');

            expect(() => xsd_string(true)).toThrow();
            expect(() => xsd_string(1e3)).toThrow();
            expect(() => xsd_string()).toThrow();
            expect(() => xsd_string({'lorem': 'ipsum'})).toThrow();
            expect(() => xsd_string(null)).toThrow();
        }); // string

        test('time'); // time

        test('token', function () {
            const xsd_token = xsd.types.token;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-token
            expect(xsd_token('\r\n  Auf den\r\n  Hund gekommen\r\n')).toBe('Auf den Hund gekommen');

            expect(xsd_token({'@value': 'Hello World!'})).toBe('Hello World!');

            expect(() => xsd_token(true)).toThrow();
            expect(() => xsd_token(1e3)).toThrow();
            expect(() => xsd_token()).toThrow();
            expect(() => xsd_token({'lorem': 'ipsum'})).toThrow();
            expect(() => xsd_token(null)).toThrow();
        }); // token

        test('unsignedByte', function () {
            const xsd_unsignedByte = xsd.types.unsignedByte;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-unsignedbyte
            expect(xsd_unsignedByte('255')).toBe(255);
            expect(xsd_unsignedByte('0')).toBe(0);
            expect(xsd_unsignedByte('+0000000000000000000005')).toBe(5);
            expect(xsd_unsignedByte('1')).toBe(1);

            expect(() => xsd_unsignedByte('-1')).toThrow();
            expect(() => xsd_unsignedByte('1.')).toThrow();

            expect(xsd_unsignedByte(42)).toBe(42);
            expect(xsd_unsignedByte(0)).toBe(0);

            expect(() => xsd_unsignedByte(-123)).toThrow();
            expect(() => xsd_unsignedByte(true)).toThrow();
            expect(() => xsd_unsignedByte('Hello World!')).toThrow();
            expect(() => xsd_unsignedByte(256)).toThrow();
        }); // unsignedByte

        test('unsignedInt', function () {
            const xsd_unsignedInt = xsd.types.unsignedInt;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-unsignedint
            expect(xsd_unsignedInt('4294967295')).toBe(4294967295);
            expect(xsd_unsignedInt('0')).toBe(0);
            expect(xsd_unsignedInt('+0000000000000000000005')).toBe(5);
            expect(xsd_unsignedInt('1')).toBe(1);

            expect(() => xsd_unsignedInt('-1')).toThrow();
            expect(() => xsd_unsignedInt('1.')).toThrow();

            expect(xsd_unsignedInt(42)).toBe(42);
            expect(xsd_unsignedInt(0)).toBe(0);

            expect(() => xsd_unsignedInt(-123)).toThrow();
            expect(() => xsd_unsignedInt(true)).toThrow();
            expect(() => xsd_unsignedInt('Hello World!')).toThrow();
            expect(() => xsd_unsignedInt(4294967296)).toThrow();
        }); // unsignedInt

        test('unsignedLong', function () {
            const xsd_unsignedLong = xsd.types.unsignedLong;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-unsignedlong
            expect(xsd_unsignedLong('18446744073709551615')).toBe(18446744073709551615);
            expect(xsd_unsignedLong('0')).toBe(0);
            expect(xsd_unsignedLong('+0000000000000000000005')).toBe(5);
            expect(xsd_unsignedLong('1')).toBe(1);

            expect(() => xsd_unsignedLong('-1')).toThrow();
            expect(() => xsd_unsignedLong('1.')).toThrow();

            expect(xsd_unsignedLong(42)).toBe(42);
            expect(xsd_unsignedLong(0)).toBe(0);

            expect(() => xsd_unsignedLong(-123)).toThrow();
            expect(() => xsd_unsignedLong(true)).toThrow();
            expect(() => xsd_unsignedLong('Hello World!')).toThrow();
            expect(() => xsd_unsignedLong(18446744073709551616)).toThrow();
        }); // unsignedLong

        test('unsignedShort', function () {
            const xsd_unsignedShort = xsd.types.unsignedShort;
            // https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-unsignedshort
            expect(xsd_unsignedShort('65535')).toBe(65535);
            expect(xsd_unsignedShort('0')).toBe(0);
            expect(xsd_unsignedShort('+0000000000000000000005')).toBe(5);
            expect(xsd_unsignedShort('1')).toBe(1);

            expect(() => xsd_unsignedShort('-1')).toThrow();
            expect(() => xsd_unsignedShort('1.')).toThrow();

            expect(xsd_unsignedShort(42)).toBe(42);
            expect(xsd_unsignedShort(0)).toBe(0);

            expect(() => xsd_unsignedShort(-123)).toThrow();
            expect(() => xsd_unsignedShort(true)).toThrow();
            expect(() => xsd_unsignedShort('Hello World!')).toThrow();
            expect(() => xsd_unsignedShort(65536)).toThrow();
        }); // unsignedShort

    });

});
