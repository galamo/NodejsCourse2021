"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carsRouter = void 0;
const express_1 = __importDefault(require("express"));
const carsRouter = express_1.default.Router();
exports.carsRouter = carsRouter;
carsRouter.get("/", (req, res, next) => {
    req["message"] = "in cars api";
    return res.send("api new message");
    next("in cars api");
});
carsRouter.post("/", (req, res, next) => {
    res.send("in cars api");
});
// export default carsRouter;
