export function koalaesce(base, ...steps) {
    return steps.reduce((prev, cur) => {
        if (cur === null) {
            return null;
        } else if (cur.constructor === Array) {
            let name = cur[0], args = cur.slice(1);
            let next = prev[name];
            if (next && next.apply) {
                return next.apply(this, args);
            } else {
                throw new Error("Attempting to invoke non-function at " + name);
            }
        } else if (prev.hasOwnProperty(cur)) {
            return prev[cur];
        } else {
            throw new Error("Missing link at " + cur);
        }
    }, base);
}
