import express from "express";
import * as dotenv from "dotenv"
import fs from "fs";
import carsRouter from "./routes/cars";
dotenv.config();

const app = express()
function generateRequestId(req, res, next) {
    req.requestId = Math.ceil(Math.random() * 999999999999)
    return next()
}
app.use(generateRequestId)
app.use((req, res, next) => { return next() })

app.use("/cars", carsRouter)

// error handler with params
// logger
// req id
async function readme() {
    return new Promise((resolve, reject) => {
        fs.readFile("./app.ts", "utf8", () => {
            console.log("done read file...11111111")
            resolve("read11111111111111")
        })
    })

}
app.get("/bb", async (req, res, next) => {
    const aa = await readme()
    return next()
})

app.use((req, res, next) => {
    console.log("end middlewware22222222222")
    res.end("res222222")
})


app.use((error: express.ErrorRequestHandler, req, res, next) => {
    console.log(error, req.requestId)
    res.send("something went wrong")

})

app.listen(process.env.PORT, () => { console.log("listen to port") })


