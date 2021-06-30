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
const customers_1 = require("./routes/customers");
dotenv.config();
const { logger } = require("./logger");
logger.info({ message: "starting application" });
const app = express_1.default();
app.use(utils_1.getRequestId);
app.get("/healthcheck", (req, res) => {
    res.send("I am Alive!");
});
app.use("/cars", index_1.carsRouter);
app.use("/customers", customers_1.customersRouter);
app.use((error, req, res, next) => {
    if (error.isBadReuqest)
        return res.status(400).json({ message: "Bad request", requestId: req.requestId });
    return res.status(500).json({ message: "something error", requestId: req.requestId });
});
app.listen(process.env.PORT);
