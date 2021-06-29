const { parentPort, workerData } = require("worker_threads");

parentPort.postMessage(longCalc())

const ultimateIterations = 9999999999;
function longCalc() {
    for (let index = 0; index < 999; index++) {
        console.log("Executed in the Child thread");
    }
    return "message from worker";
}