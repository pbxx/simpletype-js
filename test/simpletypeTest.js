const assert = require("chai").assert
var expect = require('chai').expect;
const st = require("../simpletype")

describe("Argument types with sequential array input", () => {
    it("should return a tcheck object containing { correct: true }", () => {
        let test = st.checkSimpleSync("string", "number", ["string", "number"], "array", ["johndoe", 42, "$57,000", [123, 456, 789]])

        assert.typeOf( test, "object" )
        assert.typeOf( test.correct, "boolean" )
        assert.equal( test.correct, true )
    }),
    it("should return same but with multiple, multi-type Arrays as type input", () => {
        let test = st.checkSimpleSync(["string", "boolean"], "number", ["string", "number"], ["array", "object"], [false, 42, 57000, { alfie: 123, fido: 456, golden: 789 }])

        assert.typeOf( test, "object" )
        assert.typeOf( test.correct, "boolean" )
        assert.equal( test.correct, true )
    }),
    it("should return an object containing { correct: false, failed: [{}] } property", () => {
        let test = st.checkSimpleSync("string", "number", ["string", "number"], "array", ["johndoe", 42, { foo: "bar" }, [123, 456, 789]])

        assert.typeOf( test, "object" )
        assert.typeOf( test.correct, "boolean" )
        assert.typeOf( test.failed[0], "object" )
        assert.typeOf( test.failed[0].index, "number" )
        assert.equal( test.failed[0].index, 2 )
        assert(Array.isArray(test.failed), `{ failed } property was not Array! Got ${typeof(test.failed)}...` )
        assert.equal( test.correct, false )
    })
})

describe("Argument types with sequential object input", () => {
    it("should return an object containing { correct: true }", () => {
        let test = st.checkSimpleSync("string", "number", ["string", "number"], "array", {username: "johndoe", age: 42, income: "$57,000", petIDs: [123, 456, 789]})

        assert.typeOf( test, "object" )
        assert.typeOf( test.correct, "boolean" )
        assert.equal( test.correct, true )
    }),
    it("should return same but with multiple, multi-type Arrays as type input", () => {
        let test = st.checkSimpleSync(["string", "boolean"], "number", ["string", "number"], ["array", "object"], {username: false, age: 42, income: 57000, petIDs: { alfie: 123, fido: 456, golden: 789 }})

        assert.typeOf( test, "object" )
        assert.typeOf( test.correct, "boolean" )
        assert.equal( test.correct, true )
    }),
    it("should return an object containing { correct: false, failed: [{}] } property", () => {
        let test = st.checkSimpleSync("string", "number", ["string", "number"], "array", {username: "johndoe", age: 42, income: { money: "$57,000" }, petIDs: [123, 456, 789]})

        assert.typeOf( test, "object" )
        assert.typeOf( test.correct, "boolean" )
        assert.typeOf( test.failed[0], "object" )
        assert.typeOf( test.failed[0].index, "string" )
        assert.equal( test.failed[0].index, "income" )
        assert(Array.isArray(test.failed), `{ failed } property was not Array! Got ${typeof(test.failed)}...` )
        assert.equal( test.correct, false )
    })
})

describe("Array types with sequential Array input", () => {
    it("should return an object containing { correct: true }", () => {
        let test = st.checkSync(["string", "number", ["string", "number"], "array"], [ "johndoe", 42, "$57,000", [123, 456, 789] ])

        assert.typeOf( test, "object" )
        assert.typeOf( test.correct, "boolean" )
        assert.equal( test.correct, true )
    }),
    it("should return same but with multiple, multi-type Arrays as type input", () => {
        let test = st.checkSync([["string", "boolean"], "number", ["string", "number"], ["array", "object"]], [ false, 42, 57000, { alfie: 123, fido: 456, golden: 789 } ])

        assert.typeOf( test, "object" )
        assert.typeOf( test.correct, "boolean" )
        assert.equal( test.correct, true )
    }),
    it("should return an object containing { correct: false, failed: [{}] } property", () => {
        let test = st.checkSync(["string", "number", ["string", "number"], "array"], [ "johndoe", 42, { money: "$57,000" }, [123, 456, 789] ])

        assert.typeOf( test, "object" )
        assert.typeOf( test.correct, "boolean" )
        assert.typeOf( test.failed[0], "object" )
        assert.typeOf( test.failed[0].index, "number" )
        assert.equal( test.failed[0].index, 2 )
        assert(Array.isArray(test.failed), `{ failed } property was not Array! Got ${typeof(test.failed)}...` )
        assert.equal( test.correct, false )
    })
})

describe("Array types with sequential Object input", () => {
    it("should return an object containing { correct: true }", () => {
        let test = st.checkSync(["string", "number", ["string", "number"], "array"], {username: "johndoe", age: 42, income: "$57,000", petIDs: [123, 456, 789]})

        assert.typeOf( test, "object" )
        assert.typeOf( test.correct, "boolean" )
        assert.equal( test.correct, true )
    }),
    it("should return same but with multiple, multi-type Arrays as type input", () => {
        let test = st.checkSync([["string", "boolean"], "number", ["string", "number"], ["array", "object"]], {username: false, age: 42, income: 57000, petIDs: { alfie: 123, fido: 456, golden: 789 }})

        assert.typeOf( test, "object" )
        assert.typeOf( test.correct, "boolean" )
        assert.equal( test.correct, true )
    }),
    it("should return an object containing { correct: false, failed: [{}] } property", () => {
        let test = st.checkSync(["string", "number", ["string", "number"], "array"], {username: "johndoe", age: 42, income: { money: "$57,000" }, petIDs: [123, 456, 789]})

        assert.typeOf( test, "object" )
        assert.typeOf( test.correct, "boolean" )
        assert.typeOf( test.failed[0], "object" )
        assert.typeOf( test.failed[0].index, "string" )
        assert.equal( test.failed[0].index, "income" )
        assert(Array.isArray(test.failed), `{ failed } property was not Array! Got ${typeof(test.failed)}...` )
        assert.equal( test.correct, false )
    })
})

describe("Object types with sequential Array input", () => {
    it("should return an object containing { correct: true }", () => {
        let test = st.checkSync({username: "string", age: "number", income: ["string", "number"], petIDs: "array"}, [ "johndoe", 42, "$57,000", [123, 456, 789] ])

        assert.typeOf( test, "object" )
        assert.typeOf( test.correct, "boolean" )
        assert.equal( test.correct, true )
    }),
    it("should return an object containing { correct: false, failed: [{}] } property", () => {
        let test = st.checkSync({username: "string", age: "number", income: ["string", "number"], petIDs: "array"}, [ "johndoe", 42, { money: "$57,000" }, [123, 456, 789] ])

        assert.typeOf( test, "object" )
        assert.typeOf( test.correct, "boolean" )
        assert.typeOf( test.failed[0], "object" )
        assert.typeOf( test.failed[0].index, "number" )
        assert.equal( test.failed[0].index, 2 )
        assert(Array.isArray(test.failed), `{ failed } property was not Array! Got ${typeof(test.failed)}...` )
        assert.equal( test.correct, false )
    })
})

describe("Object types with Object input", () => {
    it("should return an object containing { correct: true }", () => {
        let test = st.checkSync({username: "string", age: "number", income: ["string", "number"], petIDs: "array"}, {username: "johndoe", age: 42, income: "$57,000", petIDs: [123, 456, 789]})

        assert.typeOf( test, "object" )
        assert.typeOf( test.correct, "boolean" )
        assert.equal( test.correct, true )
    }),
    it("should return an object containing { correct: false, failed: [{}] } property", () => {
        let test = st.checkSync({username: "string", age: "number", income: ["string", "number"], petIDs: "array"}, {username: "johndoe", age: 42, income: { money: "$57,000" }, petIDs: [123, 456, 789]})

        assert.typeOf( test, "object" )
        assert.typeOf( test.correct, "boolean" )
        assert.typeOf( test.failed[0], "object" )
        assert.typeOf( test.failed[0].index, "string" )
        assert.equal( test.failed[0].index, "income" )
        assert(Array.isArray(test.failed), `{ failed } property was not Array! Got ${typeof(test.failed)}...` )
        assert.equal( test.correct, false )
    })
})

describe("Readme example", () => {
    it("from sync section should work", () => {
        let tcheck = st.checkSimpleSync("string", "array", ["number", "boolean"], [ "johndoe", [123, 456, 789], 42 ])

        assert.typeOf( tcheck, "object" )
        assert.typeOf( tcheck.correct, "boolean" )
        assert.equal( tcheck.correct, true )
    }),
    it("from async section should work", () => {
        st.checkSimple("string", "array", ["number", "boolean"], [ "johndoe", [123, 456, 789], 42 ])
        .then((tcheck) => {
            assert.typeOf( tcheck, "object" )
            assert.typeOf( tcheck.correct, "boolean" )
            assert.equal( tcheck.correct, true )
        })
        .catch((err) => {
            //an error occurred
        })
    }),
    it("array type input section should work", () => {
        let tcheck = st.checkSync(["string", "boolean"], { username: "johndoe", haspets: true })

        assert.typeOf( tcheck, "object" )
        assert.typeOf( tcheck.correct, "boolean" )
        assert.equal( tcheck.correct, true )
    }),
    it("object type input section should work", () => {
        let tcheck = st.checkSync({haspets: "boolean", username: "string" }, { username: "johndoe", haspets: true })

        assert.typeOf( tcheck, "object" )
        assert.typeOf( tcheck.correct, "boolean" )
        assert.equal( tcheck.correct, true )
    }),
    it("array safe typeof should work with objects", () => {
        let test = st.typeof( {foo: "bar", bar: "foo"} ) // "object"

        assert.typeOf( test, "string" )
        assert.equal( test, "object" )
    }),
    it("array safe typeof should work with arrays", () => {
        let test = st.typeof( ["foo", "bar"] ) // "array"

        assert.typeOf( test, "string" )
        assert.equal( test, "array" )
    })
})