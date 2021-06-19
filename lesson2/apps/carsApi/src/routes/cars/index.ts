import express from "express";
import { validate } from "../../utils/validations";
import { addEntryPoint } from "../../infra"
import { handler } from "./handlers";
const carsRouter = express.Router();


const entries = [
    {
        name: "carsEntry",
        path: "/",
        methodType: "get",
        callbacks: [validate, handler]
    },
    {
        name: "carsEntry",
        path: "/",
        methodType: "post",
        callbacks: [validate, (req, res, next) => { return res.send("POST") }]
    }
]
export type IEntry = typeof entries[0];

function init() {
    entries.forEach((entry: IEntry) => {
        addEntryPoint(carsRouter, entry)
    });
}
init();



export { carsRouter }
// export default carsRouter;