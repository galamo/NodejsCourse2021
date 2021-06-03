const fs = require("fs")

const startTime = new Date().getTime();

for (let index = 0; index < 100; index++) {
    const issue = fs.readFileSync("../../example/index.js", "utf8")
}

const endTime = new Date().getTime();

console.log(endTime - startTime)