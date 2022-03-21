let errorTag = "[simpleType]"

let checkArray = (arr, types) => {arr
    if (safeTypeof(types) == "array") {
        //in all situations except object mode, simpleType will need to process an ordered array of types
        if (types.length >= arr.length) {
            //this is correct
            let failed = []
            let correct = true
            
            for (let [j, item] of arr.entries()) {
                let itemCheck = checkItem(item, types[j])
                if (!itemCheck) {
                    correct = false
                    failed.push({ index: j, type: safeTypeof(item), expected: types[j] }) 
                }
                
            }
    
            return correct ? {correct} : {correct, failed}
        } else {
            throw new Error( `${errorTag} The amount of types provided to simpleType must be (at least) equivalent to the amount of items to check, got ${types.length} types, and ${arr.length} items to check from Array data...`)
        }
    } else if (safeTypeof(types) == "object") {
        //this is object mode, simpleType will need to check both keys and types, in no specific order
        //since this is an array operand, typish has no choice but to turn the types object into an ordered array
        let typesList = []
        let typeKeys = Object.keys(types)

        for (let [j, key] of typeKeys.entries()) {
            typesList.push(types[key])
        }

        if (typesList.length >= arr.length) {
            let failed = []
            let correct = true

            for (let [k, item] of arr.entries()) {
                let itemCheck = checkItem(item, typesList[k])
                if (!itemCheck) {
                    correct = false
                    failed.push({ index: k, type: safeTypeof(item), expected: typesList[k] }) 
                }
            }

            return correct ? {correct} : {correct, failed}
        } else {
            throw new Error( `${errorTag} The amount of types provided to simpleType must be (at least) equivalent to the amount of items to check, got ${types.length} types, and ${arr.length} items to check from Array data...`)
        }

    }
    
}

let checkObj = (obj, types) => {
    if (safeTypeof(types) == "array") {
        //in all situations except object mode, simpleType will need to process an ordered array of types
        let failed = []
        let objKeys = Object.keys(obj)

        if (types.length >= objKeys.length) {
            //this is correct
            let correct = true

            for (let [j, key] of objKeys.entries()) {
                let itemCheck = checkItem(obj[key], types[j])
                if (!itemCheck) {
                    correct = false
                    failed.push({ index: key, type: safeTypeof(obj[key]), expected: types[j] })
                }
                
            }

            return correct ? {correct} : {correct, failed}
        } else {
            throw new Error( `${errorTag} The amount of types provided to simpleType must be (at least) equivalent to the amount of items to check, got ${types.length} types, and ${arg.length} items to check from Object payload...`)
        }
    } else if (safeTypeof(types) == "object") {
        //this is object mode, simpleType will need to check both keys and types, in no specific order
        let typesList = {}
        let typeKeys = Object.keys(types)
        let objKeys = Object.keys(obj)


        let failed = []
        let correct = true
        for (let [k, key] of objKeys.entries()) {
            if (types[key]) {
                let itemCheck = checkItem(obj[key], types[key])
                if (!itemCheck) {
                    correct = false
                    failed.push({ index: key, type: safeTypeof(obj[key]), expected: types[key] }) 
                }
            }
        }

        return correct ? {correct} : {correct, failed}

    }
}

let checkItem = (item, type) => {
    //item will be either string or array
    if (safeTypeof(type) == "array") {
        let incorrect = true
        for ( let [i, typeItem] of type.entries() ) {
            if (safeTypeof(item) == typeItem) { incorrect = false }
        }
        return !incorrect
    } else {
        return (safeTypeof(item) == type)
    }
}

let safeTypeof = (value) => {
    return (Array.isArray(value)) ? "array" : typeof(value)
}

exports.check = (...args) => {
    return new Promise((resolve, reject) => {
        try {
            let tCheck = exports.checkSync(...args)
            resolve(tCheck)
        } catch (err) {
            reject(err)
        }
    })
}

exports.checkSync = (...args) => {
    //the last arg is the data payload, this may be a string csv, object, or array
    let types = []
    let output = {}
    for (let [i, arg] of args.entries()) {

        if (safeTypeof(args[0]) == "object") {
            //OBJECT TYPE MODE
            if (args.length == 2) {
                if (i == 0) {
                    //this is the first arg, its a types object
                    //replace the types array with it
                    types = {...args[0]}
                } else if (i == args.length-1) {
                    //this is the last arg
                    if (safeTypeof(arg) == "array") {
                        //it's an array, process it as such
                        return checkArray(arg, types)
        
                    } else if (safeTypeof(arg) == "object") {
                        //it's an object, process it as such
                        return checkObj(arg, types)
        
                    }
                }
            } else {
                throw new Error( `${errorTag} Exactly 2 arguments must be passed when using simpleType in Object mode`)
            }

        } else if (safeTypeof(args[0]) == "array" && args.length == 2) {
            //ARRAY TYPE MODE
            if (i == 0) {
                //this is the first arg, its a types array
                //replace the types array with it
                types = args[0]
            } else if (i == args.length-1) {
                //this is the last arg
                if (safeTypeof(arg) == "array") {
                    //it's an array, process it as such
                    return checkArray(arg, types)
    
                } else if (safeTypeof(arg) == "object") {
                    //it's an object, process it as such
                    return checkObj(arg, types)
    
                }
            }
            
        } else if ( safeTypeof(args[0]) == "string" || (safeTypeof(args[0]) == "array" && args.length > 2) ) {
            //MULTI ARG STRING TYPE MODE
            if (i != args.length-1) {
                //this is not the last arg
                if (args.length > 2) {
                    //more than 2 args, argument mode used
                    if (typeof(arg) == "string") {
                        //it's a string, pass it to types
                        types.push(arg)
                    } else if (safeTypeof(arg) == "array") {
                        //it's an array, pass it to types
                        types.push(arg)
                    } else {
                        throw new Error( `${errorTag} All types passed to simpleType must be string or array, got type "${typeof(arg)}" in arg ${i+1}...`)
                    }
                }
                
            } else {
                //this is the last arg, the data payload
                //first check its type

                if (safeTypeof(arg) == "array") {
                    //it's an array, process it as such
                    return checkArray(arg, types)
    
                } else if (safeTypeof(arg) == "object") {
                    //it's an object, process it as such
                    return checkObj(arg, types)
    
                }
    
            }
        }

        
    }
}

exports.typeof = safeTypeof