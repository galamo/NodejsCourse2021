function uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getRequestId(req, res, next) {
    req.requestId = uuidv4();
    next();
}

function lbsToKG(lbs: number): number {
    if (typeof lbs !== 'number') throw new Error()
    return lbs * 0.5

}

export { uuidv4, getRequestId, lbsToKG }