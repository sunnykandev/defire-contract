/* eslint-disable */
const hre = require("hardhat");

async function main() {
  const [deployer, daofund, devfund] = await hre.ethers.getSigners();

  const DAOFund = await hre.ethers.getContractFactory("SimpleERCFund");
  const daoFund = await DAOFund.deploy();
  await daoFund.deployed();
  console.log("- daoFund deployed to:", daoFund.address);

  const DEVFund = await hre.ethers.getContractFactory("SimpleERCFund");
  const devFund = await DEVFund.deploy();
  await devFund.deployed();
  console.log("- devFund deployed to:", devFund.address);

  const MockInvestToken = await hre.ethers.getContractFactory("DummyToken");
  const iToken = await MockInvestToken.deploy();
  await iToken.deployed();
  const iTokenDecimals = await iToken.decimals();
  console.log("- MockInvestToken deployed to:", iToken.address);
  console.log("MockInvestToken decimals:", iTokenDecimals);

  const TombToken = await hre.ethers.getContractFactory("Tomb");
  const tToken = await TombToken.deploy(0, hre.ethers.constants.AddressZero);
  await tToken.deployed();
  const tTokenDecimals = await tToken.decimals();
  console.log("- TombToken deployed to:", tToken.address);
  console.log("TombToken decimals:", tTokenDecimals);

  const TBondToken = await hre.ethers.getContractFactory("TBond");
  const tbToken = await TBondToken.deploy();
  await tbToken.deployed();
  const tbTokenDecimals = await tbToken.decimals();
  console.log("- TBondToken deployed to:", tbToken.address);
  console.log("TBondToken decimals:", tbTokenDecimals);

  const startTime = Math.floor(Date.now() / 1000);

  const TShareToken = await hre.ethers.getContractFactory("TShare");
  const tsToken = await TShareToken.deploy(startTime, daofund.address, devfund.address);
  await tsToken.deployed();
  const tsTokenDecimals = await tsToken.decimals();
  console.log("- TShareToken deployed to:", tsToken.address);
  console.log("TShareToken decimals:", tsTokenDecimals);

  const Treasury = await hre.ethers.getContractFactory("Treasury");
  const treasuryDAO = await Treasury.deploy();
  await treasuryDAO.deployed();
  console.log("-- DAO Treasury deployed to:", treasuryDAO.address);

  const Masonry = await hre.ethers.getContractFactory("Masonry");
  const themasonry = await Masonry.deploy();
  await themasonry.deployed();
  console.log("-- Masonry deployed to:", themasonry.address);

  await themasonry.initialize(tToken.address, tsToken.address, treasuryDAO.address);
  // await treasuryDAO.initialize(tToken.address, tbToken.address, tsToken.address, treasuryDAO.address);

  // TBC Initialisation
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
