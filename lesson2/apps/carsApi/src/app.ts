import express from "express"
import * as dotenv from "dotenv"
import { uuidv4 } from "./utils/"
import { carsRouter } from "./routes/cars/index"
// import routerCars from "./routes/cars/index"
dotenv.config();

const app = express();
function getRequestId(req, res, next) {
    req.requestId = uuidv4();
    next();
}
app.use((req: any,
    res: express.Response, next: express.NextFunction) => {
    console.log("reqeust started", req.url)
    next()
})

app.use(getRequestId);

// app.use((req, res, next) => {
//     console.log(`Request Started ${req.url}`)
//     req.requestId = getRequestId()
//     next();
// })
app.use("/cars", carsRouter);

// app.use((req, res, next) => {
//     console.log(`Request finished ${req.url}`)
//     res.send((req as any).message)
// })



app.use((error, req: any,
    res: express.Response, next: express.NextFunction) => {
    if (req.isBadReuqest) res.status(400).json({ message: "Bad request", requestId: req.requestId })
    res.status(500).json({ message: "something error", requestId: req.requestId })
})



// app.use("/users", carsRouter);
// app.use("/mm", carsRouter);



app.listen(process.env.PORT);

