<p align="center">
  <a href="https://ci.appveyor.com/project/pbxx/simpletype-js"><img src="https://ci.appveyor.com/api/projects/status/af453ykolpvrhpwk?svg=true"></a>
  <a href="https://ci.appveyor.com/project/pbxx/simpletype-js/build/tests"><img src="https://img.shields.io/appveyor/tests/pbxx/simpletype-js"></a>
  <a href="https://www.npmjs.com/package/simpletype-js"><img src="https://img.shields.io/npm/v/simpletype-js"></a>
</p>

<p align="center">
  <img src="https://public.pbxdesign.xyz/simpletype-js/st-gitbanner.png">
</p>

<h2 align="center">simpletype-js</h2>
<p align="center">
  A quick and easy, lightweight, array-safe, multi-purpose type checker for Node.js
</p>

```js
const st = require('simpletype-js')

function myStrictFunction(name, age, income, pets) {
    //Example usage for functions:
    let tcheck = st.checkSimpleSync("string", "number", ["string", "number"], "array", arguments)
    if (tcheck.correct) {
        //all arguments were of correct type
        
    } else {
        //one or more arguments were not of correct type
        //use tcheck.failed for specific info
    }
}
```

# Installation
Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm i simpletype-js
```

# Getting started
With the ```checkSimple()``` and ```checkSimpleSync()``` method, simpleType takes multiple type string arguments (or Array arguments for multiple acceptable types), then checks an ordered Array/Object of values, returning a ```tcheck``` object:
### Synchronous
```js
const st = require('simpletype-js')

let tcheck = st.checkSimpleSync("string", "array", ["number", "boolean"], [ "johndoe", [123, 456, 789], 42 ])
if (tcheck.correct) {
    //all values were of correct type

} else {
    //one or more values were of incorrect type

}
```

### Asynchronous
The ```check()``` and ```checkSimple()``` methods behave exactly the same as the synchronous versions, just as promises:
```js
const st = require('simpletype-js')

st.checkSimple("string", "array", ["number", "boolean"], [ "johndoe", [123, 456, 789], 42 ])
.then((tcheck) => {
    if (tcheck.correct) {
        //all values were of correct type
    } else {
        //one or more values were of incorrect type
    }
})
.catch((err) => {
    //an error occurred
})

```

# How it works 
simpleType returns type information using a ```tcheck``` object, such as the examples below...

If all values passed to simpleType match the required types, the ```tcheck``` object will only have one property, ```correct```:
```js
{ correct: true }
```

If one or more failed the check, ```tcheck.correct``` will be false, and a  ```tcheck.failed``` array is added to provide specifics on the failed values:
```js
{
  correct: false,
  failed: [ { index: 1, type: 'number', expected: 'string' } ]
}
```
As seen above, for values passed in ordered-Arrays, an index number is provided for each failed value, as well as the type provided and expected.

For values passed in Objects, the index property provides the key name of the failed value instead:
```js
{
  correct: false,
  failed: [ { index: "username", type: 'number', expected: 'string' } ]
}
```


# Extended Features
Using the ```check()``` and```checkSync()``` methods, simpleType can take an Array or Object of required type strings as the first argument:

```js
let tcheck = st.checkSync( ["string", "boolean"], { username: "johndoe", haspets: true } )
/* { correct: true } */

```

If you pass both types and values as Objects, the order of values no longer matter! simpleType will check the type of each item by key:

```js
let tcheck = st.checkSync( {haspets: "boolean", username: "string" }, { username: "johndoe", haspets: true } )
/* { correct: true } */

```

It is important to note that when using the ```check()``` and```checkSync()``` methods, simpleType will only accept exactly 2 arguments...


# Extras
### Array-safe typeof()

The vanilla JS ```typeof()``` function doesn't know the difference between Arrays ```[]``` and Objects ```{}``` normally, so some basic extra code is required to check for arrays. 

Since this function is used often in simpleTypes, it is exported as an extra feature in case it's ever needed:
```js
st.typeof( {foo: "bar", bar: "foo"} ) // "object"
st.typeof( ["foo", "bar"] ) // "array"
```

Happy typing! 

