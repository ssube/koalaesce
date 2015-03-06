define(["exports", "module"], function (exports, module) {
    "use strict";

    var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    var koalautil = (function () {
        function koalautil() {
            _classCallCheck(this, koalautil);
        }

        _prototypeProperties(koalautil, {
            reduce: {
                value: function reduce(scope, cb, initial) {
                    if (Array.prototype.reduce && scope && scope.constructor === Array) {
                        return scope.reduce(cb, initial);
                    } else {
                        var value = initial;
                        for (var i = 0; i < scope.length; ++i) {
                            value = cb(value, scope[i]);
                        }
                    }
                },
                writable: true,
                configurable: true
            },
            checkRef: {
                value: function checkRef(ref) {
                    return ref !== undefined && ref !== null;
                },
                writable: true,
                configurable: true
            },
            splitChain: {
                value: function splitChain(chain) {
                    return chain.split(".");
                },
                writable: true,
                configurable: true
            }
        });

        return koalautil;
    })();

    module.exports = koalautil;
});