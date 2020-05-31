// Certain loop constructs work just fine

const addOneAfterALittleWhile = (v) => {
    return new Promise((resolve, reject) => {
	setTimeout(
	    () => {
		console.log(`Adding 1 to ${v}`);
		resolve(v + 1)
	    },
	    1000
	)
    })
}
const printFinalValue = (v) => {
    console.log(`The final value is ${v}`)
}
const range = (min, max) => {
    const result = [];

    while (min < max) {
	result.push(min);
	min++;
    }

    return result;
}

// Async implementation

const asyncSlowelyAddTen = async (v) => {
    let value = v;
    let count = 0;
    while (count < 10) {
	value = await addOneAfterALittleWhile(value);
	count++;
    }

    // This also works

    //    const indexes = range(0, 10);
    //    for (index in indexes) {
    //	value = await addOneAfterALittleWhile(value);
    //    }


    // This does not work

    //    range(0, 10).forEach(() => {
    //	value = await addOneAfterALittleWhile(value);
    //    })


    return value;
}

slowelyAddTen(10).then(printFinalValue)

// Promise implementation

const promiseSlowelyAddTen = (v) => {
    let promiseRef = Promise.resolve(v);

    let count = 0;
    while (count < 10) {
	promiseRef = promiseRef.then(addOneAfterALittleWhile)
	count++;
    }

    // This also works

    //    const indexes = range(0, 10);
    //    for (index in indexes) {
    //	promiseRef = promiseRef.then(addOneAfterALittleWhile)
    //    }


    // This also works

    //    range(0, 10).forEach(() => {
    //	promiseRef = promiseRef.then(addOneAfterALittleWhile)
    //    })

    return promiseRef;
}

promiseSlowelyAddTen(10).then(printFinalValue);
