var koalaesce = require("../dist/koalaesce").koalaesce;

describe("koalaesce", function () {
    it("should get a nested property one level down", function () {
        var obj = {foo: Math.random()};
        expect(koalaesce(obj, "foo")).toEqual(obj.foo);
    });

    it("should get a nested property two levels down", function () {
        var obj = {foo: {bar: Math.random()}};
        expect(koalaesce(obj, "foo", "bar")).toEqual(obj.foo.bar);
    });

    it("should throw on missing properties", function () {
        var obj = {foo: {baz: Math.random()}};
        expect(function () {
            koalaesce(obj, "foo", "bar");
        }).toThrow();
    });

    it("should invoke functions without arguments", function () {
        var obj = {foo: function () {
            return true;
        }};
        expect(koalaesce(obj, ["foo"])).toBe(true);
    });

    it("should invoke functions with arguments", function () {
        var rand = Math.random();
        var obj = {foo: function (a) {
            return a;
        }};
        expect(koalaesce(obj, ["foo", rand])).toEqual(rand);
    });

    it("should throw when attempting to invoke a non-function", function () {
        var obj = {foo: 3};
        expect(function () {
            koalaesce(obj, ["foo", 1, 2]);
        }).toThrow();
    });
});
