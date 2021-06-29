"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carsRouter = void 0;
const express_1 = __importDefault(require("express"));
const validations_1 = require("../../utils/validations");
const infra_1 = require("../../infra");
const handlers_1 = require("./handlers");
const carsRouter = express_1.default.Router();
exports.carsRouter = carsRouter;
const entries = [
    {
        name: "carsEntry",
        path: "/",
        methodType: "get",
        callbacks: [validations_1.validate, handlers_1.handler]
    },
    {
        name: "carsEntry",
        path: "/",
        methodType: "post",
        callbacks: [validations_1.validate, (req, res, next) => { return res.send("POST"); }]
    }
];
function init() {
    entries.forEach((entry) => {
        infra_1.addEntryPoint(carsRouter, entry);
    });
}
init();
// export default carsRouter;
