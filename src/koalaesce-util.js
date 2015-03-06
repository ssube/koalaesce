export default class koalautil {
    static reduce(scope, cb, initial) {
        if (Array.prototype.reduce && scope && scope.constructor === Array) {
            return scope.reduce(cb, initial);
        } else {
	    let value = initial;
	    for (let i = 0; i < scope.length; ++i) {
		value = cb(value, scope[i]);
	    }
        }
    }

    static checkRef(ref) {
        return (ref !== undefined && ref !== null);
    }
}
