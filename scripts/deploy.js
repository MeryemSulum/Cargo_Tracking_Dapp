
const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const CargoTrackingDapp = await ethers.getContractFactory("CargoTrackingDapp");
  const cargoTrackingDapp = await CargoTrackingDapp.deploy();
  await cargoTrackingDapp.deployed();
  let cargoTrackingDappAddress = cargoTrackingDapp.address;

  console.log("CargoTrackingDapp deployed to:", cargoTrackingDappAddress);
  console.log("Transaction hash:", cargoTrackingDapp.deployTransaction.hash);

  // BSCScan linkini oluştur
  const bscscanBaseUrl = "https://bscscan.com/";
  const bscscanLink = bscscanBaseUrl + "address/" + cargoTrackingDappAddress;
  console.log("BSCScan link:", bscscanLink);
  
  let config = "export const cargoTrackingDappAddress = " + cargoTrackingDappAddress;

  console.log("cargoTrackingDappAddress = " + cargoTrackingDappAddress);

  let data = JSON.stringify(config);

  fs.writeFileSync("config.js", data);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });