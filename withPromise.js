// Promise.all we could pretty much implement it ourselves

const range = (min, max) => {
    const result = [];
    while (min < max) {
	result.push(min);
	min++;
    }

    return result;
}
const promiseList = (promiseList) => {
    let capturedResolve;
    const promisesPromise = new Promise((resolve, reject) => {
	capturedResolve = resolve;
    })

    let promiseCount = promiseList.length;
    const results = [];

    const indexes = range(0, list.length);
    indexes.forEach((index) => {
	promiseList[index].then((v) => {
	    promiseCount--;
	    results[index] = v;

	    if (promiseCount === 0) {
		capturedResolve(results);
	    }
	})
    })

    return promisesPromise;
}

// Semi Promise implementation
const PromiseLike = (resolveFun) => {
    const actions = [];
    const id = Math.random();
    const copyActions = (index, promise) => {
	console.log(`copying actions from ${id} into ${promise.id}`, actions);
	while (index < actions.length) {
	    promise.next(actions[index]);

	    index++;
	}

	return index;
    }
    const updatePromise = (previous, next) => Object.assign(previous, next);
    const isPromise = (v) => v && v.isPromise;

    let resolved = false;
    let currentValue;
    const promiseRef = {
	next: (action) => {
	    console.log(`nexte invoked on: ${id}`);
	    if (resolved) {
		const updatedValue = action(currentValue);
		console.log(`"updated value" -> ${updatedValue}`)
		if (isPromise(updatedValue)) {
		    console.log("handle next action is a promise");
		    console.log("actions", actions);

		    copyActions(0, updatedValue);
		    updatePromise(promiseRef, updatedValue);
		} else {
		    currentValue = updatedValue;
		}
	    } else {
		actions.push(action);
	    }

	    return promiseRef;
	},
	isPromise: true,
	resolved,
	id
    }

    const resolve = (arg) => {
	console.log(`resolving ${id}`)
	if (isPromise(arg)) {
	    copyActions(0, arg);
	    updatePromise(promiseRef, arg);
	    resolved = arg.resolved;
	} else {
	    currentValue = arg;
	    promiseRef.resolved = true;
	    resolved = true;

	    let index = 0;
	    while (index < actions.length) {
		currentValue = actions[index](currentValue);

		if (isPromise(currentValue)) {
		    index = copyActions(index+1, currentValue);
		    updatePromise(promiseRef, currentValue);
		}

		index++;
	    }
	}
    }

    resolveFun(resolve);
    
    return promiseRef;
}

//new Promise((r1) => setTimeout(() => r1(new Promise((r2) => r1(10)).next((v) => v*12)), 2000)).next(console.log)
//PromiseLike((r1) => setTimeout(() => r1(PromiseLike((r2) => r2(10)).next((v) => v*12)), 2000)).next(console.log)


//* there are exceptions, we will cover those later
