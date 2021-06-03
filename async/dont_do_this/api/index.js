const express = require("express")
require("dotenv").config()
const checkEnvParams = require("checkEnvParams")
const app = express();

const { PORT, USER_NAME, NEW_ENV } = process.env;
checkEnvParams(["PORT", "USER_NAME", "NEW_ENV"])

app.get("/short", (req, res) => {
    return res.send("[short]response sent from server")
})

app.get("/long", (req, res) => {
    for (let index = 0; index < 9999999999; index++) {
    }
    console.log(NEW_ENV)
    console.log(NEW_ENV)
    console.log(NEW_ENV)
    res.send("[long_long_long]response sent from server")
})



app.listen(PORT)