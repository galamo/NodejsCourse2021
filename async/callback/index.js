const { cars } = require("./data")
console.log(cars)

function getCarsFromServer(callbackFn) {
    console.log(typeof callbackFn)
    console.log("Async operation start")
    setTimeout(() => {
        callbackFn(cars)
    }, 3000);
}


console.log("Script start")
getCarsFromServer((carsResult) => { console.log(carsResult[0].Name) })
getCarsFromServer((result) => { console.log(result[1].Name) })
getCarsFromServer((result) => { console.log(result[2].Name) })
getCarsFromServer((result) => { console.log(result[3].Name) })
console.log("Script end")