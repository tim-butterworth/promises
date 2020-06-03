const thenAddSeven = (p) => {
    return p.then((v) => v + 7)
}
const thenAddNinty = (p) => {
    return p.then((v) => v + 90)
}

// there is no rule that all of the 'thens' have to be attached in a single go
// Promises can be passed around and additional 'thens' can be attached willy nilly
let chainedPromise = new Promise((resolve, reject) => resolve(100));

chainedPromise = thenAddSeven(chainedPromise);
chainedPromise = thenAddNinty(chainedPromise);

chainedPromise.then(console.log);

// each 'then' returns a new promise so if the references is not updated...
const promise = new Promise((resolve, reject) => resolve(100));

thenAddSeven(promise);
thenAddNinty(promise);

promise.then(console.log);


// even something like this can be ok

const logAndReturnValue = (a) => {
    console.log(`current value ${a}`);

    return a;
}

const actions = [
    (a) => {
	return a * 5;
    },
    logAndReturnValue,
    (a) => {
	return a + 7;
    },
    logAndReturnValue,
    (a) => {
	return a + 100;
    },
    logAndReturnValue,
    (a) => {
	return a - 17;
    }
];

/*
let capturedResolve;
let promiseRef = new Promise((resolve, reject) => {
    capturedResolve = resolve;
})
*/
let promiseRef = Promise.resolve(10);

actions.forEach((action) => {
    // as long as the promise reference is updated with each 'then' call, all the actions will be chained
    promiseRef = promiseRef.then(action);
});

promiseRef.then(logAndReturnValue);
