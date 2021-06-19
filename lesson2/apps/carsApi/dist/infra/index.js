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
Object.defineProperty(exports, "__esModule", { value: true });
function wrapWithLogs(fn) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("request Started", req.path);
            const start = Date.now();
            yield fn(req, res, next);
            const end = Date.now();
            console.log("request Finished took", end - start);
        });
    };
}
function addEntryPoint(router, entry) {
    const { path, callbacks, methodType } = entry;
    const last = callbacks[callbacks.length - 1];
    // const callbacksWithoutLast = callbacks.pop()
    const callbacksWithoutLast = callbacks.slice(0, callbacks.length - 1);
    if (callbacks.length === 1)
        console.log(`The entry ${path} is not safe`);
    const wrappedLogs = wrapWithLogs(last);
    router[methodType](path, [...callbacksWithoutLast, wrappedLogs]);
}
module.exports = { addEntryPoint, wrapWithLogs };
