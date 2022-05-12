import Etherium from "../assets/img/chain/Etherium.svg";
import Ton from "../assets/img/chain/ton.svg";
import Elrond from "../assets/img/chain/Elrond.svg";
import Binance from "../assets/img/chain/Binance.svg";
import Cardano from "../assets/img/chain/Cardano.svg";
import Algorand from "../assets/img/chain/Algarand.svg";
import Tron from "../assets/img/chain/Tron.svg";
import Polygon from "../assets/img/chain/Polygon.svg";
import Avalanche from "../assets/img/chain/Avalanche.svg";
import Fantom from "../assets/img/chain/Fantom.svg";
import Gnosis from "../assets/img/chain/Gnosis.png";
import Solana from "../assets/img/chain/Solana.svg";
import Fuse from "../assets/img/chain/Fuse.svg";
import Velas from "../assets/img/chain/velas.svg";
import Tezos from "../assets/img/chain/Tezos.svg";
import Iotex from "../assets/img/chain/iotx.svg";
import One from "../assets/img/chain/One.svg";
import Aurora from "../assets/img/chain/aurora.svg";
import GT from "../assets/img/chain/GateChain.svg"
import VET from "../assets/img/chain/Vechain.png"
import { Chain } from "xp.network/dist/consts";

export const EVM = "EVM";
export const ELROND = "Elrond";
export const TEZOS = "TEZOS";

export const chains = [
  {
    type: "EVM",
    key: "Ethereum",
    text: "Ethereum",
    value: "Ethereum",
    chainId: 1,
    tnChainId: 3,
    order: 3,
    image: { avatar: true, src: Etherium },
    maintenance: false,
    testNet: false,
    mainnet: true,
  },
  {
    type: "EVM",
    key: "BSC",
    text: "BSC",
    value: "BSC",
    chainId: 56,
    tnChainId: 97,
    order: 4,
    image: { avatar: true, src: Binance },
    maintenance: false,
    testNet: true,
    mainnet: true,
  },
  {
    type: "Tron",
    key: "Tron",
    text: "Tron",
    value: "Tron",
    order: 11,
    image: { avatar: true, src: Tron },
    maintenance: true,
    testNet: true,
    mainnet: true,
  },
  {
    type: "Elrond",
    key: ELROND,
    text: ELROND,
    value: ELROND,
    order: 7,
    image: { avatar: true, src: Elrond },
    maintenance: false,
    testNet: false,
    mainnet: true,
  },
  {
    type: "EVM",
    key: "Polygon",
    text: "Polygon",
    value: "Polygon",
    chainId: 137,
    tnChainId: 80001,
    order: 6,
    image: { avatar: true, src: Polygon },
    maintenance: false,
    testNet: true,
    mainnet: true,
  },
  {
    type: "EVM",
    key: "Avalanche",
    text: "Avalanche",
    value: "Avalanche",
    chainId: 43114,
    tnChainId: 43113,
    order: 5,
    image: { avatar: true, src: Avalanche },
    maintenance: false,
    testNet: true,
    mainnet: true,
  },
  {
    type: "EVM",
    key: "Fantom",
    text: "Fantom",
    value: "Fantom",
    chainId: 250,
    order: 2,
    image: { avatar: true, src: Fantom },
    maintenance: false,
    testNet: false,
    mainnet: true,
    newChain: true
  },
  {
    type: "Algorand",
    key: "Algorand",
    text: "Algorand",
    value: "Algorand",
    order: 11,
    image: { avatar: true, src: Algorand },
    maintenance: true,
    testNet: true,
    mainnet: true,
  },
  {
    type: "EVM",
    key: "xDai",
    text: "xDai",
    value: "xDai",
    chainId: 100,
    order: 10,
    image: { avatar: true, src: Gnosis },
    maintenance: false,
    testNet: false,
    mainnet: true,
  },
  {
    type: "Solana",
    key: "Solana",
    text: "Solana",
    value: "Solana",
    chainId: undefined,
    order: 20,
    coming: true,
    image: { avatar: true, src: Solana },
    maintenance: false,
    testNet: false,
    mainnet: false,
  },
  {
    type: "Cardano",
    key: "Cardano",
    text: "Cardano",
    value: "Cardano",
    chainId: undefined,
    order: 21,
    coming: true,
    image: { avatar: true, src: Cardano },
    maintenance: false,
    testNet: false,
    mainnet: false,
  },
  {
    type: "EVM",
    key: "TON",
    text: "TON",
    value: "TON",
    chainId: undefined,
    order: 22,
    coming: true,
    image: { avatar: true, src: Ton },
    maintenance: false,
    testNet: false,
    mainnet: false,
  },
  {
    type: "EVM",
    key: "Fuse",
    text: "Fuse",
    value: "Fuse",
    chainId: 122,
    order: 9,
    image: { avatar: true, src: Fuse },
    maintenance: false,
    testNet: false,
    mainnet: true,
  },
  {
    type: "EVM",
    key: "Velas",
    text: "Velas",
    value: "Velas",
    chainId: 106,
    order: 6,
    image: { avatar: true, src: Velas },
    newChain: false,
    maintenance: false,
    testNet: false,
    mainnet: true,
  },
  {
    type: "Tezos",
    key: "Tezos",
    text: "Tezos",
    value: "Tezos",
    order: 8,
    image: { avatar: true, src: Tezos },
    newChain: false,
    coming: false,
    maintenance: false,
    testNet: true,
    mainnet: true
  },
  {
    type: "EVM",
    key: "Iotex",
    text: "Iotex",
    value: "Iotex",
    chainId: 4689,
    order: 4,
    image: { avatar: true, src: Iotex },
    newChain: true,
    coming: false,
    maintenance: false,
    testNet: false,
    mainnet: true,
    off: true,
  },
  {
    type: "EVM",
    key: "Harmony",
    text: "Harmony",
    value: "Harmony",
    chainId: 1666600000,
    tnChainId: 1666700000,
    order: 4,
    image: { avatar: true, src: One },
    maintenance: false,
    testNet: false,
    mainnet: false,
    newChain: true,
  },
  {
    type: "EVM",
    key: "Aurora",
    text: "Aurora",
    value: "Aurora",
    chainId: 1313161554,
    order: 1,
    image: { avatar: true, src: Aurora },
    maintenance: false,
    testNet: false,
    mainnet: true,
    newChain: true
  },
  {
    type: "EVM",
    key: "Godwoken",
    text: "Godwoken",
    value: "Godwoken",
    order: 10,
    image: { avatar: true, src: Aurora },
    maintenance: false,
    testNet: false,
    mainnet: false,
    newChain: true
  },
  {
    type: "EVM",
    key: "GateChain",
    text: "GateChain",
    value: "GateChain",
    tnChainId: 85,
    chainId: 86,
    order: 0,
    image: {avatar: true, src: GT },
    maintenance: false,
    testNet: false,
    mainnet: false,
    newChain: true
  },
  {
    type: "VeChain",
    key: "VeChain",
    text: "VeChain",
    value: "VeChain",
    tnChainId: 39,
    chainId: undefined,
    order: 4,
    image: {avatar: true, src: VET},
    maintenance: false,
    mainnet: false,
    testNet: false,
    newChain: true
  }
];

export const chainsConfig = {
  Algorand: {
    Chain: 15,
    token: "ALGO",
    img: Algorand,
    tx: "https://algoexplorer.io/tx/",
    testTx: "https://testnet.algoexplorer.io/"
  },
  Ton: {
    type: EVM,
    img: Ton,
    Chain: Chain.HECO,
  },
  Tron: {
    type: "TRON",
    chainId: 0x9,
    token: "TRX",
    img: Tron,
    rpc: "https://api.trongrid.io/",
    tx: "https://tronscan.org/#/transaction/tx/",
    Chain: Chain.TRON,
  },
  Ethereum: {
    type: EVM,
    img: Etherium,
    chainId: 1,
    rpc:
      "https://mainnet.infura.io/v3/",
    tx: "https://etherscan.io/tx/",
    testTx: "https://ropsten.etherscan.io/tx/",
    token: "ETH",
    Chain: Chain.ETHEREUM,
  },
  BSC: {
    type: EVM,
    token: "BNB",
    img: Binance,
    chainId: 56,
    tx: "https://bscscan.com/tx/",
    testTx: "https://testnet.bscscan.com/tx/",
    rpc:
      "https://bsc-dataseed.binance.org/",
    Chain: Chain.BSC,
  },
  Polygon: {
    type: EVM,
    token: "MATIC",
    img: Polygon,
    tx: "https://polygonscan.com/tx/",
    testTx: "https://mumbai.polygonscan.com/tx/",
    chainId: 137,
    rpc:
    "https://rpc-mainnet.matic.network",
    // rpc: 'https://matic-mainnet-full-rpc.bwarelabs.com',
    Chain: Chain.POLYGON,
    // chainData: ChainData.Polygon
  },
  xDai: {
    type: EVM,
    token: "XDAI",
    img: Gnosis,
    tx: "https://blockscout.com/xdai/mainnet/tx/",
    chainId: 100,
    rpc: "https://elronode.xp.network/xdai",
    Chain: Chain.XDAI,
    // chainData: ChainData.xDai
  },
  Fantom: {
    type: EVM,
    token: "FTM",
    img: Fantom,
    chainId: 250,
    tx: "https://ftmscan.com/tx/",
    rpc:
      "https://summer-dark-sea.fantom.quiknode.pro/96ff3e9e727ddccec57f93e68ad321c6e02e88a0/",
    Chain: Chain.FANTOM,
    // chainData: ChainData.Fantom
  },
  Elrond: {
    type: ELROND,
    token: "EGLD",
    img: Elrond,
    // chainData: ChainData.Elrond,
    Chain: Chain.ELROND,
    tx: "https://explorer.elrond.com/transactions/",
  },
  Avalanche: {
    type: EVM,
    img: Avalanche,
    token: "AVAX",
    rpc: "https://avalanche.xp.network/ext/bc/C/rpc",
    chainId: 43114,
    // chainData: ChainData.Avalanche,
    Chain: Chain.AVALANCHE,
    tx: "https://snowtrace.io/tx/",
    testTx: "https://testnet.snowtrace.io/tx/",
  },
  Fuse: {
    type: EVM,
    img: Fuse,
    token: "Fuse",
    rpc: "https://rpc.fuse.io/",
    chainId: 122,
    Chain: Chain.FUSE,
    tx: "https://explorer.fuse.io/tx/",
  },
  Velas: {
    type: EVM,
    img: Velas,
    token: "VLX",
    rpc: "https://velasnode.quigon.com/velas",
    chainId: 106,
    Chain: Chain.VELAS,
    tx: "https://evmexplorer.velas.com/tx/",
  },
  Tezos: {
    type: TEZOS,
    img: Tezos,
    token: "XTZ",
    rpc: "https://mainnet-tezos.giganode.io/tx/",
    chainId: 0x12,
    Chain: Chain.TEZOS,
    tx: "https://tzstats.com/tx/",
  },
  Iotex: {
    type: EVM,
    img: Iotex,
    token: "IOTX",
    rpc: "https://babel-api.mainnet.iotex.io",
    chainId: 4689,
    Chain: Chain.IOTEX,
    tx: "https://iotexscan.io/tx/",
  },
  Harmony: {
    type: EVM,
    token: "ONE",
    img: One,
    rpc: "https://api.harmony.one",
    chainId: 1666600000,
    Chain: Chain.HARMONY,
    tx: "https://explorer.harmony.one/tx/",
    testTx: "https://explorer.testnet.harmony.one/tx/",
  },
  Aurora: {
    type: EVM,
    token: "AETH",
    img: Aurora,
    rpc: "https://mainnet.aurora.dev",
    chainId: 1313161554,
    Chain: Chain.AURORA,
    tx: "https://explorer.mainnet.aurora.dev/tx/",
  },
  GateChain: {
    type: EVM,
    token: "GT",
    img: GT,
    rpc: "https://evm.gatenode.cc",
    tnRpc: "https://meteora-evm.gatenode.cc",
    chainId: "86",
    Chain: Chain.GATECHAIN,
    tx: "https://www.gatescan.org/tx/"
  },
  VeChain: {
    type: EVM,
    token: "VET",
    image: VET,
    rpc: "https://sync-mainnet.veblocks.net",
    tnRpc: "https://sync-testnet.veblocks.net",
    chainId: 39,
    Chain: Chain.VECHAIN,
    tx: "https://explore-testnet.vechain.org/transactions/",
    testTx: "https://explore-testnet.vechain.org/transactions/"
  }
};

export const coins = [
  "eGLD", // 0
  "HT", // 1
  "BNB", // 2
  "ETH", // 3
  "AVAX", // 4
  "MATIC", // 5
  "FTM", // 6
  "TRX", // 7
  "CELO", // 8
  "ONE", // 9
  "ONG", // 10
  "XDAI", //11
  "FUSE", //12
  "VELAS", //13
  "TEZOS", //14
  "IOTX", //15
  "ONE", //16
  "AETH", //17
  "GT", //18
  "VET", //19
];

export const TESTNET_CHAIN_INFO = {
  Ethereum: {
    nonce: 5,
    chainId: 3
  },
  BSC: {
    nonce: 4,
    chainId: 97,
  },
  Polygon: {
    nonce: 0x7,
    chainId: 80001,
  },
  Elrond: {
    nonce: 2,
  },
  Harmony: {
    nonce: 12,
    chainId: 1666700000,
  },
  Avalanche: {
      nonce: 6,
      chainId: 43113
  },
  Tezos: {
    nonce: 0x12,
  },
  Algorand: {
    nonce: 15
  },
  GateChain: {
    nonce: 0x17,
    chainId: 85,
  },
  VeChain:  {
    nonce: 0x19,
    chainId: 39
  }
};

export const CHAIN_INFO = {
  Elrond: {
    nonce: 2,
    native: "EGLD",
    decimals: 1e18,
    blockExplorerUrls: "https://explorer.elrond.com/address/"
  },
  TON: {
    nonce: 3,
    native: coins[1],
    chainId: 256,
    rpcUrl: "https://http-testnet.hecochain.com",
    decimals: 1e18,
    contract: "0x1247a6cB7aA2c90C6B9eF96AE3E7b269139BE06b",
    blockExplorerUrls: "https://testnet.hecoinfo.com/address",
    testBlockExplorerUrls: "https://testnet-explorer.elrond.com/address"
  },
  BSC: {
    nonce: 4,
    native: coins[2],
    chainId: 56,
    tnChainId: 97,
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
    decimals: 1e18,
    contract: "0x12889E870A48Be2A04564e74f66fC91D439Da03e",
    blockExplorerUrls: "https://bscscan.com/address/",
    testBlockExplorerUrls: "https://testnet.bscscan.com/address/",
  },
  Algorand: {
    nonce: 15,
    native: coins[8],
    chainId: 15,
    rpcUrl: "https://algorand-node.xp.network/",
    decimals: 1e6,
    contract: "MGEZOCMF263SDRXYKNGVNTCIGM4RZXAF3HLS4MNTFVFTJC6LWGAGLBCW7E",
    blockExplorerUrls: "https://algoexplorer.io/address/",
    testBlockExplorerUrls: "https://testnet.algoexplorer.io/address/"
  },
  Ethereum: {
    nonce: 5,
    native: coins[3],
    chainId: 1,
    rpcUrl: "https://ropsten.infura.io/v3/182b3d3fb2d14d5fbe7421348624d1ce",
    decimals: 1e18,
    contract: "0x2C742F65E6FEcDbb4ceE3D35473e39012aEDf3DD",
    blockExplorerUrls: "https://ropsten.etherscan.io/address/",
    testBlockExplorerUrls: "https://ropsten.etherscan.io/address/"
  },
  Avalanche: {
    nonce: 6,
    native: coins[4],
    chainId: 43114,
    tnChainId: 43113,
    rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
    decimals: 1e18,
    contract: "0xAcFB2E7d6e6272f192D0D573A9bD1CC9d534dE1c",
    blockExplorerUrls: "https://snowtrace.io/address/",
    testBlockExplorerUrls: "https://testnet.snowtrace.io/address/"
  },
  Polygon: {
    nonce: 0x7,
    native: coins[5],
    chainId: 137,
    tnChainId: 80001,
    decimals: 1e18,
    rpcUrl: "https://matic-testnet-archive-rpc.bwarelabs.com",
    contract: "0x9E93256Df2a4fE757f8AEB533D3943E56ba8CF94",
    blockExplorerUrls: "https://mumbai.polygonscan.com/address/",
    testBlockExplorerUrls: "https://mumbai.polygonscan.com/address/"
  },
  Fantom: {
    native: coins[6],
    nonce: 0x8,
    rpcUrl: "https://rpc.testnet.fantom.network/",
    decimals: 1e18,
    chainId: 250,
    contract: "0xbc53f71E12007b93Ed2868E5f6CAE1D2ceB7287C",
    blockExplorerUrls: "https://ftmscan.com/address/",
    testBlockExplorerUrls: "https://testnet.ftmscan.com/address"
  },
  Tron: {
    native: coins[7],
    nonce: 0x9,
    rpcUrl: "https://api.shasta.trongrid.io/",
    decimals: 1e6,
    contract: "4179ff0b4e9e3f67806ff17e1d708a9490ef121e29",
    blockExplorerUrls: "https://tronscan.io/#/address/",
    testBlockExplorerUrls: "https://shasta.tronscan.org/#/address/"
  },
  Celo: {
    native: coins[8],
    nonce: 0xb,
    decimals: 1e18,
    rpcUrl: "https://alfajores-forno.celo-testnet.org",
    chainId: 44787,
    blockExplorerUrls: "https://alfajores-blockscout.celo-testnet.org/tx",
    contract: "0xE595D1CD77619d891A338dD09Fd64A57704a5375",
  },
  Harmony: {
    native: coins[9],
    nonce: 0xc,
    decimals: 1e18,
    rpcUrl: "https://api.s0.b.hmny.io",
    chainId: 1666700000,
    tnChainId: 1666700000,
    contract: "0x22ddFB8954c9D75598385c6ad82cDeb124a78Bb3",
    blockExplorerUrls: "https://explorer.harmony.one/address",
    testBlockExplorerUrls: "https://explorer.testnet.harmony.one/address/",
  },
  xDai: {
    native: coins[11],
    nonce: 14,
    decimals: 1e18,
    rpcUrl: "https://rpc.xdaichain.com/",
    chainId: 100,
    contract: "0xdceB7a6b2d2cC149aA74E049231c94D072eDF3E8",
    blockExplorerUrls: "https://blockscout.com/xdai/mainnet/address",
    testBlockExplorerUrls: "https://blockscout.com/xdai/testnet/address/"
  },
  Fuse: {
    native: coins[12],
    nonce: 16,
    decimals: 1e18,
    rpc: "https://rpc.fuse.io/",
    chainId: 122,
    contract: "",
    blockExplorerUrls: "https://explorer.fuse.io/address/",
    testBlockExplorerUrls: "https://explorer.fusespark.io/address/"
  },
  Velas: {
    native: coins[13],
    nonce: 19,
    decimals: 1e18,
    rpc: "https://velasnode.quigon.com/velas",
    chainId: 106,
    contract: "",
    blockExplorerUrls: "https://evmexplorer.velas.com/address/",
    testBlockExplorerUrls: "https://explorer.testnet.velas.com/address"
  },
  Tezos: {
    native: coins[14],
    nonce: 0x12,
    decimals: 1e6,
    rpc: "https://mainnet-tezos.giganode.io/",
    chainId: 0x12,
    contract: "",
    blockExplorerUrls: "https://tzstats.com/",
    testBlockExplorerUrls: "https://hangzhounet.tzkt.io/address"
  },
  Iotex: {
    native: coins[15],
    nonce: 0x14,
    decimals: 1e18,
    rpc: "https://babel-api.mainnet.iotex.io",
    chainId: 4689,
    contract: "",
    blockExplorerUrls: "https://iotexscan.io/address/",
    testBlockExplorerUrls: "https://testnet.iotexscan.io/"
  },
  Aurora: {
    native: coins[17],
    nonce: 0x15,
    decimals: 1e18,
    rpc: "https://mainnet.aurora.dev",
    chainId: 1313161554,
    contract: "",
    blockExplorerUrls: "https://explorer.mainnet.aurora.dev/address/",
    testBlockExplorerUrls: "https://testnet.aurorascan.dev/address/"
  },
  GateChain: {
    native: coins[18],
    nonce: 0x17,
    decimals: 1e18,
    rpc: "https://evm.gatenode.cc",
    chainId: 86,
    blockExplorerUrls: "https://gatescan.org/address/?lang=en_US",
    testBlockExplorerUrls: "https://gatescan.org/testnet/address?lang=en_US"
  },
  VeChain: {
    native: coins[19],
    nonce: 0x19,
    decimals: 1e18,
    chainId: 74,
    tnChainId: 39,
    rpc: "https://sync-testnet.veblocks.net",
    blockExplorerUrl: "https://explore.vechain.org/accounts/",
    testBlockExplorerUrls: "https://explore-testnet.vechain.org/accounts/"
  }
};
