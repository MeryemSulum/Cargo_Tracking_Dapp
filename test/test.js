
const { expect } = require("chai");
const { ethers } = require("hardhat");
const assert = require("chai").assert;

describe("CargoTrackingDapp", function () {
  let cargoTrackingDappFactory;
  let cargoTrackingDapp;
  let accounts;
  let owner;

  beforeEach(async () => {
    cargoTrackingDappFactory = await ethers.getContractFactory("CargoTrackingDapp");
    accounts = await ethers.getSigners();
    owner = accounts[0].address;
    console.log("Owner address:", owner);
    cargoTrackingDapp = await cargoTrackingDappFactory.deploy();
    

  });
  describe("Change status", ()=>{
    it("Change status", async () => {
      // Set value
      await cargoTrackingDapp.callCreateFunction();
      await new Promise((resolve) => setTimeout(resolve, 60000)); // 1 min
      await cargoTrackingDapp.changeStatus(12345, 1);
      await new Promise((resolve) => setTimeout(resolve, 60000)); // 1 min
      await cargoTrackingDapp.changeStatus(12345, 2);
      await new Promise((resolve) => setTimeout(resolve, 60000)); // 1 min
      await cargoTrackingDapp.changeStatus(12345, 3);
      
      // Get stored value
      const status = await cargoTrackingDapp.getStatus(12345);
      assert.equal(status, 3, "Problem with status");
    });
  
  });
  describe("Add a cargo", () => {
    it("Add a cargo", async() => {
        // Set value
        await cargoTrackingDapp.callCreateFunction();
        const cargoTrackingNumber = 12345;
        const senderAddress = "0x1234567890123456789012345678901234567890";
        const customerAddress = "0x1234567890123456789012345678901234567845";
        const status = 0; // shipping.Pending
        const line = 2; // Transportation.RoadTransport
        const shippingDate = 1634323200; // Unix time
        const deliveryDate = 1635001200; // Unix time
      
        // Get stored value
        const newCargo = await cargoTrackingDapp.getData(12345);
      
        expect(newCargo[0]).to.equal(cargoTrackingNumber);
        expect(newCargo[1]).to.equal(senderAddress);
        expect(newCargo[2]).to.equal(customerAddress);
        expect(newCargo[3]).to.equal(status);
        expect(newCargo[4]).to.equal(line);
        expect(newCargo[5]).to.equal(shippingDate);
        expect(newCargo[6]).to.equal(deliveryDate);
    });
  })
});
