module.exports = function(_chai, utils) {
  function like(object, expected) {
    if (utils.type(expected) === 'object') {
      for (var key in expected) {
        if (expected.hasOwnProperty(key)) {
          if (!like(object[key], expected[key])) {
            return false;
          }
        }
      }
      return true;
    } else if (utils.type(expected) === 'array') {
      for (var i = 0; i < expected.length; i++) {
        if (!like(object[i], expected[i])) {
          return false;
        }
      }
      return true;
    } else {
      return object === expected;
    }
  }

  _chai.Assertion.addMethod('like', function(expected) {
    var object = utils.flag(this, 'object');
    this.assert(like(object, expected), 'expected #{this} to like #{exp}', 'expected #{this} to not like #{exp}', expected)
  });
};