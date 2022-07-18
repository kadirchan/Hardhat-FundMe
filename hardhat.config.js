require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
//require("./tasks/block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */
const RINKEBY_URL = process.env.Rinkeby_URL || "https://eth-rinkeby";
const PRIVATE_KEY = process.env.Private_Key || "0xkey";
const ETHERSCAN_API = process.env.Etherscan_API || "";
const COINMARKET = process.env.COINMARKET || "";

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        rinkeby: {
            url: RINKEBY_URL,
            accounts: [PRIVATE_KEY],
            chainId: 4,
            blockConfirmations: 6,
        },
        //hardhat node ile calistirmak icin network localhost sec
        localhost: {
            url: "http://127.0.0.1:8545/",
            //accounts hardhattan geliyo
            chainId: 31337,
        },
    },
    // solidity: "0.8.9",
    solidity: {
        compilers: [{ version: "0.8.7" }, { version: "0.7.0" }],
    },
    etherscan: {
        apiKey: ETHERSCAN_API,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKET,
        // token: "MATIC",
    },
};
