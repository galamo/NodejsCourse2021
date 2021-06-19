"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carsRouter = void 0;
const express_1 = __importDefault(require("express"));
const cars_1 = require("../../controllers/cars");
const infra_1 = require("../../infra");
const joi_1 = __importDefault(require("joi"));
const carsRouter = express_1.default.Router();
exports.carsRouter = carsRouter;
const carsSchema = joi_1.default.object({
    query: joi_1.default.object({
        carType: joi_1.default.string().required()
    })
});
const usersSchema = joi_1.default.object({
    query: joi_1.default.object({
        carType: joi_1.default.string().valid("aaa", "bbb").required()
    })
});
const schemas = {
    "/cars": carsSchema,
    "/users": usersSchema
};
function getSchemaValidation(path) {
    const current = schemas[path];
    return current;
}
function validate(req, res, next) {
    const schemaValidation = getSchemaValidation(req.baseUrl);
    const { error } = schemaValidation.validate({ query: req.query });
    if (error) {
        return next(new Error(error.message));
    }
    return next();
}
const handler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside entry point ");
    // if (!req.query.carType) {
    //     //@ts-ignore
    //     req.isBadReuqest = true;
    //     return next(new Error("missing param"))
    // }
    return res.json(cars_1.getCars());
});
const entries = [
    {
        name: "carsEntry",
        path: "/",
        methodType: "get",
        callbacks: [validate, handler]
    },
    {
        name: "carsEntry",
        path: "/users",
        methodType: "get",
        callbacks: [(req, res, next) => { return res.send("working!!!"); }]
    },
    {
        name: "carsEntry",
        path: "/budget",
        methodType: "get",
        callbacks: [validate, (req, res, next) => { return res.send("working!!!"); }]
    }
];
entries.forEach((entry) => {
    infra_1.addEntryPoint(carsRouter, entry);
});
// carsRouter.get("/", (req, res, next) => {
//     console.log("inside entry point ")
//     if (!req.query.carType) {
//         //@ts-ignore
//         req.isBadReuqest = true;
//         return next(new Error("missing param"))
//     }
//     return res.json(getCars())
// })
carsRouter.post("/", (req, res, next) => {
    res.send("in cars api");
});
// export default carsRouter;
