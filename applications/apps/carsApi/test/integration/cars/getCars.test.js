const { expect } = require("chai");
require("dotenv").config();
const axios = require("axios");
const { PORT, BASE_URL } = process.env


describe("/cars", () => {
    it("should not return cars", async () => {
        try {
            const { data, status } = await axios.get(`http://${BASE_URL}:${PORT}/cars`)
        } catch ({ message }) {
            expect(message).to.be.equals("Request failed with status code 400")
        }
    })
    it("should return cars", async () => {
        const { data, status } = await axios.get(`http://${BASE_URL}:${PORT}/cars?carType=1`)
        expect(data.length).to.be.equals(5)
    })
    it("should return empty array", async () => {
        const { data, status } = await axios.get(`http://${BASE_URL}:${PORT}/cars?carType=mazda`)
        expect(status).to.be.equals(200)
        const isArray = Array.isArray(data);
        expect(isArray).to.be.equals(true)
        expect(data.length).to.be.equals(0)
    })
})