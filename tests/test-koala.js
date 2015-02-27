var koalaesce = require("../dist/koalaesce");
var assert = require("assert");

describe("koalaesce", () => {
    it("should get a nested property one level down", () => {
        var obj = {foo: Math.random()};
        assert.equal(obj.foo, koalaesce.get(obj, "foo"));
    });

    it("should get a nested property two levels down", () => {
        var obj = {foo: {bar: Math.random()}};
        assert.equal(obj.foo.bar, koalaesce.get(obj, "foo", "bar"));
    });

    it("should throw on missing properties", () => {
        var obj = {foo: {baz: Math.random()}};
        assert.throws(() => {
            koalaesce.get(obj, "foo", "bar");
        });
    });

    it("should invoke functions without arguments", () => {
        var obj = {foo: () => {
            return true;
        }};
        assert.equal(true, koalaesce.get(obj, ["foo"]));
    });

    it("should invoke functions with arguments", () => {
        var rand = Math.random();
        var obj = {foo: (a) => {
            return a;
        }};
        assert.equal(rand, koalaesce.get(obj, ["foo", rand]));
    });

    it("should throw when attempting to invoke a non-function", () => {
        var obj = {foo: 3};
        assert.throws(() => {
            koalaesce.get(obj, ["foo", 1, 2]);
        });
    });

    it("should return the default", () => {
        var obj = {foo: {baz: 0}};
        assert.equal(3, koalaesce.getDefault(obj, 3, "foo", "bar"));
    });

    it("should not catch exceptions and default", () => {
        var obj = {foo: () => { throw new Error("Boom!"); }};
        assert.throws(() => {
            koalaesce.getDefault(obj, 3, ["foo"]);
        });
    });

    it("should handle null values along the chain", () => {
        var obj = {foo: null};
        assert.equal(3, koalaesce.getDefault(obj, 3, "foo", "bar"));
    });

    it("should handle deep, mixed chains", () => {
        var obj = {foo: {bar: () => { return {baz: 4}; }}};
        assert.equal(4, koalaesce.get(obj, "foo", ["bar"], "baz"));
    });

    it("should handle recursive chains", () => {
        var obj = {foo: {bar: (o) => o }};
        var alt = {baz: 4};
        assert.equal(4, koalaesce.get(obj, "foo", ["bar", obj], "foo", ["bar", obj], "foo", ["bar", alt], "baz"));
    });
});
