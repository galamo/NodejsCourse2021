const { Worker } = require("worker_threads");
let num = 40;
const worker = new Worker("./worker.js", { workerData: { num: num } });
worker.once("message", result => {
    console.log(result);
});
worker.on("error", error => {
    console.log(error);
});
worker.on("exit", exitCode => {
    console.log(exitCode);
})
for (let index = 0; index < 9999; index++) {
    console.log("Executed in the parent thread");
}
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




