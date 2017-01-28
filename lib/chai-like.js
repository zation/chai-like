var plugins = [];

module.exports = function(_chai, utils) {
  function like(object, expected) {
    for (var index = 0; index < plugins.length; index++) {
      var validator = plugins[0];
      if (validator.match(object, expected)) {
        return validator.assert(object, expected);
      }
    }

    if (utils.type(expected) === 'object' && utils.type(object) === 'object') {
      for (var key in expected) {
        if (expected.hasOwnProperty(key)) {
          if (!like(object[key], expected[key])) {
            return false;
          }
        }
      }
      return true;
    }

    if (utils.type(expected) === 'array' && utils.type(object) === 'array') {
      for (var i = 0; i < expected.length; i++) {
        if (!like(object[i], expected[i])) {
          return false;
        }
      }
      return true;
    }

    return object === expected;
  }

  _chai.Assertion.addMethod('like', function(expected) {
    var object = utils.flag(this, 'object');
    this.assert(like(object, expected), 'expected #{this} to like #{exp}', 'expected #{this} to not like #{exp}', expected, object, _chai.config.showDiff)
  });
};

module.exports.extend = function(plugin) {
  plugins.push(plugin);
};

module.exports.clearPlugins = function() {
  plugins = [];
};