"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestId = exports.uuidv4 = void 0;
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
exports.uuidv4 = uuidv4;
function getRequestId(req, res, next) {
    req.requestId = uuidv4();
    next();
}
exports.getRequestId = getRequestId;
