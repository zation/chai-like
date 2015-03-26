module.exports = function(_chai, utils) {
  var Assertion = _chai.Assertion;

  function like(object, expected, results) {
    if (utils.type(expected) === 'object') {
      for (var key in expected) {
        if (expected.hasOwnProperty(key)) {
          like(object[key], expected[key], results);
        }
      }
    } else if (utils.type(expected) === 'array') {
      for (var i = 0; i < expected.length; i++) {
        like(object[i], expected[i], results);
      }
    } else {
      results.push(object === expected);
    }
  }

  _chai.Assertion.addMethod('like', function(expected) {
    var object = utils.flag(this, 'object');
    var results = [];
    like(object, expected, results);
    var result = true;
    for (var i = 0; i < results.length; i++) {
      if (!results[i]) {
        result = false;
        break;
      }
    }
    this.assert(result, 'expected #{this} to like #{exp}', 'expected #{this} to not like #{exp}', expected)
  });
};