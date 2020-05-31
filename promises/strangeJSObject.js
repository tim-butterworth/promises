//same thing
const fullResolve = () => {
    return new Promise((resolve, reject) => resolve(10))
}
const helperResolve = () => {
    return Promise.resolve(10)
}

//same thing
const fullReject = () => {
    return new Promise((resolve, reject) => reject("failed"))
}
const helperReject = () => {
    return Promise.reject("failed")
}

// Promises can have 3 different states
// Promises can be 'pending'
const promiseStates = () => {
    let capturedResolve;
    const promise = new Promise((resolve, reject) => {
	capturedResolve = resolve;
    })
    console.log("pending promise", promise);
    // Promises can be 'resolved'
    capturedResolve();
    console.log("resolved promise", promise);
    console.log("resolved promise", Promise.resolve());
    console.log("resolved promise", new Promise((resolve, reject) => resolve()));

    // Promises can be 'rejected'
    console.log("rejected promise", Promise.reject());
    console.log("rejected promise", new Promise((resolve, reject) => reject()));
}
const stuffPassesThroughResolve = (toPassThrough) => {
    // ~whatever goes into the resolve flows through to the next 'then'
    new Promise((resolve, reject) => resolve(toPassThrough))
	.then((v) => console.log(v));
}

// And then something weird happens (but super important)
const layerdResolvePromise = () => {
    Promise.resolve(
	Promise.resolve(
	    Promise.resolve(10)
	)
    ).then(console.log);
}

const promiseNext = () => {
    Promise.resolve(10)
	.then((n) => {
	    return Promise.resolve(n * 10)
	})
	.then((n) => {
	    return Promise.resolve(n + 7)
	})
	.then(console.log);
}

// list of promises
const promiseList = () => {
    Promise.all([
	Promise.resolve(19),
	new Promise((resolve, reject) => {
	    setTimeout(() => resolve(33), 2000)
	}),
	new Promise((resolve, reject) => resolve("hi"))
    ]).then(console.log);
}

//Promises are always async... at least the 'then' call is
const alwaysAsyncExample = () => {
    new Promise((resolve, reject) => resolve("hi from a promise!")).then(console.log);
    console.log("hi from not the promise");
}
//Promises are implemented natively but can be totally implemented in vanilla js, 'then' being async is not required... just some trivia. This does mean, reasoning about the relative execution order of promises and non-promises can be tricky

module.exports = {
    fullResolve,
    helperResolve,
    fullReject,
    helperReject,
    promiseStates,
    stuffPassesThroughResolve,
    layerdResolvePromise,
    promiseNext,
    promiseList,
    alwaysAsyncExample
}

/*
const {
    fullResolve,
    helperResolve,
    fullReject,
    helperReject,
    promiseStates,
    stuffPassesThroughResolve,
    layerdResolvePromise,
    promiseNext,
    promiseList,
    alwaysAsyncExample
} = require("./promises/strangeJSObject")
*/
