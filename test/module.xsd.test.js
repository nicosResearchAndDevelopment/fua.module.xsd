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
            '@value': '112.322',
            '@type':  'xsd:decimal'
        })).toBe(112.322);
        expect(xsd.parseLiteral({
            '@value': '12e-1',
            '@type':  'xsd:double'
        })).toBe(1.2);
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

    test('xsd.string', function () {
        expect(xsd.string(true)).toBe('true');
        expect(xsd.string(1e3)).toBe('1000');
        expect(xsd.string({'@value': 'Hello World!'})).toBe('Hello World!');
    }); // xsd.string

    test('xsd.boolean', function () {
        expect(xsd.boolean('False')).toBe(false);
        expect(xsd.boolean('1')).toBe(true);
    }); // xsd.boolean

    test('xsd.decimal', function () {
        expect(xsd.decimal('+100')).toBe(100);
        expect(xsd.decimal('-.3')).toBe(-0.3);
        expect(xsd.decimal('123.456789')).toBe(123.456789);
    }); // xsd.decimal

    test('xsd.integer', function () {
        expect(xsd.integer('+100')).toBe(100);
        expect(xsd.integer('-.3')).toBe(NaN);
        expect(xsd.integer('123.456789')).toBe(123);
    }); // xsd.integer

    test('xsd.double', function () {
        expect(xsd.double('+100')).toBe(100);
        expect(xsd.double('-.3')).toBe(-0.3);
        expect(xsd.double('123.456789')).toBe(123.456789);
    }); // xsd.double

    test('xsd.float', function () {
        expect(xsd.float('+100')).toBe(100);
        expect(xsd.float('-.3')).toBe(-0.30000001192092896);
        expect(xsd.float('123.456789')).toBe(123.456787109375);
    }); // xsd.float

    // TODO

});
