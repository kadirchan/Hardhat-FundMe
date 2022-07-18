//bu ikisi ayni helperdan exportladigimiz bilgiyi burada iceri cekiyoruz
// const helper = require("../helper-hardhat-config");
// const networkConfig = helper.networkConfig;
const { getNamedAccounts, deployments, network } = require("hardhat");
const { networkConfig, developmentChain } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

//bize gelecek input ikiye ayriliyor
module.exports = async ({ getNamedAccounts, deployments }) => {
    //deployments da ikiye ayriliyor
    // deployer will be the account used to deploy the contract.
    // tokenOwner which is passed to the constructor of Token.sol and which will receive the initial supply.
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
    //const ethUsdAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    let ethUsdAddress;
    if (chainId == 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator");
        ethUsdAddress = ethUsdAggregator.address;
    } else {
        ethUsdAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    }
    log("----------------------------------------------------");
    log("Deploying FundMe and waiting for confirmations...");
    //eger bir contract yoksa onun minimal bir versiyonunu localde deplaylariz(mock)
    const args = [ethUsdAddress];
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });
    log(`FundMe deployed at ${fundMe.address}`);
    if (!developmentChain.includes(network.name) && process.env.Etherscan_API) {
        await verify(fundMe.address, args);
    }
    //log("----------------------------------------------");
};

module.exports.tags = ["all", "fundme"];
// module.exports = async (hre) => {};
