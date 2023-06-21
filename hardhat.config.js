
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require('hardhat/config');

module.exports = {
  contracts_build_directory: './build/bsc-contracts',
  contracts_directory: './contracts/bsc',
  solidity: {
    compilers: [
      {
        version: "0.8.17", 
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  
  networks: {
    development: {
      url: "http://localhost:8545" // yerel geliştirme ağı URL'i
    },
    bscTestnet:{
      url: "https://data-seed-prebsc-2-s1.binance.org:8545" // BSC Testnet URL'i
    },
    bscMainnet: {
      url: "https://bsc-dataseed.binance.org" // BSC Mainnet URL'
    }
  },
  bsc: {
    url: "https://bsc-dataseed.binance.org/",
    
  },
  namedAccounts: {
    deployer: {
      default: 0, // deployer hesabının dizinindeki ilk hesap olarak kabul edilir
      56: "0x123abc...", // özel ağ numarası 56 için deployer hesabının adresi
      97: "0xabc123..." // özel ağ numarası 97 için deployer hesabının adresi
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};

