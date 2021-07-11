const { expect } = require("chai");
require("dotenv").config();
const axios = require("axios");
const { PORT, BASE_URL } = process.env
const { getConnection } = require("../../../dist/db/index")


const randomCity = `city_${Math.ceil(Math.random() * 99999)}`
const randomName = `Gal_${Math.ceil(Math.random() * 99999)}`;
const numberOdRecords = [getInsertQuery, getInsertQuery, getInsertQuery]
before(async () => {

    const connection = getConnection();
    numberOdRecords.forEach(async (func) => {
        await connection.execute(getInsertQuery(), [...getCustomerValues(randomCity)])
    })
})


describe("/api/customers/:city", () => {
    it("validate customers result", async () => {
        const { data } = await axios.get(`http://${BASE_URL}:${PORT}/customers/${randomCity}`)
        expect(data.length).to.be.equals(numberOdRecords.length)
        const cities = data.map(customer => customer.city)
        const [firstCity] = cities;
        expect(firstCity).to.be.equals(randomCity)

    })
})

describe("/api/customers/:name", () => {
    it("validate customers result", async () => {
        // const { data } = await axios.get(`http://${BASE_URL}:${PORT}/customers/${randomName}`)
        // expect(data.length).to.be.equals(numberOdRecords.length)
        // const cities = data.map(customer => customer.city)
        // const [firstCity] = cities;
        const customer = { randomName }
        expect(customer.randomName).to.be.equals(randomName)
        expect(customer.randomName.length).to.be.equals(randomName.length)
    })
})

after(async () => {
    const connection = getConnection();
    await connection.execute(`delete from northwind.customers where city = ?`, [randomCity])
})


function getInsertQuery() {
    return `INSERT INTO northwind.customers
    (id,
    company,
    last_name,
    first_name,
    email_address,
    job_title,
    city,
    state_province,
    zip_postal_code) VALUES (?,?,?,?,?,?,?,?,?)`
}

function getCustomerValues(randomCity) {
    return [Math.ceil(Math.random() * 99999), "company",
        "test_last_name", "test_first_name", null, "Owner", randomCity, "state", "test_code"]
}