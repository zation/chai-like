var chai = require('chai');
var like = require('../index');
chai.should();
chai.use(like);

describe('chai-like', function() {
  it('should compare two JSON and ignore some keys based on expectation', function() {
    var object = {
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
    var object = {
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
    var array = [];
    var object = {};

    object.should.not.like(array);
    array.should.not.like(object);
  });

  it('should treat arrays with different length as different', function() {
    var array1 = [0, 1, 2];
    var array2 = [0];

    var object1 = { array: array1 };
    var object2 = { array: array2 };

    array1.should.not.like(array2);
    array2.should.not.like(array1);

    object1.should.not.like(object2);
    object2.should.not.like(object1);
  });

  it('should compare two array', function() {
    var array = [{
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
    var object = {
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