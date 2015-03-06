let koalautil = require('./koalaesce-util');

export default class koalainfix {
    static get(name) {
        if (koalautil.checkRef(this)) {
            return this[name];
        } else {
            return null;
        }
    }

    static call(name, ...args) {
        let prop = koalainfix.get.call(this, name);
        if (typeof prop === 'function' && prop.apply) {
            return prop.apply(this, args);
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
