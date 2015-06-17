(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.koalaesce = mod.exports;
  }
})(this, function (exports, module) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _require = require('./koalaesce-errors');

  var MissingLinkError = _require.MissingLinkError;
  var NullLinkError = _require.NullLinkError;
  var NotInvokableError = _require.NotInvokableError;

  var koalautil = require('./koalaesce-util');

  var koalaesce = (function () {
    function koalaesce() {
      _classCallCheck(this, koalaesce);
    }

    _createClass(koalaesce, null, [{
      key: 'get',
      value: function get(base) {
        for (var _len = arguments.length, steps = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          steps[_key - 1] = arguments[_key];
        }

        return koalaesce.getOrDefault.apply(koalaesce, [base, null].concat(steps));
      }
    }, {
      key: 'getOrDefault',
      value: function getOrDefault(base, def) {
        for (var _len2 = arguments.length, steps = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          steps[_key2 - 2] = arguments[_key2];
        }

        try {
          return koalaesce.getOrThrow.apply(koalaesce, [base].concat(steps));
        } catch (e) {
          if (e.constructor === MissingLinkError || e.constructor === NullLinkError) {
            return def;
          } else {
            throw e;
          }
        }
      }
    }, {
      key: 'getOrThrow',
      value: function getOrThrow(base) {
        for (var _len3 = arguments.length, steps = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          steps[_key3 - 1] = arguments[_key3];
        }

        return koalautil.reduce(steps, function (prev, cur) {
          if (!koalautil.checkRef(cur)) {
            return null;
          } else if (!koalautil.checkRef(prev)) {
            throw new NullLinkError(cur);
          } else if (cur.constructor === Array) {
            var _name = cur[0],
                args = cur.slice(1);
            var next = prev[_name];
            if (next && next.apply) {
              return next.apply(prev, args);
            } else {
              throw new NotInvokableError(_name);
            }
          } else if (prev[cur] !== undefined) {
            return prev[cur];
          } else {
            throw new MissingLinkError(cur);
          }
        }, base);
      }
    }, {
      key: 'getNamed',
      value: function getNamed(base, name) {
        return koalaesce.getNamedOrDefault(base, null, name);
      }
    }, {
      key: 'getNamedOrDefault',
      value: function getNamedOrDefault(base, def, chain) {
        var steps = koalautil.splitChain(chain);
        return koalaesce.getOrDefault.apply(koalaesce, [base, def].concat(_toConsumableArray(steps)));
      }
    }]);

    return koalaesce;
  })();

  module.exports = koalaesce;
});