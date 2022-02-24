/* eslint-disable */
const hre = require("hardhat");

async function main() {
  const [deployer, daofund, devfund] = await hre.ethers.getSigners();

  const contractAddressPair = "0xc0960090f048f60cf739f603963a7ef08efd8e80"; // 1 matic 1 3omb

  const startTime = Math.floor(Date.now() / 1000) - 1000;

  const Oracle = await hre.ethers.getContractFactory("Oracle");
  const oracleTM = await Oracle.deploy(contractAddressPair, 21600, startTime);
  await oracleTM.deployed();
  console.log("- Oracle deployed to:", oracleTM.address);
  console.log("-- Oracle starttime:", startTime);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
