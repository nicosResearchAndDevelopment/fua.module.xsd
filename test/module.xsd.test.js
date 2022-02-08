const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    xsd              = require('../src/module.xsd.js');

describe('module.xsd', function () {

    test('xsd.parseLiteral', function () {
        expect(xsd.parseLiteral({
            '@value': 'true',
            '@type':  'xsd:boolean'
        })).toBe(true);
        expect(xsd.parseLiteral({
            '@value': '42',
            '@type':  'xsd:integer'
        })).toBe(42);
        expect(xsd.parseLiteral({
            '@value': '112.322',
            '@type':  'xsd:decimal'
        })).toBe(112.322);
        expect(xsd.parseLiteral({
            '@value': '12e-1',
            '@type':  'xsd:double'
        })).toBe(1.2);
        expect(xsd.parseLiteral({
            '@value': '42',
            '@type':  'xsd:string'
        })).toBe('42');
    }); // xsd.parseLiteral

    test('xsd.analyseLiteral', function () {
        console.log(xsd.analyseLiteral({
            '@value': 'False',
            '@type':  'xsd:boolean'
        }));
        console.log(xsd.analyseLiteral({
            '@value': Buffer.from('Hello World!').toString('base64'),
            '@type':  'http://www.w3.org/2001/XMLSchema#base64Binary'
        }));
    }); // xsd.analyseLiteral

    describe('xsd.types', function () {

        test('xsd:string', function () {
            expect(xsd.types.string(true)).toBe('true');
            expect(xsd.types.string(1e3)).toBe('1000');
            expect(xsd.types.string({'@value': 'Hello World!'})).toBe('Hello World!');
        }); // xsd.string

        test('xsd:boolean', function () {
            expect(xsd.types.boolean('False')).toBe(false);
            expect(xsd.types.boolean('1')).toBe(true);
        }); // xsd.boolean

        test('xsd:decimal', function () {
            expect(xsd.types.decimal('+100')).toBe(100);
            expect(xsd.types.decimal('.3')).toBe(0.3);
            expect(xsd.types.decimal('0.3')).toBe(0.3);
            expect(xsd.types.decimal('-3.')).toBe(-3);
            expect(xsd.types.decimal('123.456789')).toBe(123.456789);
        }); // xsd.decimal

        test('xsd:integer', function () {
            expect(xsd.types.integer('+100')).toBe(100);
            expect(xsd.types.integer('-.3')).toBe(NaN);
            expect(xsd.types.integer('123.456789')).toBe(123);
        }); // xsd.integer

        test('xsd:double', function () {
            expect(xsd.types.double('+100')).toBe(100);
            expect(xsd.types.double('-.3')).toBe(-0.3);
            expect(xsd.types.double('123.456789')).toBe(123.456789);
        }); // xsd.double

        test('xsd:float', function () {
            expect(xsd.types.float('+100')).toBe(100);
            expect(xsd.types.float('-.3')).toBe(-0.30000001192092896);
            expect(xsd.types.float('123.456789')).toBe(123.456787109375);
        });

        // TODO test all types
        // TODO test also negative cases

    });

});
