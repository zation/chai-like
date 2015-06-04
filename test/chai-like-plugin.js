var chai = require('chai');
var like = require('../index');
chai.should();
like.extend({
  match: function(object) {
    return !isNaN(Number(object));
  },
  assert: function(object, expected) {
    return object === Number(expected);
  }
});
chai.use(like);

describe('chai-like plugin', function() {
  it('should compare number and number like string', function() {
    var object = {
      number: 123
    };
    object.should.like({
      number: '123'
    });
    object.should.not.like({
      number: 'not a number'
    });
  });
});