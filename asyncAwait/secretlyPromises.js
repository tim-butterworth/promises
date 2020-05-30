const simpleAsync = async () => {
    return 10;
}

console.log(simpleAsync());

const simpleAwait = async () => {
    return await 10;
}

console.log(simpleAwait());
simpleAwait().then(console.log);

const simplePromiseAsync = async () => {
    return Promise.resolve(10);
}

console.log(simplePromiseAsync());

const simplePromiseAsyncAwait = async () => {
    const v = await Promise.resolve(10);

    return v * 17;
}

console.log(simplePromiseAsyncAwait());

const fullOnFancy = async () => {
    const v = await new Promise((resolve, reject) => setTimeout(() => resolve(10), 2000));

    return v * 7;
}

console.log(fullOnFancy());
fullOnFancy().next(console.log);

// same as
new Promise((resolve, reject) => setTimeout((resolve, reject) => resolve(10), 2000))
    .then((v) => v * 7)

// Almost the same set of functions from the promise/sequenceAsync file
const waitForElement = (selector, timeout = 5000) => {
    return new Promise((resolve, reject) => {
	const pollingInterval = 100;
	let duration = 0;
	const intervalId = setInterval(
	    () => {
		const elementCount = document.querySelectorAll(selector);

		if (elementCount.length > 0 && duration <= timeout) {
		    clearInterval(intervalId);

		    resolve();
		} else if (duration > timeout) {
		    clearInterval(intervalId);

		    reject(`Timed out after ${duration}ms waiting for element '${selector}'`);
		}

		duration = duration + pollingInterval;
	    },
	    pollingInterval
	);
    })
}
const wait = (waitTime) => new Promise((resolve, reject) => setTimeout(resolve, waitTime))
const clickElement = (selector) => {
    const matches = document.querySelectorAll(selector);

    if (matches.length === 0) {
	Promise.reject(`Failed to find ${selector}`)
    } else {
	matches[0].click();

	Promise.resolve();
    }
}
const printText = (text) => new Promise((resolve, reject) => {
    console.log(text);
    resolve();
})

const doPageThings = async () => {
    try {
	await waitForElement("div")
	await printText("Found div, about to wait for 2 seconds")
	await wait(2000)
	await printText("Done waiting 2 seconds")
	await waitForElement(".fancy-button", 1000)
	await printText("Found element 'button', about to wait 5 seconds")
	await wait(5000)
	await printText("done waiting 5 seconds, about to click 'button'")
	await clickElement("button")

	return "success"
    } catch (e) {
	return e;
    }
}
