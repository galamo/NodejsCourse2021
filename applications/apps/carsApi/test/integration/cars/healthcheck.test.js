const { expect } = require("chai");
require("dotenv").config();
const axios = require("axios");
const { PORT, BASE_URL } = process.env
// const instance = axios.create()

describe("healthcheck", () => {
    it("return ok", async () => {
        const { data } = await axios.get(`http://${BASE_URL}:${PORT}/healthcheck`)
        expect(data).to.be.equals("I am Alive!")
    })
})