let {MissingLinkError, NullLinkError, NotInvokableError} = require('./koalaesce-errors');
let koalautil = require('./koalaesce-util');

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
        return koalautil.reduce(steps, (prev, cur) => {
            if (!koalautil.checkRef(cur)) {
                return null;
            } else if (!koalautil.checkRef(prev)) {
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

    static getNamedOrDefault(base, def, chain) {
        let steps = koalautil.splitChain(chain);
        return koalaesce.getOrDefault(base, def, ...steps);
    }
}
