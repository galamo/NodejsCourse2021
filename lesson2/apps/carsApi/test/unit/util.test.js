

const { expect } = require("chai")
const { uuidv4, lbsToKg } = require("../../dist/utils/index")
console.log(lbsToKg)

describe("Test uuid function", () => {
    const value = uuidv4();
    it("Length of uuid is correct", () => {
        expect(value.length).to.be.equals("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".length)
    })

    it("Format of uuid is correct", () => {
        const typeOfUid = typeof value;
        expect(typeOfUid).to.be.equals("string")
    })
})

describe("Test lbsToKg function", () => {
    it("Convert 5 LBS to 2.5 KG ", () => {
        const value = lbsToKg(5);
        expect(value).to.be.equals(2.5)
    })
    // it("Convert String instead number", () => {
    //     const value = lbsToKg("aaa5");
    //     expect(Number.isNaN(NaN)).to.be.equals(true)
    // })
    it("Should throw error", () => {
        expect(lbsToKg.bind("aaa5")).to.throw();
    })
})