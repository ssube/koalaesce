(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.koalaesceErrors = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var BaseError = (function (_Error) {
    function BaseError(message) {
      _classCallCheck(this, BaseError);

      _get(Object.getPrototypeOf(BaseError.prototype), 'constructor', this).call(this);

      if (Error.hasOwnProperty('captureStackTrace')) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error().stack;
      }

      this.name = this.constructor.name;
      this.message = message;
    }

    _inherits(BaseError, _Error);

    _createClass(BaseError, [{
      key: 'toString',
      value: function toString() {
        return '' + this.name + ': ' + this.message;
      }
    }]);

    return BaseError;
  })(Error);

  exports.BaseError = BaseError;

  var MissingLinkError = (function (_BaseError) {
    function MissingLinkError(link) {
      _classCallCheck(this, MissingLinkError);

      _get(Object.getPrototypeOf(MissingLinkError.prototype), 'constructor', this).call(this, 'Missing link at ' + link);
    }

    _inherits(MissingLinkError, _BaseError);

    return MissingLinkError;
  })(BaseError);

  exports.MissingLinkError = MissingLinkError;

  var NullLinkError = (function (_BaseError2) {
    function NullLinkError(link) {
      _classCallCheck(this, NullLinkError);

      _get(Object.getPrototypeOf(NullLinkError.prototype), 'constructor', this).call(this, 'Encountered a null link at ' + link);
    }

    _inherits(NullLinkError, _BaseError2);

    return NullLinkError;
  })(BaseError);

  exports.NullLinkError = NullLinkError;

  var NotInvokableError = (function (_BaseError3) {
    function NotInvokableError(link) {
      _classCallCheck(this, NotInvokableError);

      _get(Object.getPrototypeOf(NotInvokableError.prototype), 'constructor', this).call(this, 'Attempting to invoke non-function at ' + link);
    }

    _inherits(NotInvokableError, _BaseError3);

    return NotInvokableError;
  })(BaseError);

  exports.NotInvokableError = NotInvokableError;
});