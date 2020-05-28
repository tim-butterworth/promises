let capturedResolve;
new Promise((resolve, reject) => {
    capturedResolve = resolve;
})
    .then((v) => v * 17)
    .then((v) => {
	console.log(`The promise has been resolved with a value of: ${v}`)
    });

// Weird promise stuff
// There is also this weird situation
Promise.resolve({ someKey: () => console.log("Thing without a then!") }).then((v) => console.log(v)) // works as expected
Promise.resolve({
    then: () => {
	console.log("Thing with a then!");
    }
}) // strange behavior if the returned object has a 'then' function
