// As a pipe
const promisePipe = () => {
    new Promise((resolve, reject) => resolve(100)) // ~anything that goes into the resolve gets passed along to the 'then'
	.then((v) => {
	    console.log(v);
	    return v + 33; // should return 133
	})
	.then((v) => {
	    console.log(v);
	    return v - 3; // should return 130
	})
	.then((v) => {
	    console.log(v);
	})
}

// does that beat this?
const normalApproach = () => {
    let v = 100;
    v = v + 33;
    v = v -3;
    console.log(v);
}

module.exports = {
    promisePipe,
    normalApproach
}

/*
const {
    promisePipe,
    normalApproach
} = require("./promises/pipe.js");
*/
