import Etherium from "../assets/img/chain/Etherium.svg";
import Heco from "../assets/img/chain/HECO.svg";
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
import Aurora from "../assets/img/chain/aurora.svg"
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
    order: 4,
    image: { avatar: true, src: Etherium },
    maintenance: false,
    testNet: false,
    mainnet: true
  },
  {
    type: "EVM",
    key: "BSC",
    text: "BSC",
    value: "BSC",
    order: 5,
    image: { avatar: true, src: Binance },
    maintenance: false,
    testNet: true,
    mainnet: true

  },
  {
    type: "Tron",
    key: "Tron",
    text: "Tron",
    value: "Tron",
    order: 6,
    image: { avatar: true, src: Tron },
    maintenance: true,
    testNet: false,
    mainnet: true

  },
  {
    type: "Elrond",
    key: ELROND,
    text: ELROND,
    value: ELROND,
    order: 6,
    image: { avatar: true, src: Elrond },
    maintenance: false,
    testNet: false,
    mainnet: true
  },
  {
    type: "EVM",
    key: "Polygon",
    text: "Polygon",
    value: "Polygon",
    order: 8,
    image: { avatar: true, src: Polygon },
    maintenance: true,
    testNet: true,
    mainnet: true
  },
  {
    type: "EVM",
    key: "Avalanche",
    text: "Avalanche",
    value: "Avalanche",
    order: 7,
    image: { avatar: true, src: Avalanche },
    maintenance: false,
    testNet: true,
    mainnet: true
  },
  {
    type: "EVM",
    key: "Fantom",
    text: "Fantom",
    value: "Fantom",
    order: 9,
    image: { avatar: true, src: Fantom },
    maintenance: true,
    testNet: false,
    mainnet: true
  },
  {
    type: "Algorand",
    key: "Algorand",
    text: "Algorand",
    value: "Algorand",
    order: 5,
    image: { avatar: true, src: Algorand },
    maintenance: true,
    testNet: false,
    mainnet: true
  },
  {
    type: "EVM",
    key: "xDai",
    text: "xDai",
    value: "xDai",
    order: 10,
    image: { avatar: true, src: Gnosis },
    maintenance: false,
    testNet: false,
    mainnet: true
  },
  {
    type: "Solana",
    key: "Solana",
    text: "Solana",
    value: "Solana",
    order: 21,
    coming: true,
    image: { avatar: true, src: Solana },
    maintenance: false,
    testNet: false,
    mainnet: false
  },
  {
    type: "Cardano",
    key: "Cardano",
    text: "Cardano",
    value: "Cardano",
    order: 20,
    coming: true,
    image: { avatar: true, src: Cardano },
    maintenance: false,
    testNet: false,
    mainnet: false
  },
  {
    type: "EVM",
    key: "Heco",
    text: "Heco",
    value: "Heco",
    order: 22,
    coming: true,
    image: { avatar: true, src: Heco },
    maintenance: false,
    testNet: false,
    mainnet: false
  },
  {
    type: "EVM",
    key: "Fuse",
    text: "Fuse",
    value: "Fuse",
    order: 11,
    image: { avatar: true, src: Fuse },
    maintenance: true,
    testNet: false,
    mainnet: true
  },
  {
    type: "EVM",
    key: "Velas",
    text: "Velas",
    value: "Velas",
    order: 1,
    image: { avatar: true, src: Velas },
    newChain: true,
    maintenance: false,
    testNet: false,
    mainnet: true
  },
  {
    type: "Tezos",
    key: "Tezos",
    text: "Tezos",
    value: "Tezos",
    order: 2,
    image: { avatar: true, src: Tezos },
    newChain: false,
    coming: false,
    maintenance: true,
    testNet: false,
    mainnet: true
  },
  {
    type: "EVM",
    key: "Iotex",
    text: "Iotex",
    value: "Iotex",
    order: 2,
    image: { avatar: true, src: Iotex },
    newChain: true,
    coming: false,
    maintenance: false,
    testNet: false,
    mainnet: true,
    off: true
  },
  {
    type: "EVM",
    key: "Harmony",
    text: "Harmony",
    value: "Harmony",
    order: 3,
    image: { avatar: true, src: One },
    maintenance: false,
    testNet: true,
    mainnet: false,
    newChain: true,
    // off: true
  },
  {
    type: "EVM",
    key: "Aurora",
    text: "Aurora",
    value: "Aurora",
    order: 4,
    image: { avatar: true, src: Aurora },
    maintenance: false,
    testnet: false,
    mainnet: false,
    newChain: true
  }
];

export const chainsConfig = {
  Algorand: {
    Chain: 15,
    token: "ALGO",
    tx: "https://algoexplorer.io/tx/",
  },
  Heco: {
    type: EVM,
    img: Heco,
    Chain: Chain.HECO,
  },
  Tron: {
    type: "TRON",
    chainId: 0x9,
    token: "TRX",
    img: Tron,
    rpc: "https://api.trongrid.io/",
    tx: "https://tronscan.org/#/transaction/",
    Chain: Chain.TRON,
  },
  Ethereum: {
    type: EVM,
    img: Etherium,
    chainId: 1,
    rpc:
      "https://rough-dawn-meadow.quiknode.pro/2629bf63052353892b121c240f57f6b19a74ac8c/",
    tx: "https://etherscan.io/tx/",
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
    rpc: "https://wandering-shy-leaf.bsc.quiknode.pro/ad8d20d7895c15e9afc03ff011dc3418152b07f7/",
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
      "https://red-black-water.matic.quiknode.pro/a1bec0e749c6fed57405002677902b7046c59689/",
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
    testTx: "https://testnet.snowtrace.io/tx/"
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
    tx: "https://tzstats.com/",
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
    image: Aurora,
    rpc: "https://mainnet.aurora.dev",
    chainId: 1313161554,
    Chain: Chain.AURORA,
    tx: "https://explorer.mainnet.aurora.dev/tx/"
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
];

export const TESTNET_CHAIN_INFO = {
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
  }
};

export const CHAIN_INFO = {
  Elrond: {
    nonce: 2,
    native: "EGLD",
    decimals: 1e18,
  },
  HECO: {
    nonce: 3,
    native: coins[1],
    chainId: 256,
    rpcUrl: "https://http-testnet.hecochain.com",
    decimals: 1e18,
    contract: "0x1247a6cB7aA2c90C6B9eF96AE3E7b269139BE06b",
    blockExplorerUrls: "https://testnet.hecoinfo.com/tx",
  },
  BSC: {
    nonce: 4,
    native: coins[2],
    chainId: 56,
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
    decimals: 1e18,
    contract: "0x12889E870A48Be2A04564e74f66fC91D439Da03e",
    blockExplorerUrls: "https://testnet.bscscan.com/tx",
  },
  Algorand: {
    nonce: 15,
    native: coins[8],
    chainId: 15,
    rpcUrl: "https://algorand-node.xp.network/",
    decimals: 1e6,
    contract: "MGEZOCMF263SDRXYKNGVNTCIGM4RZXAF3HLS4MNTFVFTJC6LWGAGLBCW7E",
    blockExplorerUrls: "https://algoexplorer.io/tx/",
  },
  Ethereum: {
    nonce: 5,
    native: coins[3],
    chainId: 1,
    rpcUrl: "https://ropsten.infura.io/v3/182b3d3fb2d14d5fbe7421348624d1ce",
    decimals: 1e18,
    contract: "0x2C742F65E6FEcDbb4ceE3D35473e39012aEDf3DD",
    blockExplorerUrls: "https://ropsten.etherscan.io/tx",
  },
  Avalanche: {
    nonce: 6,
    native: coins[4],
    chainId: 43114,
    rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
    decimals: 1e18,
    blockExplorerUrls: "https://cchain.explorer.avax-test.network/tx",
    contract: "0xAcFB2E7d6e6272f192D0D573A9bD1CC9d534dE1c",
  },
  Polygon: {
    nonce: 0x7,
    native: coins[5],
    chainId: 137,
    decimals: 1e18,
    rpcUrl: "https://matic-testnet-archive-rpc.bwarelabs.com",
    contract: "0x9E93256Df2a4fE757f8AEB533D3943E56ba8CF94",
    blockExplorerUrls: "https://mumbai.polygonscan.com/tx",
  },
  Fantom: {
    native: coins[6],
    nonce: 0x8,
    rpcUrl: "https://rpc.testnet.fantom.network/",
    decimals: 1e18,
    chainId: 250,
    contract: "0xbc53f71E12007b93Ed2868E5f6CAE1D2ceB7287C",
    blockExplorerUrls: "https://explorer.testnet.fantom.network/transactions",
  },
  Tron: {
    native: coins[7],
    nonce: 0x9,
    rpcUrl: "https://api.shasta.trongrid.io/",
    decimals: 1e6,
    contract: "4179ff0b4e9e3f67806ff17e1d708a9490ef121e29",
    blockExplorerUrls: "https://shasta.tronscan.org/#/transaction",
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
    blockExplorerUrls: "https://explorer.pops.one/tx",
    contract: "0x22ddFB8954c9D75598385c6ad82cDeb124a78Bb3",
  },
  Ont: {
    native: coins[10],
    nonce: 0xd,
    decimals: 1e18,
    rpcUrl: "https://testing-bridge.xp.network/ontio",
    chainId: 5851,
    blockExplorerUrls: "https://explorer.ont.io/testnet/tx",
    contract: "0xdceB7a6b2d2cC149aA74E049231c94D072eDF3E8",
  },
  xDai: {
    native: coins[11],
    nonce: 14,
    decimals: 1e18,
    rpcUrl: "https://rpc.xdaichain.com/",
    chainId: 100,
    blockExplorerUrls: "https://blockscout.com/xdai/mainnet/",
    contract: "0xdceB7a6b2d2cC149aA74E049231c94D072eDF3E8",
  },
  Fuse: {
    native: coins[12],
    nonce: 16,
    decimals: 1e18,
    rpc: "https://rpc.fuse.io/",
    chainId: 122,
    blockExplorerUrls: "",
    contract: "",
  },
  Velas: {
    native: coins[13],
    nonce: 19,
    decimals: 1e18,
    rpc: "https://velasnode.quigon.com/velas",
    chainId: 106,
    blockExplorerUrls: "",
    contract: "",
  },
  Tezos: {
    native: coins[14],
    nonce: 0x12,
    decimals: 1e6,
    rpc: "https://mainnet-tezos.giganode.io/",
    chainId: 0x12,
    blockExplorerUrls: "",
    contract: "",
  },
  Iotex: {
    native: coins[15],
    nonce: 0x14,
    decimals: 1e18,
    rpc: "https://babel-api.mainnet.iotex.io",
    chainId: 4689,
    blockExplorerUrls: "",
    contract: "",
  },
  Harmony: {
    native: coins[16],
    nonce: 12,
    decimals: 1e18,
    rpc: "https://rpc.s0.t.hmny.io",
    chainId: 1666600000,
    blockExplorerUrls: "",
    contract: "",
  },
  Aurora: {
    native: coins[17],
    nonce: 0x15,
    decimals: 1e18,
    rpc: "https://mainnet.aurora.dev",
    chainId: 1313161554,
    blockExplorerUrls: "",
    contract: "",
  }
};
