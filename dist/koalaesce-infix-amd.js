define(["exports", "module"], function (exports, module) {
    "use strict";

    var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    var koalautil = require("./koalaesce-util");

    var koalainfix = (function () {
        function koalainfix() {
            _classCallCheck(this, koalainfix);
        }

        _prototypeProperties(koalainfix, {
            get: {
                value: function get(name) {
                    if (koalautil.checkRef(this)) {
                        return this[name];
                    } else {
                        return null;
                    }
                },
                writable: true,
                configurable: true
            },
            call: {
                value: function call() {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    if (typeof this === "function" && this.apply) {
                        return this.apply(this, args);
                    } else {
                        return null;
                    }
                },
                writable: true,
                configurable: true
            },
            "default": {
                value: function _default(def) {
                    if (koalautil.checkRef(this)) {
                        return this;
                    } else {
                        return def;
                    }
                },
                writable: true,
                configurable: true
            }
        });

        return koalainfix;
    })();

    module.exports = koalainfix;
});