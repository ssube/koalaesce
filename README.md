# koalaesce
## About
A simple null-coalescing library for JS, providing behavior much like 
[C#'s `??` operator](https://msdn.microsoft.com/en-us/library/ms173224.aspx) or 
[Groovy's `?.` operator](http://groovy.codehaus.org/Operators#Operators-ElvisOperator(?:)).

`koalaesce.get` allows you to pass a base object and chain of property names and retrieve the last link in the chain,
without worrying about the intermediate null checks. It also features invocation of functions found along the way, and
the ability to specify a default value if the chain could not be resolved.

## Usage
`koalaesce` is set up as a utility class, so you should start by requiring it:

    let koalaesce = require("./koalaesce");

The gulpfile included with `koalaesce` builds modules for AMD, CommonJS, and UMD loaders, so `koalaesce` should be
compatible with most module systems and is usable from the browser as well as node/io tools.

Two primary methods are exposed from this class: `get` and `getDefault`.

### `get`
`koalaesce.get` works down through a chain, returning the last link (if it can be found). It throws if a link is
missing or a null link is encountered before the end of the chain. For example:

    let obj = {foo: {bar: 3}};
    koalaesce.get(obj, "foo", "bar") === 3;
    
    let obj = {foo: null};
    try {
      koalaesce.get(obj, "foo", "bar");
    } catch (e) {
      // Throws since foo is null, but we still need bar
    }
    
    let obj = {foo: {baz: 3}};
    try {
      koalaesce.get(obj, "foo", "bar");
    } catch (e) {
      // Throws since foo does not have a bar, only baz
    }

To invoke a function encountered along the chain, the function name (and any arguments) should be provided as an
array:

    let obj = {foo: (a) => { return a+1; }};
    koalaesce.get(obj, ["foo", 2]) === 3;

Normal links *must not* be provided as an array, `koalaesce` uses arrays to detect when it should attempt to invoke a
link.

### `getDefault`
`koalaesce.getDefault` behaves almost identically to `koalaesce.get`, but when `get` would throw a `MissingLinkError`
or `NullLinkError`, the default value is returned instead:

    let obj = {foo: null};
    koalaesce.getDefault(obj, 3, "foo", "bar") === 3;
    
    let obj = {foo: {baz: 3}};
    koalaesce.getDefault(obj, 4, "foo", "bar") === 4;
