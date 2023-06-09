require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");
dotenv.config();

require('./tasks/block-number')
require('hardhat-gas-reporter');

const {
    GANACHE_KEY, GANACHE_URL,
    SEPOLIA_KEY, SEPOLIA_URL,
    ETHERSCAN_KEY, COINMARKETCAP_KEY,
} = process.env;

module.exports = {
    //defaultNetwork: "hardhat",
    networks: {
        ganache: {
            url: GANACHE_URL,
            accounts: [GANACHE_KEY],
            chainId: 1337
        },
        sepolia: {
            name: "sepolia",
            url: SEPOLIA_URL,
            accounts: [SEPOLIA_KEY],
            chainId: 11155111
        },
        localhost: {
            url: 'http://127.0.0.1:8545',
            accounts: [ '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80']
        }
    },
    etherscan: {
        apiKey: ETHERSCAN_KEY
    },
    gasReporter: {
        enabled: true,
        outputFile: 'gas-report.txt',
        noColors: true, //because we output to a file
        currency: 'USD',
        coinmarketcap: COINMARKETCAP_KEY, // comment out if you don't need api requests
        token: 'MATIC', //we can select different networks by specifying the currency and get actual price inside these networks
    },
    solidity: "0.8.18",
};
