const capturedResolveExample = () => {
    let capturedResolve;
    new Promise((resolve, reject) => {
	capturedResolve = resolve;
    })
	.then((v) => v * 17)
	.then((v) => {
	    console.log(`The promise has been resolved with a value of: ${v}`)
	});

    return capturedResolve;
}
// Weird promise stuff
// There is also this weird situation
const objectExample = () => {
    return Promise.resolve({
	someKey: () => {
	    console.log("Thing without a then!")
	}
    })
}
const thenObjectExample = () => {
    return Promise.resolve({
	then: () => {
	    console.log("Thing with a then!");

	    return 10;
	}
    }) // strange behavior if the returned object has a 'then' function
}
const fancyThenObjectExample = () => {
    return Promise.resolve({
	then: (fn) => {
	    console.log("fn", fn);

	    fn(10)
	}
    })
}

module.exports = {
    capturedResolveExample,
    objectExample,
    thenObjectExample,
    fancyThenObjectExample
}

/*
const {
    capturedResolveExample,
    objectExample,
    thenObjectExample,
    fancyThenObjectExample
} = require("./promises/weirdPromiseTricks")
*/
