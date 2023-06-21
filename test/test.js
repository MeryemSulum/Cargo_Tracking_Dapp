const { expect } = require("chai");
const { ethers } = require("hardhat");
const assert = require("chai").assert;


describe("CargoTrackingDapp", function() {
  let cargoTrackingDappFactory;
  let cargoTrackingDapp;
  let accounts;
  let owner;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    owner = accounts[0].address;
    
    console.log("Owner address:", owner);

    cargoTrackingDappFactory = await ethers.getContractFactory("CargoTrackingDapp");
    cargoTrackingDapp = await cargoTrackingDappFactory.deploy({from: owner});
  });

  describe("Add a cargo", () => {
    it("Add a cargo", async() => {
        // Set value
        const cargoTrackingNumber = 12345;
        const senderAddress = "0x1234567890123456789012345678901234567890";
        const customerAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
        const status = 0; // shipping.Pending
        const line = 2; // Transportation.RoadTransport
        const shippingDate = 1634323200;
        const deliveryDate = 1635001200;
      
        await cargoTrackingDapp.create(
          cargoTrackingNumber,
          senderAddress,
          customerAddress,
          status,
          line,
          ethers.BigNumber.from(shippingDate),
          ethers.BigNumber.from(deliveryDate)
        );
        // Get stored value
        const newCargo = await cargoTrackingDapp.cargo(cargoTrackingNumber);
      
        expect(newCargo.cargo_tracking_number).to.equal(cargoTrackingNumber);
        expect(newCargo.sender_address).to.equal(senderAddress);
        expect(newCargo.customer_address).to.equal(customerAddress);
        expect(newCargo.Status).to.equal(status);
        expect(newCargo.Line).to.equal(line);
        expect(newCargo.shipping_date).to.equal(shippingDate);
        expect(newCargo.delivery_date).to.equal(deliveryDate);
    });
  })
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
  })
});

