const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    {inspect}        = require('util'),
    logValue         = value => console.log(inspect(value, false, null, true)),
    model            = require('./module.xsd.model.js');

describe('next/module.xsd/model', function () {

    test('DEVELOP', function () {

        // console.log(model);

    });

    describe('primitive datatypes', function () {

        test('xsd:string', function () {
            logValue(new model.string('  Hello  World!  '));
            logValue(new model.string('1234'));
            // TODO
        });

        test('xsd:boolean', function () {
            // TODO
        });

        test('xsd:decimal', function () {
            logValue(new model.decimal('1234.456'));
            // TODO
        });

        test('xsd:float', function () {
            // TODO
        });

        test('xsd:double', function () {
            // TODO
        });

        test('xsd:duration', function () {
            // TODO
        });

        test('xsd:dateTime', function () {
            // TODO
        });

        test('xsd:time', function () {
            // TODO
        });

        test('xsd:date', function () {
            // TODO
        });

        test('xsd:gYearMonth', function () {
            // TODO
        });

        test('xsd:gYear', function () {
            // TODO
        });

        test('xsd:gMonthDay', function () {
            // TODO
        });

        test('xsd:gDay', function () {
            // TODO
        });

        test('xsd:gMonth', function () {
            // TODO
        });

        test('xsd:hexBinary', function () {
            // TODO
        });

        test('xsd:base64Binary', function () {
            // TODO
        });

        test('xsd:anyURI', function () {
            // TODO
        });

        test('xsd:QName', function () {
            // TODO
        });

        test('xsd:NOTATION', function () {
            // TODO
        });

    });

    describe('other datatypes', function () {

        test('xsd:normalizedString', function () {
            logValue(new model.normalizedString('  Hello  World!  '));
            // TODO
        });

        test('xsd:token', function () {
            logValue(new model.token('  Hello  World!  '));
            // TODO
        });

        test('xsd:language', function () {
            // TODO
        });

        test('xsd:NMTOKEN', function () {
            // TODO
        });

        test('xsd:NMTOKENS', function () {
            // TODO
        });

        test('xsd:Name', function () {
            // TODO
        });

        test('xsd:NCName', function () {
            // TODO
        });

        test('xsd:ID', function () {
            // TODO
        });

        test('xsd:IDREF', function () {
            // TODO
        });

        test('xsd:IDREFS', function () {
            // TODO
        });

        test('xsd:ENTITY', function () {
            // TODO
        });

        test('xsd:ENTITIES', function () {
            // TODO
        });

        test('xsd:integer', function () {
            logValue(new model.integer('123456'));
            // logValue(new model.integer('123456.456'));
            // TODO
        });

        test('xsd:nonPositiveInteger', function () {
            // TODO
        });

        test('xsd:negativeInteger', function () {
            // TODO
        });

        test('xsd:long', function () {
            // TODO
        });

        test('xsd:int', function () {
            // TODO
        });

        test('xsd:short', function () {
            // TODO
        });

        test('xsd:byte', function () {
            // TODO
        });

        test('xsd:nonNegativeInteger', function () {
            // TODO
        });

        test('xsd:unsignedLong', function () {
            // TODO
        });

        test('xsd:unsignedInt', function () {
            // TODO
        });

        test('xsd:unsignedShort', function () {
            // TODO
        });

        test('xsd:unsignedByte', function () {
            // TODO
        });

        test('xsd:positiveInteger', function () {
            // TODO
        });

        test('xsd:yearMonthDuration', function () {
            // TODO
        });

        test('xsd:dayTimeDuration', function () {
            // TODO
        });

        test('xsd:dateTimeStamp', function () {
            // TODO
        });

    });

});
