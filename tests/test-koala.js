var koalaesce = require("../dist/koalaesce");
var assert = require("assert");

describe("koalaesce", function () {
    it("should get a nested property one level down", function () {
        var obj = {foo: Math.random()};
        assert.equal(obj.foo, koalaesce.get(obj, "foo"));
    });

    it("should get a nested property two levels down", function () {
        var obj = {foo: {bar: Math.random()}};
        assert.equal(obj.foo.bar, koalaesce.get(obj, "foo", "bar"));
    });

    it("should throw on missing properties", function () {
        var obj = {foo: {baz: Math.random()}};
        assert.throws(function () {
            koalaesce.get(obj, "foo", "bar");
        });
    });

    it("should invoke functions without arguments", function () {
        var obj = {foo: function () {
            return true;
        }};
        assert.equal(true, koalaesce.get(obj, ["foo"]));
    });

    it("should invoke functions with arguments", function () {
        var rand = Math.random();
        var obj = {foo: function (a) {
            return a;
        }};
        assert.equal(rand, koalaesce.get(obj, ["foo", rand]));
    });

    it("should throw when attempting to invoke a non-function", function () {
        var obj = {foo: 3};
        assert.throws(function () {
            koalaesce.get(obj, ["foo", 1, 2]);
        });
    });

    it("should return the default", function () {
        var obj = {foo: {baz: 0}};
        assert.equal(3, koalaesce.getDefault(obj, 3, "foo", "bar"));
    });

    it("should not catch exceptions and default", function () {
        var obj = {foo: function () { throw new Error("Boom!"); }};
        assert.throws(function () {
            koalaesce.getDefault(obj, 3, ["foo"]);
        });
    });

    it("should handle null values along the chain", function () {
        var obj = {foo: null};
        assert.equal(3, koalaesce.getDefault(obj, 3, "foo", "bar"));
    });

    it("should handle deep, mixed chains", function () {
        var obj = {foo: {bar: function () { return {baz: 4}; }}};
        assert.equal(4, koalaesce.get(obj, "foo", ["bar"], "baz"));
    });

    it("should handle recursive chains", function () {
        var obj = {foo: {bar: function (o) { return o; }}};
        var alt = {baz: 4};
        assert.equal(4, koalaesce.get(obj, "foo", ["bar", obj], "foo", ["bar", obj], "foo", ["bar", alt], "baz"));
    });
});
