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
    global.koalaesceUtil = mod.exports;
  }
})(this, function (exports, module) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var koalautil = (function () {
    function koalautil() {
      _classCallCheck(this, koalautil);
    }

    _createClass(koalautil, null, [{
      key: 'reduce',
      value: function reduce(scope, cb, initial) {
        if (Array.prototype.reduce && scope && scope.constructor === Array) {
          return scope.reduce(cb, initial);
        } else {
          var value = initial;
          for (var i = 0; i < scope.length; ++i) {
            value = cb(value, scope[i]);
          }
        }
      }
    }, {
      key: 'checkRef',
      value: function checkRef(ref) {
        return ref !== undefined && ref !== null;
      }
    }, {
      key: 'splitChain',
      value: function splitChain(chain) {
        return chain.split('.');
      }
    }]);

    return koalautil;
  })();

  module.exports = koalautil;
});