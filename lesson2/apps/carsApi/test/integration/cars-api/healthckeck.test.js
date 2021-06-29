const chai = require("chai");
require("dotenv").config();
const axios = require("axios")

const { expect } = chai;

describe("healthCheck", () => {
    it("returns ok", async function () {
        const { data } = await axios.get(`http://${process.env.BASE_URL}:${process.env.PORT}/healthcheck`)
        expect(data).to.be.equals("api is working");
    });
});
