import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'dotenv/config'
import { parseUnits } from 'ethers/lib/utils'
import 'hardhat-deploy'
import 'hardhat-deploy-ethers'
import 'hardhat-gas-reporter'
import { removeConsoleLog } from 'hardhat-preprocessor'
import 'hardhat-tracer'
import { HardhatUserConfig } from 'hardhat/types'
import 'solidity-coverage'

const defaultPrivateKey =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80' // hardhat 0

const config: HardhatUserConfig = {
  preprocess: {
    eachLine: removeConsoleLog(
      (hre) =>
        hre.network.name !== 'localhost' && hre.network.name !== 'hardhat'
    ),
  },
  gasReporter: {
    currency: 'USD',
    enabled: true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    gasPrice: 20, // in gwei
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  solidity: {
    compilers: [
      {
        version: '0.8.9',
      },
    ],
  },
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    localhost: {
      url: `http://localhost:8545`,
      // accounts: [
      // defaultPrivateKey,
      // ]
    },
    mumbai: {
      chainId: 80001,
      url: 'https://rpc-mumbai.maticvigil.com', //`https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
      gasPrice: parseUnits('1', 'gwei').toNumber(),
      accounts: [process.env.MUMBAI_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    polygon: {
      chainId: 137,
      url: 'https://polygon-rpc.com', //`https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      gasPrice: parseUnits('20', 'gwei').toNumber(),
      accounts: [process.env.POLYGON_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    rinkeby: {
      chainId: 4,
      url: 'https://rinkeby.infura.io',
      gasPrice: parseUnits('1', 'gwei').toNumber(),
      accounts: [process.env.RINKEBY_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    ethereum: {
      chainId: 1,
      url: 'https://cloudflare-eth.com', //`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      gasPrice: parseUnits('20', 'gwei').toNumber(),
      accounts: [
        process.env.ETHEREUM_DEPLOYER_PRIVATE_KEY || defaultPrivateKey,
      ],
    },
  },
}

export default config
