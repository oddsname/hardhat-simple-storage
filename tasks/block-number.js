const { task } = require('hardhat/config');

//npx hardhat block-number --network <network>
task("block-number", "Prints the current block number").setAction(async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log("Current block number: " + blockNumber);
})

