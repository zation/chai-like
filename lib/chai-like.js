module.exports = function(_chai, utils) {
  function like(object, expected) {
    if (utils.type(expected) === 'object') {
      for (var key in expected) {
        if (expected.hasOwnProperty(key)) {
          like(object[key], expected[key]);
        }
      }
    } else if (utils.type(expected) === 'array') {
      for (var i = 0; i < expected.length; i++) {
        like(object[i], expected[i]);
      }
    } else {
      new _chai.Assertion(object).to.be.equal(expected);
    }
  }

  _chai.Assertion.addMethod('like', function(expected) {
    var object = utils.flag(this, 'object');
    like(object, expected);
  });
};