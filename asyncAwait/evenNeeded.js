// Just about every thing async await can do promises can also do

const asyncAwaitVersion = async () => {
    const v = await new Promise((resolve, reject) => setTimeout(resolve(100)))

    return v + 17;
}

const promiseVersion = () => {
    return new Promise((resolve, reject) => setTimeout(resolve(100)))
	.then((v) => {
	    return v + 17;
	})
}

console.log(asyncAwaitVersion());
console.log(promiseVersion());

asyncAwaitVersion().then((v) => console.log(`Async version ${v}`));
promiseVersion().then((v) => console.log(`Promise version ${v}`))

// Seem pretty identical but there is one important difference

console.log(asyncAwaitVersion.constructor.name);
console.log(promiseVersion.constructor.name);

// It may seem unimportant, but some libraries (like codeceptjs) check if functions are async functions and handle the function differently if it is or is not an async function
