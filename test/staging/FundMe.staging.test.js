const { assert } = require("chai");
const { network, ethers, getNamedAccounts } = require("hardhat");
const { developmentChain } = require("../../helper-hardhat-config");

developmentChain.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe;
          let deployer;
          const sendValue = ethers.utils.parseEther("0.05");
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer;
              fundMe = await ethers.getContract("FundMe", deployer);
          });

          it("Check fund and withdraw", async function () {
              await fundMe.fund({ value: sendValue });
              const waiter = await fundMe.withdraw({
                  gasLimit: 100000,
              });
              await waiter.wait(1);
              const finalBalance = await fundMe.provider.getBalance(
                  fundMe.address
              );
              assert.equal(finalBalance.toString(), "0");
          });
      });
