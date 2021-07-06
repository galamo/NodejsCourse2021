const { expect } = require("chai");
require("dotenv").config();
const axios = require("axios");
const { PORT, BASE_URL } = process.env
const { getConnection } = require("../../../dist/db/index")


let randomCity = `city_${Math.ceil(Math.random() * 99999)}`
before(async () => {
    const connection = getConnection();
    await connection.execute(getInsertQuery(), [...getCustomerValues(randomCity)])
    await connection.execute(getInsertQuery(), [...getCustomerValues(randomCity)])
})


describe("/api/customers/:city", () => {
    it("return ok", async () => {
        const { data } = await axios.get(`http://${BASE_URL}:${PORT}/customers/${randomCity}`)

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