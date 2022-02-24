/* eslint-disable */
const hre = require("hardhat");

async function main() {
  const [deployer, daofund, devfund] = await hre.ethers.getSigners();

  tombAddress = hre.ethers.utils.getAddress("0x28b39f3C976A7Ef35F3DaE02F6167766F9A1E125");
  tshareAddress = hre.ethers.utils.getAddress("0xB17E06aB29098280BAD473fD61E6570F1C814401");
  mockTokenAddress = hre.ethers.utils.getAddress("0x58c034b23B09EFb28E927807D15F9B965Dcdc302");

  startTime = Math.floor(Date.now() / 1000) + 1691489;

  // const tomb = await ethers.getContractFactory("Tomb");
  // const tombcontract = await tomb.attach(tombAddress);

  console.log(startTime);

  const Genesis = await hre.ethers.getContractFactory("TombGenesisRewardPool");
  const genesisPool = await Genesis.deploy(tombAddress, mockTokenAddress, startTime, { gasLimit: 10000000 });
  await genesisPool.deployed();
  console.log("- genesisPool deployed to:", genesisPool.address);

  const TombReward = await hre.ethers.getContractFactory("TombRewardPool");
  const tombrewardpool = await TombReward.deploy(tombAddress, startTime, { gasLimit: 10000000 });
  await tombrewardpool.deployed();
  console.log("- tombrewardpool deployed to:", tombrewardpool.address);

  const TshareReward = await hre.ethers.getContractFactory("TShareRewardPool");
  const tsharerwardpool = await TshareReward.deploy(tshareAddress, startTime, { gasLimit: 10000000 });
  await tsharerwardpool.deployed();
  console.log("- tsharerwardpool deployed to:", tsharerwardpool.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
