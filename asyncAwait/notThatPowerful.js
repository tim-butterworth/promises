// setTimeout with only async await
const brokenSetTimeoutAsync = async () => {
    const result = await setTimeout(
	async () => {
	    await "Result after the timeout"
	},
	2000
    )

    return result;
}
// There is no way to async await a setTimeout, only concrete values or 'thenables' can be awaited
const workingSetTimeoutAsync = async () => {
    const result = await new Promise((resolve, reject) => {
	setTimeout(
	    () => resolve("Result after the timeout")
	    , 2000
	)
    })

    return result;
}

// list for each, function boundaries

const actions = [
    (v) => {
	return Promise.resolve(v + 7);
    },
    (v) => {
	return Promise.resolve(v + 90);
    }
]

const asyncAwaitActions = async (promiseActionList) => {
    let v = 10;
    promiseActionList.forEach(async (promiseAction) => {
	v = await promiseAction(v);
    })

    return v;
}

// Promises are this very powerful concept, they are javascript objects and can be passed around and all sorts of fancy things can be done with them, they are composable and async await is sort of syntax that is added to make certain bits of code appear simpler, but because it is a syntax construct certain kinds of refactorings that would be valid for normal functions or pure promise implementations can cause issues with async await
