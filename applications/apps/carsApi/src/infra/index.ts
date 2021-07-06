import { IEntry } from "../routes/cars";
import { logger } from "../logger"

export function wrapWithLogs(fn) {
    return async function (req, res, next) {
        const fullUrl = `${req.baseUrl}${req.url}`;
        logger.info(`request Started ${fullUrl}`)
        const start = Date.now();
        await fn(req, res, next)
        const end = Date.now();
        console.log(`request Finished ${fullUrl} took ${end - start} MS`,)
    }
}

export function addEntryPoint(router, entry: IEntry) {
    const { path, callbacks, methodType } = entry
    const last = callbacks[callbacks.length - 1]
    // const callbacksWithoutLast = callbacks.pop()
    const callbacksWithoutLast = callbacks.slice(0, callbacks.length - 1)

    if (callbacks.length === 1) console.log(`The entry ${router.path}/${path} is not safe`)
    const wrappedLogs = wrapWithLogs(last)
    router[methodType](path, [...callbacksWithoutLast, wrappedLogs])
}
