import Etherium from '../assets/img/chain/Etherium.svg';
import Heco from '../assets/img/chain/Heco.svg';
import Elrond from '../assets/img/chain/Elrond.svg';
import Binance from '../assets/img/chain/Binance.svg';
import Cardano from '../assets/img/chain/Cardano.svg';
import Algorand from '../assets/img/chain/Algarand.svg';
import Tron from "../assets/img/chain/Tron.svg"
import Polygon from "../assets/img/chain/Polygon.svg"
import Avalanche from "../assets/img/chain/Avalanche.svg"
import Fantom from "../assets/img/chain/Fantom.svg"
import Xdai from "../assets/img/chain/Xdai.svg"
import Solana from "../assets/img/chain/Solana.svg"
import { Chain } from "xp.network/dist/consts";

export const EVM = "EVM";
export const ELROND = "Elrond";

export const chains = [
    {
        type: "EVM",
        key: 'Ethereum',
        text: 'Ethereum',
        value: 'Ethereum',
        image: { avatar: true, src: Etherium },
    },
    {
        type: "EVM",
        key: 'BSC',
        text: 'BSC',
        value: 'BSC',
        image: { avatar: true, src: Binance },
    },
    {
        type: "Tron",
        key: 'Tron',
        text: 'Tron',
        value: 'Tron',
        image: { avatar: true, src: Tron },
    },
    {
        type: "Elrond",
        key: ELROND,
        text: ELROND,
        value: ELROND,
        image: { avatar: true, src: Elrond },
    },
    {
        type: "EVM",
        key: 'Polygon',
        text: 'Polygon',
        value: 'Polygon',
        image: { avatar: true, src: Polygon },
    },
    {
        type: "EVM",
        key: 'Avalanche',
        text: 'Avalanche',
        value: 'Avalanche',
        image: { avatar: true, src: Avalanche },
    },
    {
        type: "EVM",
        key: 'Fantom',
        text: 'Fantom',
        value: 'Fantom',
        image: { avatar: true, src: Fantom },
    },
    {
        type: "Algorand",
        key: 'Algorand',
        text: 'Algorand',
        value: 'Algorand',
        coming: true,
        image: { avatar: true, src: Algorand },
    },
    {
        type: "EVM",
        key: 'xDai',
        text: 'xDai',
        value: 'xDai',
        image: { avatar: true, src: Xdai },
    },
    {
        type: 'Solana',
        key: 'Solana',
        text: 'Solana',
        value: 'Solana',
        coming: true,
        image: { avatar: true, src: Solana },
    },
    {
        type: 'Cardano',
        key: 'Cardano',
        text: 'Cardano',
        value: 'Cardano',
        coming: true,
        image: { avatar: true, src: Cardano },
    },
    {
        type: "EVM",
        key: 'Heco',
        text: 'Heco',
        value: 'Heco',
        coming: true,
        image: { avatar: true, src: Heco },
    },
]

export const chainsConfig = {
    Heco: {
        type: EVM,
        img: Heco,
        // chainData: ChainData.Heco,
        Chain: Chain.HECO,
    },
    Tron: {
        type: 'TRON',
        chainId: 0x9,
        token: 'TRX', 
        rpc: 'https://api.trongrid.io/',
        tx: 'https://tronscan.org/#/transaction/',
        // chainData: ChainData.Tron,
        Chain: Chain.TRON
    },
    Ethereum: {
        type: EVM,
        chainId: 1,
        rpc: 'https://rough-dawn-meadow.quiknode.pro/2629bf63052353892b121c240f57f6b19a74ac8c/',
        tx: 'https://etherscan.io/tx/',
        token: 'ETH',
        // chainData: ChainData.Ethereum,
        Chain: Chain.ROPSTEN,
    },
    BSC: {
        type: EVM,
        token: 'BNB',
        chainId: 56,
        tx: 'https://bscscan.com/tx/',
        rpc: 'https://wandering-shy-leaf.bsc.quiknode.pro/8fb0366ce43528907ebf07a02b1f5a1f7df0f1b7/',
        // chainData: ChainData.BSC,
        Chain: Chain.BSC,
    }, 
    Polygon: {
        type: EVM,
        token: 'MATIC',

        tx: 'https://polygonscan.com/tx/',
        chainId: 137,
        rpc: 'https://red-black-water.matic.quiknode.pro/a1bec0e749c6fed57405002677902b7046c59689/',
        Chain: Chain.POLYGON,
        // chainData: ChainData.Polygon
    },
    xDai: {
        type: EVM,
        token: 'XDAI',
        tx: 'https://blockscout.com/xdai/mainnet/tx/',
        chainId: 100,
        rpc: 'https://wandering-wispy-lake.xdai.quiknode.pro/0ba55a1ce5cfbed132c1f91eef80958173559918/',
        Chain: Chain.XDAI,
        // chainData: ChainData.xDai
    },
    Fantom: {
        type: EVM,
        token: 'FTM',
        chainId: 250,
        tx: 'https://ftmscan.com/tx/',
        rpc: 'https://summer-dark-sea.fantom.quiknode.pro/96ff3e9e727ddccec57f93e68ad321c6e02e88a0/',
        Chain: Chain.FANTOM,
        // chainData: ChainData.Fantom
    },
    Elrond: {
        type: ELROND,
        token: 'EGLD',
        // chainData: ChainData.Elrond,
        Chain: Chain.ELROND,
        tx: 'https://explorer.elrond.com/transactions/'

    },
    Avalanche: {
        type: EVM,
        token: 'AVAX',
        rpc: 'https://avaxnode.xp.network/ext/bc/C/rpc',
        chainId: 43114,
        // chainData: ChainData.Avalanche,
        Chain: Chain.AVALANCHE

    }

}