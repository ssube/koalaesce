class MissingLinkError extends Error {
    constructor(link) {
        super("Missing link at " + link);
    }
}

class NullLinkError extends Error {
    constructor(link) {
        super("Encountered a null link at " + link);
    }
}

class NotInvokableError extends Error {
    constructor(link) {
        super("Attempting to invoke non-function at " + link);
    }
}

export class koalaesce {
    static impl(base, steps) {
        return steps.reduce((prev, cur) => {
            if (cur === null) {
                return null;
            } else if (prev === null) {
                throw new NullLinkError(cur);
            } else if (cur.constructor === Array) {
                let name = cur[0], args = cur.slice(1);
                let next = prev[name];
                if (next && next.apply) {
                    return next.apply(this, args);
                } else {
                    throw new NotInvokableError(name);
                }
            } else if (prev.hasOwnProperty(cur)) {
                return prev[cur];
            } else {
                throw new MissingLinkError(cur);
            }
        }, base);
    }

    static get(base, ...steps) {
        return koalaesce.impl(base, steps);
    }

    static getDefault(base, def, ...steps) {
        try {
            return koalaesce.impl(base, steps);
        } catch (e) {
            if (e.constructor === MissingLinkError || e.constructor === NullLinkError) {
                return def;
            } else {
                throw e;
            }
        }
    }
}
