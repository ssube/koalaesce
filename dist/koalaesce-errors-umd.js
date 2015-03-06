(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    }
})(function (exports) {
    "use strict";

    var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

    var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    var MissingLinkError = exports.MissingLinkError = (function (Error) {
        function MissingLinkError(link) {
            _classCallCheck(this, MissingLinkError);

            _get(Object.getPrototypeOf(MissingLinkError.prototype), "constructor", this).call(this, "Missing link at " + link);
        }

        _inherits(MissingLinkError, Error);

        return MissingLinkError;
    })(Error);

    var NullLinkError = exports.NullLinkError = (function (Error) {
        function NullLinkError(link) {
            _classCallCheck(this, NullLinkError);

            _get(Object.getPrototypeOf(NullLinkError.prototype), "constructor", this).call(this, "Encountered a null link at " + link);
        }

        _inherits(NullLinkError, Error);

        return NullLinkError;
    })(Error);

    var NotInvokableError = exports.NotInvokableError = (function (Error) {
        function NotInvokableError(link) {
            _classCallCheck(this, NotInvokableError);

            _get(Object.getPrototypeOf(NotInvokableError.prototype), "constructor", this).call(this, "Attempting to invoke non-function at " + link);
        }

        _inherits(NotInvokableError, Error);

        return NotInvokableError;
    })(Error);

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
});