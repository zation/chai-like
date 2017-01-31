var chai = require('chai');
var like = require('../index');
chai.should();
chai.use(like);

describe('chai-like plugin', function() {
  it('should compare number and number like string', function() {
    like.extend({
      match: function(object) {
        return !isNaN(Number(object));
      },
      assert: function(object, expected) {
        return object === Number(expected);
      }
    });

    var object = {
      number: 123
    };
    object.should.like({
      number: '123'
    });
    object.should.not.like({
      number: 'not a number'
    });

    like.clearPlugins();
  });

  it('should test a string with expected RegExp', function () {
      like.extend({
          match: function(object, expected) {
              return typeof object === 'string' && expected instanceof RegExp;
          },
          assert: function(object, expected) {
              return expected.test(object);
          }
      });

      var object = {
          text: 'the quick brown fox jumps over the lazy dog'
      };
      object.should.like({
          text: /.* jumps over .*/
      });
      object.should.not.like({
          text: /\d/
      });

      like.clearPlugins();
  });
});