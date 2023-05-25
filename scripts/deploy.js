// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, network, run} = require("hardhat");

async function main() {
    const simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
    console.log('Deploying contract...');

    const simpleStorage = await simpleStorageFactory.deploy();
    await simpleStorage.deployed();

    console.log(`Deployed address: ${simpleStorage.address}`)

    if(network.config.name === 'sepolia' && process.env.ETHERSCAN_KEY) {
        await simpleStorage.deployTransaction.wait(6);
        await verify(simpleStorage.address)
    }

    const currentValue = await simpleStorage.get();
    console.log("Current value: " + currentValue);

    const txResponse = await simpleStorage.set(12);
    await txResponse.wait(1);

    const newValue = await simpleStorage.get();
    console.log('New value: ' + newValue);
}

async function verify(address) {
    console.log('Verifying contract...');
    try {
        await run('verify:verify', {
            address,
        })
    } catch (e) {
        if(e.message.toLowerCase().includes('already verified')) {
            console.log("Already verified");
        } else {
            console.log(e);
        }
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
