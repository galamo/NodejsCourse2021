import express from "express"
import * as dotenv from "dotenv"
import { getRequestId } from "./utils/"
import { carsRouter } from "./routes/cars/index"
import https from "https";
import fs from "fs";
dotenv.config();

import { createConnection } from "./db";
createConnection();

var privateKey = fs.readFileSync('ssl/server.key', 'utf8');
var certificate = fs.readFileSync('ssl/server.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };



const { logger } = require("./logger")

logger.info({ message: "starting application" })
const app = express();
var httpsServer = https.createServer(credentials, app);

app.use(getRequestId);

app.use("/cars", carsRouter);

app.use((error, req: any,
    res: express.Response, next: express.NextFunction) => {
    if (error.isBadReuqest) return res.status(400).json({ message: "Bad request", requestId: req.requestId })
    return res.status(500).json({ message: "something error", requestId: req.requestId })
})

app.listen(process.env.PORT);
httpsServer.listen(4433)
