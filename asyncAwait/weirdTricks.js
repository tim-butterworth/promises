// Just like promises, any 'thenable'

const normalObject = {
    someFunction: () => {
	console.log("someFunction")
    }
}

const thenObject = {
    then: () => {
	console.log("thenFunction")
    }
}

const fancyThenObject = {
    then: (arg) => {
	arg("FancyThenObject")
    }
}

const asyncWithObject = async (obj) => {
    return await obj;
}

// normal stuff
asyncWithObject(normalObject)

// weird
asyncWithObject(thenObject)

// weirder?
asyncWithObject(fancyThenObject)
