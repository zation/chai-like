var _ = require('lodash');

module.exports = function(_chai, utils) {
  function like(object, expected) {
    if (_.isObject(expected)) {
      _.forEach(expected, function(value, key) {
        like(object[key], value);
      });
    } else {
      new _chai.Assertion(object).to.be.equal(expected);
    }
  }

  _chai.Assertion.addMethod('like', function(expected) {
    var object = utils.flag(this, 'object');
    like(object, expected);
  });
};