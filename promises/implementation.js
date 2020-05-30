// example implementation



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

