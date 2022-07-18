const { network } = require("hardhat");
const {
    developmentChain,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
    //deployments da ikiye ayriliyor
    // deployer will be the account used to deploy the contract.
    // tokenOwner which is passed to the constructor of Token.sol and which will receive the initial supply.
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    //const chainId = network.config.chainId;

    if (developmentChain.includes(network.name)) {
        log("Deploying mocks to local network...");
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        });
        log("Mocks deployed!");
        log("-------------------------------------------------");
    }
};

module.exports.tags = ["all", "mocks"];
