let {get: kg, call: kc, default: kd} = require('../dist/koalaesce-infix');
let assert = require('assert');

describe('koalaesce-infix', () => {
    describe('get', () => {
        it('should return nested properties', () => {
            let obj = {foo: {bar: 3}};
            assert.equal(3, obj::kg('foo')::kg('bar'));
        });
    });

    describe('call', () => {
        it('should invoke single-argument methods', () => {
            let obj = {foo: (a) => { return {bar: a}; }};
            assert.equal(9, obj::kc('foo', 9)::kg('bar'));
        });

        it('should invoke multi-argument methods', () => {
            let obj = {foo: (a, b, c) => { return {bar: a + b + c}; }};
            assert.equal(20, obj::kc('foo', 4, 6, 10)::kg('bar'));
        });
    });

    describe('default', () => {
        it('should return the value', () => {
            let obj = {foo: {bar: 3}};
            assert.equal(3, obj::kg('foo')::kg('bar')::kd(4));
        });

        it('should return the default', () => {
            let obj = {foo: null};
            assert.equal(4, obj::kg('foo')::kg('bar')::kd(4));
        });
    });
});
