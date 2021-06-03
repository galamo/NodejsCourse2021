const fs = require("fs")

const startTime = new Date().getTime();

for (let index = 0; index < 100; index++) {
    fs.readFile("../../example/index.js", "utf8", () => { })

}

const endTime = new Date().getTime();

console.log(endTime - startTime)