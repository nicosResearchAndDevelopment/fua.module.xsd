const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    model            = require('./module.xsd.model.js');

describe('next/module.xsd/model', function () {

    test('DEVELOP', function () {

        // console.log(model);

        // const string = new model.string('1234');
        // console.log(string);

        const decimal = new model.decimal('1234');
        console.log(decimal);

    });

});
