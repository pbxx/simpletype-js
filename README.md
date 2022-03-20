<p align="center">
  <img src="https://ffpublishing.org/resources/img/simpletype/st-gitbanner.png?">
</p>

A quick and easy, lightweight, array-safe, multi-purpose type checker for Node.js

```js
const st = require('simpletype')

function myStrictFunction(name, age, income, pets) {
    let tcheck = st.checkSync("string", "number", ["string", "number"], "array", arguments)
    if (tcheck.correct) {
        //all arguments were of correct type
        
    } else {
        //one or more values were of incorrect type

    }
}
```

# Installation
Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
> npm i simpletype
```

# How it works 
simpleType returns information about item types with a ```tcheck``` object, such as the examples below...

If all values passed to simpleType match the required types, the ```tcheck``` object will only have one property, ```correct```:
```js
{ correct: true }
```

If one or more failed the check, ```tcheck.correct``` will be false, and a  ```failed``` array is added, to provide details on each value that failed.
```js
{
  correct: false,
  failed: [ { index: 1, type: 'number', expected: 'string' } ]
}
```
As seen above, for values passed in Arrays, an index number of the incorrect value is provided for each failed value, as well as the type provided and expected.

For values passed in Objects, the index property provides the key name of the failed value, instead:
```js
{
  correct: false,
  failed: [ { index: "username", type: 'number', expected: 'string' } ]
}
```

# Getting started
### Sychronous
```st.checkSync()``` is used to do a basic type check, synchronously:

```js
const st = require('simpletype')

let tcheck = st.checkSync("string", "number", "number", arguments)
if (tcheck.correct) {
    //all values were of correct type

} else {
    //one or more values were of incorrect type

}

```
### Asynchronous
The ```st.check()``` function behaves exactly the same as the synchronous version, just as a promise:

```js
const st = require('simpletype')

st.check("string", "number", "number", /* any ordered Array or Object of values to check */)
.then((tcheck) => {
    if (tcheck.correct) {
        //all values were of correct type
    } else {
        //one or more values were of incorrect type
    }
})
.catch((err) => {
    //an error occured
})

```

# Extended Features

For ease of use, simpleType allows you to pass types and arguments in multiple ways... 

If typing required types as arguments isn't your style, simpleType allows you to use Arrays and Objects as well:

```js
let tcheck = st.checkSync(["string", "boolean"], { username: "johndoe", haspets: true })
/* et cetera */

```

If you pass both types and values as Objects, the order of the values no longer matter! simpleType will check the type of each item by key:

```js
let tcheck = st.checkSync({haspets: "boolean", username: "string" }, { username: "johndoe", haspets: true })
/* { correct: true } */

```

It is important to note that when using Arrays or Objects, instead of string arguments as types, simpleType will only accept exactly 2 arguments...


# Extras
### Array-safe typeof()

The vanilla JS ```typeof()``` function doesnt know the difference between Arrays ```[]``` and Objects ```{}``` normally, so some basic extra code is required to check for arrays. 

Since this function is used often in simpleTypes, it is exported as an extra feature in case it's ever needed:
```js
st.typeof( {foo: "bar", bar: "foo"} ) // "object"
st.typeof( ["foo", "bar"] ) // "array"
```

Happy typing! 

