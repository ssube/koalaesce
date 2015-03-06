define(["exports", "module"], function (exports, module) {
    "use strict";

    var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

    var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    var _require = require("./koalaesce-errors");

    var MissingLinkError = _require.MissingLinkError;
    var NullLinkError = _require.NullLinkError;
    var NotInvokableError = _require.NotInvokableError;

    var koalautil = require("./koalaesce-util");

    var koalaesce = (function () {
        function koalaesce() {
            _classCallCheck(this, koalaesce);
        }

        _prototypeProperties(koalaesce, {
            get: {
                value: function get(base) {
                    for (var _len = arguments.length, steps = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                        steps[_key - 1] = arguments[_key];
                    }

                    return koalaesce.getOrDefault.apply(koalaesce, [base, null].concat(steps));
                },
                writable: true,
                configurable: true
            },
            getOrDefault: {
                value: function getOrDefault(base, def) {
                    for (var _len = arguments.length, steps = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                        steps[_key - 2] = arguments[_key];
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
                },
                writable: true,
                configurable: true
            },
            getOrThrow: {
                value: function getOrThrow(base) {
                    for (var _len = arguments.length, steps = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                        steps[_key - 1] = arguments[_key];
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
                },
                writable: true,
                configurable: true
            },
            getNamed: {
                value: function getNamed(base, name) {
                    return koalaesce.getNamedOrDefault(base, null, name);
                },
                writable: true,
                configurable: true
            },
            getNamedOrDefault: {
                value: function getNamedOrDefault(base, def, chain) {
                    var steps = koalautil.splitChain(chain);
                    return koalaesce.getOrDefault.apply(koalaesce, [base, def].concat(_toConsumableArray(steps)));
                },
                writable: true,
                configurable: true
            }
        });

        return koalaesce;
    })();

    module.exports = koalaesce;
});