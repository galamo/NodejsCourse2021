import { IEntry } from "../routes/cars";
import { logger } from "../logger"

export function wrapWithLogs(fn) {
    return async function (req, res, next) {
        logger.info(`request Started ${req.path}`)
        const start = Date.now();
        await fn(req, res, next)
        const end = Date.now();
        console.log("request Finished took", end - start)
    }
}

export function addEntryPoint(router, entry: IEntry) {
    const { path, callbacks, methodType } = entry
    const last = callbacks[callbacks.length - 1]
    // const callbacksWithoutLast = callbacks.pop()
    const callbacksWithoutLast = callbacks.slice(0, callbacks.length - 1)

    if (callbacks.length === 1) console.log(`The entry ${path} is not safe`)
    const wrappedLogs = wrapWithLogs(last)
    router[methodType](path, [...callbacksWithoutLast, wrappedLogs])
}
