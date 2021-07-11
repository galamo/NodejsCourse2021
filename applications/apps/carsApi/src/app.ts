import express from "express"
import https from "https";
import http from "http";
import fs from "fs"
import * as dotenv from "dotenv"
import { getRequestId } from "./utils/"
import { carsRouter } from "./routes/cars/index"
import { customersRouter } from "./routes/customers";
import { commonMiddlewares } from "./commonMiddlewares";

dotenv.config();

const privateKey = fs.readFileSync(`${process.env.PWD}/ssl/private.key`);
const certificate = fs.readFileSync(`${process.env.PWD}/ssl/server.cert`);
const credentials = { key: privateKey, cert: certificate };


const { logger } = require("./logger")


logger.info({ message: "starting Node.js Process" })
const app = express();


app.use(getRequestId);
app.use(...commonMiddlewares)
app.get("/healthcheck", (req, res) => {
    // @ts-ignore
    res.send("I am Alive!")
})
app.use("/cars", carsRouter);
app.use("/customers", customersRouter)


app.use((error, req: any,
    res: express.Response, next: express.NextFunction) => {
    if (error.isBadReuqest) return res.status(400).json({ message: "Bad request", requestId: req.requestId })
    return res.status(500).json({ message: "something error", requestId: req.requestId })
})

const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app);

httpServer.listen(process.env.PORT);
// httpsServer.listen(4331)
