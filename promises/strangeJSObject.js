//same thing
new Promise((resolve, reject) => resolve(10))
    .then(console.log);

Promise.resolve(10)
    .then(console.log);

//same thing
new Promise((resolve, reject) => reject("failed"))
    .catch(console.error);

Promise.reject("failed")
    .catch(console.error);

// Promises can have 3 different states
// Promises can be 'pending'
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



// Whatever goes into the resolve flows through to the next 'then'
new Promise((resolve, reject) => resolve(17))
    .then((v) => console.log(v));

// And then something weird happens (but super important)
// Except if that thing is a promise, promises get 'flattened'
Promise.resolve(
    Promise.resolve(
	Promise.resolve(10)
    )
).then(console.log);

// A promise returned by a 'then' also gets 'flattened'
Promise.resolve(10)
    .then((n) => {
	return Promise.resolve(n * 10)
    })
    .then((n) => {
	return Promise.resolve(n + 7)
    })
    .then(console.log);


// list of promises

Promise.all([
    Promise.resolve(19),
    new Promise((resolve, reject) => setTimeout(() => resolve(33), 2000)),
    new Promise((resolve, reject) => resolve("hi"))
]).then(console.log);
