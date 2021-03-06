const { expect } = require("chai");
const { uuidv4, lbsToKG } = require("../../dist/utils/index")
const { getEmailAddress } = require("../../dist/controllers/customers")
describe("Test uuidv4 function", () => {
    const value = uuidv4();
    it("Length of requestId is correct", () => {
        expect(value.length).to.be.equals("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".length)
    })
    it("requestId is a string ", () => {
        const isString = typeof value === 'string';
        expect(isString).to.be.equals(true)
    })
})

describe("Test lbsToKg function", () => {
    it("Convert 5 LBS to 2.5 KG", () => {
        const value = lbsToKG(5)
        expect(value).to.be.equals(2.5)
    })
    it("Should throw Error", function () {
        expect(lbsToKG.bind("aaaa")).to.throw()
        expect(lbsToKG.bind({})).to.throw()
        expect(lbsToKG.bind([])).to.throw()
    })
})



describe("Email Unit test", () => {
    it("Should return valid email", () => {
        const value = getEmailAddress("gal", "a", "yahoo")
        expect(value).to.be.equals("gal_a@yahoo.com")
    })
    it("Should return Undefined", function () {
        const value = getEmailAddress("gal", null, "yahoo")
        expect(value).to.be.equals(undefined)
    })
})


