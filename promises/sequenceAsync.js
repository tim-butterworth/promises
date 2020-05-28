// setTimeout
// setInterval


//Promises are not asynchronous on their own
new Promise((resolve, reject) => resolve("hi from a promise!")).then()


// A few fancy things that can be done with promises
const waitForElement = (selector, timeout = 5000) => {
    return () => {
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
}
const wait = (waitTime) => () => new Promise((resolve, reject) => setTimeout(resolve, waitTime))
const clickElement = (selector) => () => {
    const matches = document.querySelectorAll(selector);

    if (matches.length === 0) {
	Promise.reject(`Failed to find ${selector}`)
    } else {
	matches[0].click();

	Promise.resolve();
    }
}
const printText = (text) => () => new Promise((resolve, reject) => {
    console.log(text);
    resolve();
})

let capturedResolve;
new Promise((resolve, reject) => { capturedResolve = resolve })
    .then(waitForElement("div"))
    .then(printText("Found div, about to wait for 2 seconds"))
    .then(wait(2000))
    .then(printText("Done waiting 2 seconds"))
    .then(waitForElement("button", 1000))
    .then(printText("Found element 'button', about to wait 5 seconds"))
    .then(wait(5000))
    .then(printText("done waiting 5 seconds, about to click 'button'"))
    .then(clickElement("button"))
    .catch(console.error)
