import express from "express";
import { getCars } from "../../controllers/cars";
import joi from "joi";
const carsRouter = express.Router();

const carsSchema = joi.object({
    query: joi.object({
        carType: joi.string().required()
    })
})
const usersSchema = joi.object({
    query: joi.object({
        carType: joi.string().valid("aaa", "bbb").required()
    })
})


const schemas = {
    "/cars": carsSchema,
    "/users": usersSchema
}


function getSchemaValidation(path) {
    const current = schemas[path]
    return current
}
function validate(req, res, next) {
    const schemaValidation = getSchemaValidation(req.baseUrl)
    const { error } = schemaValidation.validate({ query: req.query });
    if (error) {
        return next(new Error(error.message))
    }
    return next();
}



const handler = async (req, res, next) => {
    console.log("inside entry point ")
    // if (!req.query.carType) {
    //     //@ts-ignore
    //     req.isBadReuqest = true;
    //     return next(new Error("missing param"))
    // }
    return res.json(getCars())

}



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
        callbacks: [(req, res, next) => { return res.send("working!!!") }]
    },
    {
        name: "carsEntry",
        path: "/budget",
        methodType: "get",
        callbacks: [validate, (req, res, next) => { return res.send("working!!!") }]
    }
]

type IEntry = typeof entries[0];


function wrapWithLogs(fn) {
    return async function (req, res, next) {
        console.log("request Started", req.path)
        const start = Date.now();
        await fn(req, res, next)
        const end = Date.now();
        console.log("request Finished took", end - start)
    }
}

function addEntryPoint(router, entry: IEntry) {
    const { path, callbacks, methodType } = entry
    const last = callbacks[callbacks.length - 1]
    // const callbacksWithoutLast = callbacks.pop()
    const callbacksWithoutLast = callbacks.slice(0, callbacks.length - 1)

    if (callbacks.length === 1) console.log(`The entry ${path} is not safe`)
    const wrappedLogs = wrapWithLogs(last)
    router[methodType](path, [...callbacksWithoutLast, wrappedLogs])
}

entries.forEach((entry: IEntry) => {
    addEntryPoint(carsRouter, entry)
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
    res.send("in cars api")
})

export { carsRouter }
// export default carsRouter;