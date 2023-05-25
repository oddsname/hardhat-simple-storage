const {ethers} = require('hardhat');
const { expect, assert } = require("chai");

describe("test SimpleStorage smart contract", function () {
  let simpleStorage, simpleStorageFactory;

  beforeEach(async () => {
      simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
      simpleStorage = await simpleStorageFactory.deploy();

  })

  it('Should start with favorite number of 0',async () => {
      const current = await simpleStorage.get();
      assert.strictEqual(current.toString(), '0');
  })

  it('Should update value',async () => {
    const current = await simpleStorage.get();
    assert.strictEqual(current.toString(), '0');

    simpleStorage.set(12);

    const newValue = await simpleStorage.get();
    assert.strictEqual(newValue.toString(), "12");
  })
});