import Ethereum from "../assets/img/chain/Etherium.svg";
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
import GT from "../assets/img/chain/GateChain.svg";
import VET from "../assets/img/chain/Vechain.png";
import { Chain } from "xp.network/dist/consts";
import SCRT from "../assets/img/chain/secret.svg";
import CKB from "../assets/img/chain/godwoken.svg";
import HBAR from "../assets/img/chain/Hedera.svg";
import SFUEL from "../assets/img/chain/SFUEL.svg";

export const EVM = "EVM";
export const ELROND = "Elrond";
export const TEZOS = "TEZOS";

export const biz =
    window.location.hostname.includes("localhost") ||
    window.location.hostname.includes("staging") ||
    window.location.hostname.includes("development");

export const chains = [
    {
        type: "EVM",
        key: "Ethereum",
        text: "Ethereum",
        value: "Ethereum",
        nonce: 5,
        chainId: 1,
        tnChainId: 3,
        order: -1,
        image: { avatar: true, src: Ethereum },
        maintenance: false,
        testNet: true,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "BSC",
        text: "BSC",
        value: "BSC",
        nonce: 4,
        chainId: 56,
        tnChainId: 97,
        order: 2,
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
        nonce: 0x9,
        order: 5,
        image: { avatar: true, src: Tron },
        maintenance: false,
        testNet: true,
        mainnet: true,
        updated: false,
    },
    {
        type: "Elrond",
        key: ELROND,
        text: ELROND,
        value: ELROND,
        nonce: 2,
        order: 9,
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
        nonce: 0x7,
        chainId: 137,
        tnChainId: 80001,
        order: 1,
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
        nonce: 6,
        chainId: 43114,
        tnChainId: 43113,
        order: 3,
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
        nonce: 0x8,
        chainId: 250,
        order: 10,
        image: { avatar: true, src: Fantom },
        maintenance: false,
        testNet: false,
        mainnet: true,
        newChain: false,
    },
    {
        type: "Algorand",
        key: "Algorand",
        text: "Algorand",
        value: "Algorand",
        nonce: 15,
        order: 6,
        image: { avatar: true, src: Algorand },
        maintenance: false,
        testNet: true,
        mainnet: true,
        updated: false,
    },
    {
        type: "EVM",
        key: "xDai",
        text: "Gnosis",
        value: "xDai",
        nonce: 14,
        chainId: 100,
        order: 11,
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
        nonce: 16,
        chainId: 122,
        order: 15,
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
        nonce: 19,
        chainId: 106,
        order: 14,
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
        nonce: 0x12,
        order: 7,
        image: { avatar: true, src: Tezos },
        newChain: false,
        coming: false,
        maintenance: false,
        testNet: true,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "Iotex",
        text: "Iotex",
        value: "Iotex",
        nonce: 0x14,
        chainId: 4689,
        order: 13,
        image: { avatar: true, src: Iotex },
        coming: false,
        maintenance: false,
        testNet: false,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "Harmony",
        text: "Harmony",
        value: "Harmony",
        nonce: 0xc,
        chainId: 1666600000,
        tnChainId: 1666700000,
        order: 0,
        image: { avatar: true, src: One },
        maintenance: false,
        testNet: false,
        mainnet: true,
        newChain: true,
    },
    {
        type: "EVM",
        key: "Aurora",
        text: "Aurora",
        value: "Aurora",
        nonce: 0x15,
        chainId: 1313161554,
        tnChainId: 1313161555,
        order: 1,
        image: { avatar: true, src: Aurora },
        maintenance: false,
        testNet: true,
        mainnet: true,
        newChain: true,
    },
    {
        type: "EVM",
        key: "Godwoken",
        text: "Godwoken",
        value: "Godwoken",
        nonce: 22,
        chainId: 71402,
        order: 10,
        image: { avatar: true, src: CKB },
        maintenance: false,
        testNet: true,
        mainnet: biz || window.location.hostname.includes("testing"),
        newChain: true,
    },
    {
        type: "EVM",
        key: "GateChain",
        text: "GateChain",
        value: "GateChain",
        nonce: 0x17,
        tnChainId: 85,
        chainId: 86,
        order: 12,
        image: { avatar: true, src: GT },
        maintenance: false,
        testNet: false,
        mainnet: true,
        newChain: false,
    },
    {
        type: "VeChain",
        key: "VeChain",
        text: "VeChain",
        value: "VeChain",
        nonce: 0x19,
        tnChainId: 39,
        chainId: undefined,
        order: -3,
        image: { avatar: true, src: VET },
        maintenance: false,
        mainnet: true,
        testNet: false,
        newChain: true,
    },
    {
        type: "Cosmos",
        key: "Secret",
        text: "Secret",
        value: "Secret",
        nonce: 0x18,
        order: 0,
        tnChainId: "pulsar-2",
        image: { avatar: true, src: SCRT },
        mainnet: false,
        testNet: biz,
        test: false,
        newChain: biz,
    },
    {
        type: "Hedera",
        key: "Hedera",
        text: "Hedera",
        nonce: 0x1d,
        order: 0,
        image: { avatar: true, src: HBAR },
        testNet: true,
        mainnet: false,
        newChain: true,
    },
    {
        type: "Skale",
        key: "Skale",
        text: "Skale",
        once: 0x1e,
        order: 0,
        image: { avatar: true, src: SFUEL },
        testNet: true,
        mainnet: false,
        newChain: true,
    },
];

export const chainsConfig = {
    Algorand: {
        Chain: 15,
        token: "ALGO",
        img: Algorand,
        tx: "https://algoexplorer.io/tx/",
        testTx: "https://testnet.algoexplorer.io/",
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
        tx: "https://tronscan.org/#/transaction/",
        Chain: Chain.TRON,
    },
    Ethereum: {
        type: EVM,
        img: Ethereum,
        chainId: 1,
        rpc: "https://mainnet.infura.io/v3/",
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
        rpc: "https://bsc-dataseed.binance.org/",
        Chain: Chain.BSC,
    },
    Polygon: {
        type: EVM,
        token: "MATIC",
        img: Polygon,
        tx: "https://polygonscan.com/tx/",
        testTx: "https://mumbai.polygonscan.com/tx/",
        chainId: 137,
        rpc: "https://rpc-mainnet.matic.network",
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
        tx: "https://tezblock.io/transaction/",
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
        tsChainId: 1666700000,
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
        tnChainId: 1313161555,
        Chain: Chain.AURORA,
        tx: "https://explorer.mainnet.aurora.dev/tx/",
        testTx: "https://explore-testnet.vechain.org/tx/",
    },
    GateChain: {
        type: EVM,
        token: "GT",
        img: GT,
        rpc: "https://evm.gatenode.cc",
        tnRpc: "https://meteora-evm.gatenode.cc",
        chainId: "86",
        Chain: Chain.GATECHAIN,
        tx: "https://www.gatescan.org/tx/",
    },
    VeChain: {
        type: EVM,
        token: "VET",
        img: VET,
        rpc: "https://sync-mainnet.veblocks.net",
        tnRpc: "https://sync-testnet.veblocks.net",
        chainId: 39,
        Chain: Chain.VECHAIN,
        tx: "https://explore.vechain.org/transactions/",
        testTx: "https://explore-testnet.vechain.org/transactions/",
        variants: ["Vechain"],
    },

    Secret: {
        type: "Cosmos",
        token: "SCRT",
        image: SCRT,
        tnChainId: "pulsar-2",
        tnRpc: "https://pulsar-2.api.trivium.network:9091",
        Chain: Chain.SECRET,
    },

    Godwoken: {
        type: EVM,
        token: "CKB",
        image: CKB,
        chainId: 71402,
        tnChainId: 71401,
        Chain: Chain.GODWOKEN,
        tx: "https://gwscan.com/tx/",
        testTxn: "https://v1.testnet.gwscan.com/tx",
    },
    Hedera: {
        type: "Hedera",
        token: "HBAR",
        image: HBAR,
        Chain: Chain.HEDERA,
        tx: "https://hashscan.io/#/mainnet/transaction",
        testTxn: "https://hashscan.io/#/testnet/transaction",
    },
    Skale: {
        type: "Skale",
        token: "sFUEL",
        image: SFUEL,
        Chain: Chain.SKALE,
        tx: "",
        testTxn:
            "https://rapping-zuben-elakrab.explorer.staging-v2.skalenodes.com/tx",
    },
};
// ?        chainId: 1564830818,
// tnChainId: 0x4a393bf89c676,
export const coins = [
    "eGLD", // 0
    "HT", // 1
    "BNB", // 2
    "ETH", // 3
    "AVAX", // 4
    "MATIC", // 5
    "FTM", // 6
    "TRX", // 7
    "ALGO", // 8
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
    "CKB", //20
    "SCRT", //21
    "HBAR", //22
    "SFUEL", //23
];

export const TESTNET_CHAIN_INFO = {
    Ethereum: {
        nonce: 5,
        chainId: 3,
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
        chainId: 43113,
    },
    Tezos: {
        nonce: 0x12,
    },
    Algorand: {
        nonce: 15,
    },
    GateChain: {
        nonce: 0x17,
        chainId: 85,
    },
    VeChain: {
        nonce: 0x19,
        chainId: 39,
    },
    Aurora: {
        nonce: 0x15,
        chainId: 1313161555,
    },
    Godwoken: {
        nonce: 22,
        chainId: 71401,
    },
    Hedera: { nonce: 0x1d },
    Skale: {
        nonce: 0x1e,
        chainId: 0x4a393bf89c676,
    },
};

export const CHAIN_INFO = {
    Elrond: {
        nonce: 2,
        native: "EGLD",
        decimals: 1e18,
        blockExplorerUrls: "https://explorer.elrond.com/address/",
    },
    TON: {
        nonce: 3,
        native: coins[1],
        chainId: 256,
        rpcUrl: "https://http-testnet.hecochain.com",
        decimals: 1e18,
        contract: "0x1247a6cB7aA2c90C6B9eF96AE3E7b269139BE06b",
        blockExplorerUrls: "https://testnet.hecoinfo.com/address",
        testBlockExplorerUrls: "https://testnet-explorer.elrond.com/address",
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
        testBlockExplorerUrls: "https://testnet.algoexplorer.io/address/",
    },
    Ethereum: {
        nonce: 5,
        native: coins[3],
        chainId: 1,
        rpcUrl: "https://ropsten.infura.io/v3/182b3d3fb2d14d5fbe7421348624d1ce",
        decimals: 1e18,
        contract: "0x2C742F65E6FEcDbb4ceE3D35473e39012aEDf3DD",
        blockExplorerUrls: "https://ropsten.etherscan.io/address/",
        testBlockExplorerUrls: "https://ropsten.etherscan.io/address/",
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
        testBlockExplorerUrls: "https://testnet.snowtrace.io/address/",
    },
    Polygon: {
        nonce: 0x7,
        native: coins[5],
        chainId: 137,
        tnChainId: 80001,
        decimals: 1e18,
        rpcUrl: "https://matic-testnet-archive-rpc.bwarelabs.com",
        contract: "0x9E93256Df2a4fE757f8AEB533D3943E56ba8CF94",
        blockExplorerUrls: "https://polygonscan.com/address/",
        testBlockExplorerUrls: "https://mumbai.polygonscan.com/address/",
    },
    Fantom: {
        native: coins[6],
        nonce: 0x8,
        rpcUrl: "https://rpc.testnet.fantom.network/",
        decimals: 1e18,
        chainId: 250,
        contract: "0xbc53f71E12007b93Ed2868E5f6CAE1D2ceB7287C",
        blockExplorerUrls: "https://ftmscan.com/address/",
        testBlockExplorerUrls: "https://testnet.ftmscan.com/address",
    },
    Tron: {
        native: coins[7],
        nonce: 0x9,
        rpcUrl: "https://api.shasta.trongrid.io/",
        decimals: 1e6,
        contract: "4179ff0b4e9e3f67806ff17e1d708a9490ef121e29",
        blockExplorerUrls: "https://tronscan.io/#/address/",
        testBlockExplorerUrls: "https://shasta.tronscan.org/#/address/",
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
        chainId: 1666600000,
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
        testBlockExplorerUrls: "https://blockscout.com/xdai/testnet/address/",
    },
    Fuse: {
        native: coins[12],
        nonce: 16,
        decimals: 1e18,
        rpc: "https://rpc.fuse.io/",
        chainId: 122,
        contract: "",
        blockExplorerUrls: "https://explorer.fuse.io/address/",
        testBlockExplorerUrls: "https://explorer.fusespark.io/address/",
    },
    Velas: {
        native: coins[13],
        nonce: 19,
        decimals: 1e18,
        rpc: "https://velasnode.quigon.com/velas",
        chainId: 106,
        contract: "",
        blockExplorerUrls: "https://evmexplorer.velas.com/address/",
        testBlockExplorerUrls: "https://explorer.testnet.velas.com/address",
    },
    Tezos: {
        native: coins[14],
        nonce: 0x12,
        decimals: 1e6,
        rpc: "https://mainnet-tezos.giganode.io/",
        chainId: 0x12,
        contract: "",
        blockExplorerUrls: "https://tzstats.com/",
        testBlockExplorerUrls: "https://hangzhounet.tzkt.io/address",
    },
    Iotex: {
        native: coins[15],
        nonce: 0x14,
        decimals: 1e18,
        rpc: "https://babel-api.mainnet.iotex.io",
        chainId: 4689,
        contract: "",
        blockExplorerUrls: "https://iotexscan.io/address/",
        testBlockExplorerUrls: "https://testnet.iotexscan.io/",
    },
    Aurora: {
        native: coins[17],
        nonce: 0x15,
        decimals: 1e18,
        rpc: "https://mainnet.aurora.dev",
        chainId: 1313161554,
        contract: "",
        blockExplorerUrls: "https://explorer.mainnet.aurora.dev/address/",
        testBlockExplorerUrls: "https://testnet.aurorascan.dev/address/",
    },
    GateChain: {
        native: coins[18],
        nonce: 0x17,
        decimals: 1e18,
        rpc: "https://evm.gatenode.cc",
        chainId: 86,
        blockExplorerUrls: "https://gatescan.org/address/",
        testBlockExplorerUrls: "https://gatescan.org/testnet/address/",
    },
    VeChain: {
        native: coins[19],
        nonce: 0x19,
        decimals: 1e18,
        chainId: 74,
        tnChainId: 39,
        rpc: "https://sync-testnet.veblocks.net",
        blockExplorerUrl: "https://explore.vechain.org/accounts/",
        testBlockExplorerUrls: "https://explore-testnet.vechain.org/accounts/",
    },

    Secret: {
        native: coins[21],
        nonce: 0x18,
        chainId: "cosmoshub-4",
        tnChainId: "pulsar-2",
        chainId: "secret-4",
        decimals: 1e6,
        blockExplorerUrl: "https://atomscan.com/secret-network/",
        testBlockExplorerUrls: "https://chainofsecrets.org/testnet.html/",
    },
    Godwoken: {
        native: coins[20],
        nonce: 22,
        decimals: 1e18,
        chainId: 71402,
        tnChainId: 71401,
        rpc: "https://v1.mainnet.godwoken.io/rpc",
        blockExplorerUrl: "https://gwscan.com/account/",
        testBlockExplorerUrls: "https://v1.testnet.gwscan.com/account",
    },
    Hedera: {
        native: coins[22],
        nonce: 0x1d,
        decimals: 1e6,
        blockExplorerUrl: "https://hashscan.io/#/mainnet/account",
        testBlockExplorerUrls: "https://hashscan.io/#/testnet/account",
    },
    Skale: {
        native: coins[23],
        none: 0x1e,
        decimals: 1e18,
        chainId: 1564830818,
        tnChainId: 0x4a393bf89c676,
        blockExplorerUrl: "",
        testBlockExplorerUrls:
            "https://rapping-zuben-elakrab.explorer.staging-v2.skalenodes.com/address",
    },
};
