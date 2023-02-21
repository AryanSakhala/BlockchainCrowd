require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    goerli: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`),
      network_id: "5",
      gas: 8000000,
      gasPrice: 25000000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.17",
    }
  }
};
