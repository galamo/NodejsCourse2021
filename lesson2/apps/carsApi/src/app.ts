import express from "express"
import * as dotenv from "dotenv"
import { getRequestId } from "./utils/"
import { carsRouter } from "./routes/cars/index"
dotenv.config();

const { logger } = require("./logger")

logger.info({ message: "starting application" })
const app = express();

app.use(getRequestId);
app.use("/healthcheck", (req, res, next) => { res.send("api is working") });
app.use("/cars", carsRouter);

app.use((error, req: any,
    res: express.Response, next: express.NextFunction) => {
    if (error.isBadReuqest) return res.status(400).json({ message: "Bad request", requestId: req.requestId })
    return res.status(500).json({ message: "something error", requestId: req.requestId })
})

app.listen(process.env.PORT);

