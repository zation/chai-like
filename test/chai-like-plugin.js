'use strict';

const chai = require('chai');
const like = require('../index');
chai.should();
chai.use(like);

describe('chai-like plugin', function() {
  afterEach(function() {
    like.clearPlugins();
  });


  it('should compare number and number like string', function() {
    like.extend({
      match: function(object) {
        return !isNaN(Number(object));
      },
      assert: function(object, expected) {
        return object === Number(expected);
      }
    });

    const object = {
      number: 123
    };
    object.should.like({
      number: '123'
    });
    object.should.not.like({
      number: 'not a number'
    });
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

      const object = {
          text: 'the quick brown fox jumps over the lazy dog'
      };
      object.should.like({
          text: /.* jumps over .*/
      });
      object.should.not.like({
          text: /\d/
      });
  });

  it('should run the matching plugin and only it', function () {
    like.extend({
      match: function() { return false; },
      assert: function() { throw new Error('should not match'); }
    });

    like.extend({
      match: function() { return true; },
      assert: function() { return true; }
    });

    const object = {}
    object.should.like('still match this');
  });

});
