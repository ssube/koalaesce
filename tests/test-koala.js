var koalaesce = require("../dist/koalaesce");
var assert = require("assert");

describe("koalaesce", () => {
  describe("get", () => {
    it("should get a nested property one level down", () => {
        var obj = {foo: Math.random()};
        assert.equal(obj.foo, koalaesce.get(obj, "foo"));
    });

    it("should get a nested property two levels down", () => {
        var obj = {foo: {bar: Math.random()}};
        assert.equal(obj.foo.bar, koalaesce.get(obj, "foo", "bar"));
    });

    it("should return null on missing properties", () => {
        var obj = {foo: {baz: Math.random()}};
        assert.equal(null, koalaesce.get(obj, "foo", "bar"));
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

    it("should handle deep, mixed chains", () => {
        var obj = {foo: {bar: () => { return {baz: 4}; }}};
        assert.equal(4, koalaesce.get(obj, "foo", ["bar"], "baz"));
    });

    it("should handle recursive chains", () => {
        var obj = {foo: {bar: (o) => o }};
        var alt = {baz: 4};
        assert.equal(4, koalaesce.get(obj, "foo", ["bar", obj], "foo", ["bar", obj], "foo", ["bar", alt], "baz"));
    });

    it("should use the previous link as this scope", () => {
        // Don't replace this function () { ... } with an arrow func, it tests scope stuff
        var obj = {foo: {bar: 4, baz: function () { return this.bar }}};
        assert.equal(4, koalaesce.get(obj, "foo", ["baz"]));
    });
  });

  describe("getOrThrow", () => {
    it("should throw on missing properties", () => {
        var obj = {foo: {baz: Math.random()}};
        assert.throws(() => {
            koalaesce.getOrThrow(obj, "foo", "bar");
        });
    });

    it("should get present properties", () => {
        var obj = {foo: {bar: Math.random()}};
        assert.equal(obj.foo.bar, koalaesce.getOrThrow(obj, "foo", "bar"));
    });
  });

  describe("getOrDefault", () => {
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
  });
});
