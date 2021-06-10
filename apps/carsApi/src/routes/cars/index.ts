import express from "express";
import { wrap } from "module";
import { getCars } from "../../controllers/cars/index"

const router = express.Router();

function handler(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {
        const result = getCars();
        return res.json(result)
    } catch (ex) {
        return next(new Error("cars not exist"))
    }

}
function wrapWithLogs(fn) {
    return async function (req, res, next) {
        console.log("request Started", req.path)
        const start = Date.now();
        await fn(req, res, next)
        const end = Date.now();
        console.log("request Finished took", end - start)
    }
}
function addEntryPoint(router, entry) {
    const wrappedLogs = wrapWithLogs(entry.callbacks[1])
    const callbackslen = entry.callbacks.length;
    if (callbackslen === 1) { console.log(`api ${entry.path} is not safe!!!`) }
    router[entry.method](entry.path, [entry.callbacks[0], wrappedLogs])

}

function validate(req, res, next) {
    console.log(req.query)
    if (!req.query.user) return next(new Error("missing param"))
    return next();
}
addEntryPoint(router, {
    path: "/", callbacks: [validate, handler], method: "get"
})

addEntryPoint(router, {
    path: "/cars2", callbacks: [handler], method: "get"
})


// router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     try {
//         const result = getCars();
//         return res.json(result)
//     } catch (ex) {
//         return next(new Error("cars not exist"))
//     }
// })




export default router;
