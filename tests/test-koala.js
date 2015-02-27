var koalaesce = require("../dist/koalaesce").koalaesce;

describe("koalaesce", function () {
    it("should get a nested property one level down", function () {
        var obj = {foo: Math.random()};
        expect(koalaesce.get(obj, "foo")).toBe(obj.foo);
    });

    it("should get a nested property two levels down", function () {
        var obj = {foo: {bar: Math.random()}};
        expect(koalaesce.get(obj, "foo", "bar")).toBe(obj.foo.bar);
    });

    it("should throw on missing properties", function () {
        var obj = {foo: {baz: Math.random()}};
        expect(function () {
            koalaesce.get(obj, "foo", "bar");
        }).toThrow();
    });

    it("should invoke functions without arguments", function () {
        var obj = {foo: function () {
            return true;
        }};
        expect(koalaesce.get(obj, ["foo"])).toBe(true);
    });

    it("should invoke functions with arguments", function () {
        var rand = Math.random();
        var obj = {foo: function (a) {
            return a;
        }};
        expect(koalaesce.get(obj, ["foo", rand])).toBe(rand);
    });

    it("should throw when attempting to invoke a non-function", function () {
        var obj = {foo: 3};
        expect(function () {
            koalaesce.get(obj, ["foo", 1, 2]);
        }).toThrow();
    });

    it("should return the default", function () {
        var obj = {foo: {baz: 0}};
        expect(koalaesce.getDefault(obj, 3, "foo", "bar")).toBe(3);
    });

    it("should not catch exceptions and default", function () {
        var obj = {foo: function () { throw new Error("Boom!"); }};
        expect(function () {
            koalaesce.getDefault(obj, 3, ["foo"]);
        }).toThrow();
    });

    it("should handle null values along the chain", function () {
        var obj = {foo: null};
        expect(koalaesce.getDefault(obj, 3, "foo", "bar")).toBe(3);
    })
});
