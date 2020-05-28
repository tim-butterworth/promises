const thenAddSeven = (p) => {
    p.then((v) => v + 7)
}
const thenAddNinty = (p) => {
    p.then((v) => v + 90)
}

// there is no rule that all of the 'thens' have to be attached in a single go
// Promises can be passed around and additional 'thens' can be attached willy nilly
const promise = new Promise((resolve, reject) => resolve(100));

thenAddSeven(promise);
thenAddNinty(promise);

promise.then(console.log);
