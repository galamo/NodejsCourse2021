import express from "express";
import { addEntryPoint } from "../../infra"
import { handler } from "./handlers";
const customersRouter = express.Router();


const entries = [
    {
        name: "carsEntry",
        path: "/",
        methodType: "get",
        callbacks: [handler]
    },

]
export type IEntry = typeof entries[0];

function init() {
    entries.forEach((entry: IEntry) => {
        addEntryPoint(customersRouter, entry)
    });
}
init();



export { customersRouter }
// export default carsRouter;