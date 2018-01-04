'use strict';

const chai = require('chai');
const like = require('../index');
chai.should();
chai.use(like);

const expect = chai.expect;

describe('chai-like', function() {
  describe('should match primitives', function() {
    var string = 'Question about life, universe and everything';
    var number = 42;
    var TRUE = true;
    var FALSE = false;
    var array = [string, number];
    var object = { question: string, answer: number };

    function fn() {}

    it('string', function() {
      ('').should.like('');
      string.should.like(string);
      string.should.like('Question about life, universe and everything');
    });

    it('number', function() {
      number.should.like(number);
      number.should.like(42);

      number.should.not.like(NaN);
      NaN.should.not.like(number);

      NaN.should.not.like(NaN);
    });

    it('boolean', function() {
      TRUE.should.like(TRUE);
      TRUE.should.like(true);

      FALSE.should.like(FALSE);
      FALSE.should.like(false);
    });

    it('array', function() {
      ([]).should.like([]);
      array.should.like(array);
      array.should.like([string, number]);
    });

    it('object', function() {
      ({}).should.like({});
      object.should.like(object);
      object.should.like({ question: string, answer: number });
    });

    it('function', function() {
      fn.should.like(fn);
    });

    describe('with their object wrappers', function() {
      it('string', function() {
        string.should.like(String(string));
        string.should.like(new String(string));

        String(string).should.like(string);
        new String(string).should.like(string);
      });

      it('number', function() {
        number.should.like(Number(number));
        number.should.like(new Number(number));

        Number(number).should.like(number);
        new Number(number).should.like(number);
      });

      it('boolean', function() {
        TRUE .should.like(Boolean(true));
        FALSE.should.like(Boolean(false));
        TRUE .should.like(new Boolean(true));
        FALSE.should.like(new Boolean(false));

        Boolean(true ).should.like(TRUE);
        Boolean(false).should.like(FALSE);
        new Boolean(true ).should.like(TRUE);
        new Boolean(false).should.like(FALSE);
      });

      it('array', function() {
        ([]).should.like(new Array());

        array.should.like(Array(string, number));
        array.should.like(new Array(string, number));

        Array(string, number).should.like(array);
        new Array(string, number).should.like(array);
      });
    });
  });

  it('should match RegExps', function() {
    var regexp = /[abc]/;

    regexp.should.like(regexp);
    regexp.should.like(RegExp('[abc]'));
    RegExp('[abc]').should.like(regexp);
    new RegExp('[abc]').should.like(regexp);
  });

  it('should match Dates', function() {
    var date = new Date(2018, 0, 4, 22, 6, 15, 777);

    date.should.like(date);
    date.should.like(new Date(2018, 0, 4, 22, 6, 15, 777));
    date.should.not.like(new Date(2019, 0, 4, 22, 6, 15, 777));
    date.should.not.like(new Date(2018, 1, 4, 22, 6, 15, 777));
    date.should.not.like(new Date(2018, 0, 5, 22, 6, 15, 777));
    date.should.not.like(new Date(2018, 0, 4, 23, 6, 15, 777));
    date.should.not.like(new Date(2018, 0, 4, 22, 7, 15, 777));
    date.should.not.like(new Date(2018, 0, 4, 22, 6, 16, 777));
    date.should.not.like(new Date(2018, 0, 4, 22, 6, 15, 778));
  });

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