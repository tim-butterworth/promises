// As a pipe
new Promise((resolve, reject) => resolve(100)) // don't worry about the reject just yet, anything* that goes into the resolve gets passed along to the 'then'
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

// is that better than?
let v = 100;
v = v + 33;
v = v -3;
console.log(v);

