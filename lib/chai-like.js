var R = require('ramda');

function like(obj, expected) {
  return R.cond(
    [R.compose(R.is(Array), R.nthArg(1)), arrValuesLike],
    [R.compose(R.is(Object), R.nthArg(1)), valuesLike],
    [R.eq, R.T],
    [R.T, R.F]
  )(obj, expected);
}

function valuesLike(obj, expected) {
  return R.keys(expected).reduce(function(sofar, key) {
    return sofar && like(obj[key], expected[key]);
  }, true);
}

function arrValuesLike(obj, expected) {
  return expected.reduce(function(sofar, value, idx) {
    return sofar && like(obj[idx], value);
  }, true);
}

module.exports = function(_chai, utils) {
  _chai.Assertion.addMethod('like', function(expected) {
    var object = utils.flag(this, 'object');
    this.assert(like(object, expected), 'expected #{this} to like #{exp}', 'expected #{this} to not like #{exp}', expected)
  });
};
