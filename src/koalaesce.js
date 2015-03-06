let {MissingLinkError, NullLinkError, NotInvokableError} = require('./koalaesce-errors');

function koalaesce_reducePass(scope, cb, initial) {
    return scope.reduce(cb, initial);
}

function koalaesce_reduceShim(scope, cb, initial) {
    let value = initial;
    for (let i = 0; i < scope.length; ++i) {
        value = cb(value, scope[i]);
    }
    return value;
}

let reduceImpl = Array.prototype.reduce ? koalaesce_reducePass : koalaesce_reduceShim;

export default class koalaesce {
    static get(base, ...steps) {
        return koalaesce.getOrDefault(base, null, ...steps);
    }

    static getOrDefault(base, def, ...steps) {
        try {
            return koalaesce.getOrThrow(base, ...steps);
        } catch (e) {
            if (e.constructor === MissingLinkError || e.constructor === NullLinkError) {
                return def;
            } else {
                throw e;
            }
        }
    }

    static getOrThrow(base, ...steps) {
        return reduceImpl(steps, (prev, cur) => {
            if (cur === null) {
                return null;
            } else if (prev === null) {
                throw new NullLinkError(cur);
            } else if (cur.constructor === Array) {
                let name = cur[0], args = cur.slice(1);
                let next = prev[name];
                if (next && next.apply) {
                    return next.apply(prev, args);
                } else {
                    throw new NotInvokableError(name);
                }
            } else if (prev[cur] !== undefined) {
                return prev[cur];
            } else {
                throw new MissingLinkError(cur);
            }
        }, base);
    }

    static getNamed(base, name) {
        return koalaesce.getNamedOrDefault(base, null, name);
    }

    static getNamedOrDefault(base, def, name) {
        let steps = name.split('.');
        return koalaesce.getOrDefault(base, def, ...steps);
    }
}
