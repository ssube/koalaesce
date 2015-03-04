"use strict";

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var MissingLinkError = (function (Error) {
    function MissingLinkError(link) {
        _classCallCheck(this, MissingLinkError);

        _get(Object.getPrototypeOf(MissingLinkError.prototype), "constructor", this).call(this, "Missing link at " + link);
    }

    _inherits(MissingLinkError, Error);

    return MissingLinkError;
})(Error);

var NullLinkError = (function (Error) {
    function NullLinkError(link) {
        _classCallCheck(this, NullLinkError);

        _get(Object.getPrototypeOf(NullLinkError.prototype), "constructor", this).call(this, "Encountered a null link at " + link);
    }

    _inherits(NullLinkError, Error);

    return NullLinkError;
})(Error);

var NotInvokableError = (function (Error) {
    function NotInvokableError(link) {
        _classCallCheck(this, NotInvokableError);

        _get(Object.getPrototypeOf(NotInvokableError.prototype), "constructor", this).call(this, "Attempting to invoke non-function at " + link);
    }

    _inherits(NotInvokableError, Error);

    return NotInvokableError;
})(Error);

function koalaesce_reducePass(scope, cb, initial) {
    return scope.reduce(cb, initial);
}

function koalaesce_reduceShim(scope, cb, initial) {
    var value = initial;
    for (var i = 0; i < scope.length; ++i) {
        value = cb(value, scope[i]);
    }
    return value;
}

var reduceImpl = Array.prototype.reduce ? koalaesce_reducePass : koalaesce_reduceShim;

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

                return reduceImpl(steps, function (prev, cur) {
                    if (cur === null) {
                        return null;
                    } else if (prev === null) {
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
            value: function getNamedOrDefault(base, def, name) {
                var steps = name.split(".");
                return koalaesce.getOrDefault.apply(koalaesce, [base, def].concat(_toConsumableArray(steps)));
            },
            writable: true,
            configurable: true
        }
    });

    return koalaesce;
})();

module.exports = koalaesce;