# koalaesce

[![Build Status](https://travis-ci.org/ssube/koalaesce.svg?branch=master)](https://travis-ci.org/ssube/koalaesce)
[![Code Climate](https://codeclimate.com/github/ssube/koalaesce/badges/gpa.svg)](https://codeclimate.com/github/ssube/koalaesce)
[![Test Coverage](https://codeclimate.com/github/ssube/koalaesce/badges/coverage.svg)](https://codeclimate.com/github/ssube/koalaesce)
[![Dependency Status](https://david-dm.org/ssube/koalaesce.svg)](https://david-dm.org/ssube/koalaesce) 
[![devDependency Status](https://david-dm.org/ssube/koalaesce/dev-status.svg)](https://david-dm.org/ssube/koalaesce#info=devDependencies)

## About
A simple null-coalescing library for JS, providing behavior much like 
[C#'s `??` operator](https://msdn.microsoft.com/en-us/library/ms173224.aspx) or 
[Groovy's `?.` operator](http://groovy.codehaus.org/Operators#Operators-ElvisOperator(?:)). Includes an ES7-compatible
infix implementation as well as a more traditional utility class.

`koalaesce.get` allows you to pass a base object and chain of property names and retrieve the last link in the chain,
without worrying about the intermediate null checks. It also features invocation of functions found along the way, and
the ability to specify a default value if the chain could not be resolved.

## Usage
`koalaesce` is set up as a utility class, so you should start by requiring it:

    let koalaesce = require("koalaesce");

or if you would like the infix version:

    let {get: kg, call: kc, default: kd} = require("./node_modules/koalaesce/dist/koalaesce-infix");

The gulpfile included with `koalaesce` builds modules for AMD, CommonJS, and UMD loaders, so `koalaesce` should be
compatible with most module systems and is usable from the browser as well as node/io tools.

Two primary methods are exposed from this class: `get` and `getOrDefault`. For users preferring exceptions over
null, the `getOrThrow` method is provided. All use the same underlying implementation.

### `get`
`koalaesce.get` works down through a chain, returning the last link (if it can be found). If a link is missing or a
null link is encountered before the end of the chain, it will return null. For example:

    let obj = {foo: {bar: 3}};
    koalaesce.get(obj, "foo", "bar") === 3;
    
    let obj = {foo: null};
    koalaesce.get(obj, "foo", "bar") === null; // null since foo is null, but we still need bar
    
    let obj = {foo: {baz: 3}};
    koalaesce.get(obj, "foo", "bar") === null; // null since foo does not have a bar, only baz

To invoke a function encountered along the chain, the function name (and any arguments) should be provided as an
array:

    let obj = {foo: (a) => { return a+1; }};
    koalaesce.get(obj, ["foo", 2]) === 3;

Normal links *must not* be provided as an array, `koalaesce` uses arrays to detect when it should attempt to invoke a
link.

### `getOrDefault`
`koalaesce.getOrDefault` behaves almost identically to `koalaesce.get`, but allows you to specify a default value to be
returned rather than `null`:

    let obj = {foo: null};
    koalaesce.getOrDefault(obj, 3, "foo", "bar") === 3;
    
    let obj = {foo: {baz: 3}};
    koalaesce.getOrDefault(obj, 4, "foo", "bar") === 4;

### `getOrThrow`
`koalaesce.getOrThrow` will throw an exception rather than returning null if a missing or null link is encountered:

    let obj = {foo: null};
    try {
        koalaesce.get(obj, "foo", "bar");
    } catch (e) {
        e.constructor === NullLinkError;
    }

    let obj = {foo: {baz: 3}};
    try {
        koalaesce.get(obj, "foo", "bar");
    } catch (e) {
        e.constructor === MissingLinkError;
    }

This can be useful in environments where an exception may trigger other behavior, or if a stacktrace is desired. The
link where the error was encountered will be included in the error message.

### `getNamed`
`koalaesce.getNamed` behaves much like `koalaesce.get`, but only takes two arguments: the base object and a string of all links in the chain, separated by `.`s. This is stylistically similar to using the `obj.foo.bar` syntax, with the additional checks `koalaesce` provides.

    let obj = {foo: {bar: 3}};
    koalaesce.getNamed(obj, "foo.bar") === 3;

**Note:** This does not support property names containing the '.' character, yet. Support for those is planned.

### `getNamedOrDefault`
`koalaesce.getNamedOrDefault` behaves much like `koalaesce.getOrDefault`, but only takes three arguments: the base object, a default return value, and a string of links in the chain. It uses the same '.'-separated behavior as `getNamed`:

    let obj = {foo: {baz: 3}};
    koalaesce.getNamedOrDefault(obj, 4, "foo.bar") === 4;

**Note:** The same caveat about property names containing the '.' character applies to `getNamedOrDefault` as to `getNamed`.

### **Infix Usage**
`koalaesce` provides an experimental ES7 implementation, using abstract references and infix calls.

Methods are provided to get a property, call a method, and get a default value, all of which can be called on a
variable or object and chained with one another.

**Note:** using this version requires the `experimental` flag to be set in your BabelJS options.

#### `koalainfix.get`

    let obj = {foo: {bar: 3}};
    obj::kg('foo')::kg('bar') === 3;

#### `koalainfix.call`

    let obj = {foo: (a) => { return a+1; }};
    obj::kg('foo')::kc(3) === 4;

#### `koalainfix.default`

    let obj = {foo: null};
    obj::kg('foo')::kg('bar')::kd(20) === 20;
