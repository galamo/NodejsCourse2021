import express from "express"
import https from "https";
import * as dotenv from "dotenv"
import { getRequestId } from "./utils/"
import { carsRouter } from "./routes/cars/index"
import { customersRouter } from "./routes/customers";
dotenv.config();
const { logger } = require("./logger")

logger.info({ message: "starting application" })
const app = express();

app.use(getRequestId);

app.get("/healthcheck", (req, res) => {
    res.send("I am Alive!")
})
app.use("/cars", carsRouter);
app.use("/customers", customersRouter)


app.use((error, req: any,
    res: express.Response, next: express.NextFunction) => {
    if (error.isBadReuqest) return res.status(400).json({ message: "Bad request", requestId: req.requestId })
    return res.status(500).json({ message: "something error", requestId: req.requestId })
})

app.listen(process.env.PORT);

