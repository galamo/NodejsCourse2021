function checkEnvParams(arrayOfParams) {
    let isExit = false;
    arrayOfParams.forEach(param => {
        if (!process.env[param]) {
            console.log('\x1b[33m%s\x1b[0m', `Missing param ${param}`);
            isExit = true;
        }
    });
    if (isExit) process.exit(1)
}

module.exports = checkEnvParams;