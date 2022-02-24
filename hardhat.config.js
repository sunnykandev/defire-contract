require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");
module.exports = {
  networks: {
    hardhat: {},
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: [
        process.env.DEPLOYER_PRIVATE_KEY,
        process.env.DAO_PRIVATE_KEY,
        process.env.DEV_PRIVATE_KEY
      ]
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/" + process.env.ALCHEMY_KEY,
      accounts: process.env.DEPLOYER_PRIVATE_KEY !== undefined ? [process.env.DEPLOYER_PRIVATE_KEY, process.env.DAO_PRIVATE_KEY, process.env.DEV_PRIVATE_KEY] : [],
      gas: 5500000,
      gasPrice: 8000000000,
      gasMultiplier: 2,
    },
    fantom: {
      url: "https://rpc.ftm.tools",
      gasMultiplier: 2,
    },
    fantomtest: {
      url: "https://rpc.testnet.fantom.network/",
      gasMultiplier: 2,
      accounts: process.env.DEPLOYER_PRIVATE_KEY !== undefined ? [process.env.DEPLOYER_PRIVATE_KEY, process.env.DAO_PRIVATE_KEY, process.env.DEV_PRIVATE_KEY] : [],
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  etherscan: {
    apiKey: {
      polygonMumbai: "V3GPSD564P71F5CEI4FFT8A9TFGWRX5TUB",
    },
  },

  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
    daofund: {
      default: 1, // here this will by default take the second account as feeCollector (so in the test
    },
    devfund: {
      default: 2, // here this will by default take the second account as feeCollector (so in the test
    },
  },
};
