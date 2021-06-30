const { parentPort, workerData } = require("worker_threads");

const ultimateIterations = 9999999999;
parentPort.postMessage(longCalc())

function longCalc() {
    for (let index = 0; index < ultimateIterations; index++) {
    }
    return "message from worker";
}