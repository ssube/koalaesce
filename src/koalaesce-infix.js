//let {MissingLinkError, NullLinkError, NotInvokableError} = require('./koalaesce-errors');

export default class koalainfix {
    static get(name) {
        if (this !== undefined && this !== null) {
            return this[name];
        } else {
            return null;
        }
    }

    static call(...args) {
        if (typeof this === 'function' && this.apply) {
            return this.apply(this, args);
        } else {
            return null;
        }
    }

    static default(def) {
        if (this !== undefined && this !== null) {
            return this;
        } else {
            return def;
        }
    }
}
