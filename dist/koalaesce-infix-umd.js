(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "module"], factory);
    } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
        factory(exports, module);
    }
})(function (exports, module) {
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
            getNamed: {
                value: function getNamed(chain) {
                    var links = koalautil.splitChain(chain);
                    return koalautil.reduce(links, function (prev, cur) {
                        return koalainfix.get.call(prev, cur);
                    }, this);
                },
                writable: true,
                configurable: true
            },
            call: {
                value: function call(name) {
                    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                        args[_key - 1] = arguments[_key];
                    }

                    var prop = koalainfix.get.call(this, name);
                    if (typeof prop === "function" && prop.apply) {
                        return prop.apply(this, args);
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