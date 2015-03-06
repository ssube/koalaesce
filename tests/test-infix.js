let {get: kg, getNamed: kgn, call: kc, default: kd} = require('../dist/koalaesce-infix');
let assert = require('assert');

describe('koalaesce-infix', () => {
  describe('get', () => {
    it("should get a nested property one level down", () => {
        var obj = {foo: Math.random()};
        assert.equal(obj.foo, obj::kg('foo'));
    });

    it("should get a nested property two levels down", () => {
        var obj = {foo: {bar: Math.random()}};
        assert.equal(obj.foo.bar, obj::kg('foo')::kg('bar'));
    });

    it("should return null on missing properties", () => {
        var obj = {foo: {baz: Math.random()}};
        assert.equal(null, obj::kg('foo')::kg('bar'));
    });

    it("should get properties from the prototype", () => {
        function TestObject() {
          // nop
        }
        TestObject.prototype.value = Math.random();

        var obj = new TestObject();
        assert.equal(obj.value, obj::kg('value'));
    });

    it("should handle null base objects", () => {
        assert.equal(null, null::kg('foo')::kg('bar'));
    });

    it("should handle undefined base objects", () => {
        assert.equal(null, undefined::kg('foo')::kg('bar'));
    });

    it("should handle undefined links", () => {
        let obj = {foo: {bar: 3}};
        assert.equal(null, obj::kg('foo')::kg(undefined));
    });
  });

  describe('getNamed', () => {
    it("should get a property", () => {
        var obj = {foo: {bar: 3}};
        assert.equal(3, obj::kgn('foo.bar'));
    });

    it("should return null", () => {
        var obj = {foo: {bar: 3}};
        assert.equal(null, obj::kgn('foo.baz'));
    });
  });

  describe('call', () => {
    it("should invoke functions without arguments", () => {
        var obj = {foo: () => {
            return true;
        }};
        assert.equal(true, obj::kc('foo'));
    });

    it("should invoke functions with arguments", () => {
        var rand = Math.random();
        var obj = {foo: (a) => {
            return a;
        }};
        assert.equal(rand, obj::kc('foo', rand));
    });

    it("should throw when attempting to invoke a non-function", () => {
        var obj = {foo: 3};
        assert.equal(null, obj::kc('foo', 1, 2));
    });

    it("should handle deep, mixed chains", () => {
        var obj = {foo: {bar: () => { return {baz: 4}; }}};
        assert.equal(4, obj::kg('foo')::kc('bar')::kg('baz'));
    });

    it("should handle recursive chains", () => {
        var obj = {foo: {bar: (o) => o }};
        var alt = {baz: 4};
        assert.equal(4, obj::kg('foo')::kc('bar', obj)
                           ::kg('foo')::kc('bar', obj)
                           ::kg('foo')::kc('bar', alt)::kg('baz'));
    });

    it("should use the previous link as this scope", () => {
        // Don't replace this function () { ... } with an arrow func, it tests scope stuff
        var obj = {foo: {bar: 4, baz: function () { return this.bar; }}};
        assert.equal(4, obj::kg('foo')::kc('baz'));
    });

    it("should invoke methods from the prototype", () => {
        function TestObject() {
          this.value = Math.random();
        }
        TestObject.prototype.getValue = function () { 
          return this.value; 
        };

        var obj = new TestObject();
        assert.equal(obj.value, obj::kc('getValue'));
    });
  });

  describe('default', () => {
    it("should return the default", () => {
        var obj = {foo: {baz: 0}};
        assert.equal(3, obj::kg('foo')::kg('bar')::kd(3));
    });

    it("should handle null values along the chain", () => {
        var obj = {foo: null};
        assert.equal(3, obj::kg('foo')::kg('bar')::kd(3));
    });

    it("should handle null base objects", () => {
        assert.equal(3, null::kg('foo')::kg('bar')::kd(3));
    });
  });
});
