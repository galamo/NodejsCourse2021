import express from "express";
import { addEntryPoint } from "../../infra"
import { handler, customerCityHandler } from "./handlers";
const customersRouter = express.Router();


const entries = [
    // {
    //     name: "carsEntry",
    //     path: "/",
    //     methodType: "get",
    //     callbacks: [handler]
    // },
    {
        name: "carsEntry",
        path: "/:city",
        methodType: "get",
        callbacks: [customValidator, customerCityHandler]
    },

]
function customValidator(req, res, next) {
    const { city } = req.params;
    if (city.length > 20) return next({ ...new Error(), isBadReuqest: true })
    return next();
}
export type IEntry = typeof entries[0];

function init() {
    entries.forEach((entry: IEntry) => {
        addEntryPoint(customersRouter, entry)
    });
}
init();



export { customersRouter }
// export default carsRouter;