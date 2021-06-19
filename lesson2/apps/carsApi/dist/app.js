"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const utils_1 = require("./utils/");
const index_1 = require("./routes/cars/index");
// import routerCars from "./routes/cars/index"
dotenv.config();
const { logger } = require("./logger");
logger.info({ message: "starting application" });
const app = express_1.default();
function getRequestId(req, res, next) {
    req.requestId = utils_1.uuidv4();
    next();
}
app.use((req, res, next) => {
    console.log("reqeust started", req.url);
    next();
});
app.use(getRequestId);
// app.use((req, res, next) => {
//     console.log(`Request Started ${req.url}`)
//     req.requestId = getRequestId()
//     next();
// })
app.use("/cars", index_1.carsRouter);
// app.use((req, res, next) => {
//     console.log(`Request finished ${req.url}`)
//     res.send((req as any).message)
// })
app.use((error, req, res, next) => {
    console.log(error);
    if (req.isBadReuqest)
        res.status(400).json({ message: "Bad request", requestId: req.requestId });
    res.status(500).json({ message: "something error", requestId: req.requestId });
});
// app.use("/users", carsRouter);
// app.use("/mm", carsRouter);
app.listen(process.env.PORT);
