let koalautil = require('./koalaesce-util');

export default class koalainfix {
    static get(name) {
        if (koalautil.checkRef(this)) {
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
        if (koalautil.checkRef(this)) {
            return this;
        } else {
            return def;
        }
    }
}
