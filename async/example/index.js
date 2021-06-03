async function run() {
    const result = await new Promise(resolve => setTimeout(resolve, 3000))
    console.log("this is the last message")
}

console.log("start")
run();
console.log("end")