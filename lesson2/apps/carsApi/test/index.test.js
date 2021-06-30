
const { expect } = require("chai");
console.log("tests starting");


describe("FIRST SUITE", () => {
    it("test1", () => {
        expect(1).to.be.equals(1)
    })
    it("test2", () => {
        expect(1).to.be.equals(2)
    });
});

