//let {MissingLinkError, NullLinkError, NotInvokableError} = require('./koalaesce-errors');

export default class koalainfix {
    static get(name) {
        if (this && this[name] !== 'undefined') {
            return this[name];
        } else {
            return null;
        }
    }

    static call(...args) {
        if (this && this.apply) {
            return this.apply(this, args);
        } else {
            return null;
        }
    }

    static default(def) {
        if (this) {
            return this;
        } else {
            return def;
        }
    }
}
