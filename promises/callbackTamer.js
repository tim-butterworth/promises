// Three api calls that have some dependencies, api2 needs data from api1 and api3 needs data from api2

const callApp1 = (callback) => {
    setTimeout(
	() => {
	    const app1Data = Math.random();
	    console.log("App 1 Response", app1Data);
	    callback(app1Data)
	},
	1000
    );
}

const callApp2 = (app1Data, callback) => {
    console.log("app1Data", app1Data);

    setTimeout(() => {
	const generatedData = Math.random();
	console.log("App 2 Response", generatedData);

	callback(generatedData);
    }, 1000);
}

const callApp3 = (app2Data, callback) => {
    console.log("app2Data", app2Data);

    setTimeout(() => {
	const generatedData = Math.random();
	console.log("App 3 Response", generatedData);

	callback(generatedData);
    }, 1000);
}

callApp1((app1Data) => {
    callApp2(app1Data, (app2Data) => {
	callApp3(app2Data, (app3Data) => {
	    console.log("App3Data", app3Data);
	})
    })
})

//still kind of rough...
new Promise((resolve, reject) => callApp1(resolve))
    .then((app1Data) => new Promise((resolve, reject) => callApp2(app1Data, resolve)))
    .then((app2Data) => new Promise((resolve, reject) => callApp3(app2Data, resolve)))
    .then((app3Data) => console.log(app3Data))

// generally functions can be rewritten to better take advantage of promises
// in the functions above, the callbacks are all about what to do next but we can rewrite the functions so that they no longer care about what to do next
// the technical term is 'promisify'

const promiseCallApp1 = () => {
    return new Promise((resolve, reject) => callApp1(resolve))
}
const promiseCallApp2 = (app1Data) => {
    return new Promise((resolve, reject) => callApp2(app1Data, resolve))
}
const promiseCallApp3 = (app2Data) => {
    return new Promise((resolve, reject) => callApp3(app2Data, resolve))
}
