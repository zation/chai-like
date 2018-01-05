'use strict';

const chai = require('chai');
const like = require('../index');
chai.should();
chai.use(like);

const expect = chai.expect;

describe('chai-like', function() {
  it('should differentiate `null` and `undefined`', function() {
    expect(undefined).like(undefined);
    expect(undefined).not.like(null);
    expect(null).like(null);
    expect(null).not.like(undefined);
  });

  it('should not match absense of the property and the `undefined` or `null` value', function() {
    const object1 = { property: undefined };
    const object2 = { property: null };
    const object3 = {};

    object1.should.like(object3);
    object2.should.like(object3);

    object1.should.not.like(object2);
    object2.should.not.like(object1);

    object3.should.not.like(object1);
    object3.should.not.like(object2);
  });

  it('should not match number and string', function() {
    const number = 42;
    const string = '42';

    number.should.not.like(string);
    string.should.not.like(number);
  });

  it('should match hashes with same keys in different order', function() {
    const object1 = { key1: 1, key2: '2', key3: null };
    const object2 = { key3: null, key2: '2', key1: 1 };

    object1.should.like(object2);
  });

  it('should not match arrays with same values in different order', function() {
    const array1 = [ 1, '2', null ];
    const array2 = [ null, '2', 1 ];

    array1.should.not.like(array2);
  });

  it('should compare two JSON and ignore some keys based on expectation', function() {
    const object = {
      id: 1,
      name: 'test',
      updatedAt: 'now'
    };
    object.should.like({
      name: 'test'
    });
    object.should.not.like({
      name: 'test1'
    });
  });

  it('should deeply compare two JSON', function() {
    const object = {
      id: 1,
      name: 'test',
      product: {
        id: 1,
        name: 'product'
      },
      updatedAt: 'now'
    };
    object.should.like({
      name: 'test',
      product: {
        name: 'product'
      }
    });
    object.should.not.like({
      name: 'test',
      product: {
        name: 'product1'
      }
    });
  });

  it('should compare empty array with empty object', function() {
    const array = [];
    const object = {};

    object.should.not.like(array);
    array.should.not.like(object);
  });

  it('should treat arrays with different length as different', function() {
    const array1 = [0, 1, 2];
    const array2 = [0];

    const object1 = { array: array1 };
    const object2 = { array: array2 };

    array1.should.not.like(array2);
    array2.should.not.like(array1);

    object1.should.not.like(object2);
    object2.should.not.like(object1);
  });

  describe('should match recursive structures', function() {
    it('within array', function() {
      var array = [];
      array.push(array);

      array.should.like(array);
      array.should.like([array]);
    });

    it('within hash', function() {
      var object = {};
      object.field = object;

      object.should.like(object);
      object.should.like({ field: object });
    });
  });

  it('should compare two array', function() {
    const array = [{
      id: 1,
      name: 'test',
      product: {
        id: 1,
        name: 'product'
      },
      updatedAt: 'now'
    }];
    array.should.like([{
      name: 'test',
      product: {
        name: 'product'
      }
    }]);
    array.should.not.like([{
      name: 'test',
      product: {
        name: 'product1'
      }
    }]);
  });

  it('should compare two JSON with an array sub node', function() {
    const object = {
      id: 1,
      name: 'test',
      products: [{
        id: 1,
        name: 'product'
      }],
      updatedAt: 'now'
    };
    object.should.like({
      name: 'test',
      products: [{
        name: 'product'
      }]
    });
    object.should.not.like({
      name: 'test',
      products: [{
        name: 'product1'
      }]
    });
  });
});