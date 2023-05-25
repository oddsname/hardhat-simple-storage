require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");


/** @type import('hardhat/config').HardhatUserConfig */

dotenv.config();

const {
    GANACHE_KEY, GANACHE_URL,
    SEPOLIA_KEY, SEPOLIA_URL,
    ETHERSCAN_KEY
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
    },
    etherscan: {
        apiKey: ETHERSCAN_KEY
    },
    solidity: "0.8.18",
};
