const { Worker } = require("worker_threads");
const userName = "galAmouyal"
const worker = new Worker("./worker.js", { workerData: { userName } });

worker.once("message", result => {
    console.log(result);
});
worker.on("error", error => {
    console.log(error);
});
worker.on("exit", exitCode => {
    console.log(exitCode);
})

console.log("Executed in the parent thread");
async function runMainWithDelay() {
    await new Promise(resolve => setTimeout(resolve, 3000))
    console.log("main thread1")
    await new Promise(resolve => setTimeout(resolve, 3000))
    console.log("main thread2")
    await new Promise(resolve => setTimeout(resolve, 3000))
    console.log("main thread3")
    await new Promise(resolve => setTimeout(resolve, 3000))
    console.log("main thread4")
    await new Promise(resolve => setTimeout(resolve, 3000))
    console.log("main thread5")
}
runMainWithDelay();




