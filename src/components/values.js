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

export const EVM = "EVM";
export const ELROND = "Elrond";
export const chains = [
    {
        key: 'Ethereum',
        text: 'Ethereum',
        value: 'Ethereum',
        image: { avatar: true, src: Etherium },
    },
    {
        key: 'BSC',
        text: 'BSC',
        value: 'BSC',
        image: { avatar: true, src: Binance },
    },
    {
        key: 'Tron',
        text: 'Tron',
        value: 'Tron',
        image: { avatar: true, src: Tron },
    },
    {
        key: ELROND,
        text: ELROND,
        value: ELROND,
        image: { avatar: true, src: Elrond },
    },
    {
        key: 'Polygon',
        text: 'Polygon',
        value: 'Polygon',
        image: { avatar: true, src: Polygon },
    },
    {
        key: 'Avalanche',
        text: 'Avalanche',
        value: 'Avalanche',
        image: { avatar: true, src: Avalanche },
    },
    {
        key: 'Fantom',
        text: 'Fantom',
        value: 'Fantom',
        image: { avatar: true, src: Fantom },
    },
    {
        key: 'Algorand',
        text: 'Algorand',
        value: 'Algorand',
        coming: true,
        image: { avatar: true, src: Algorand },
    },
    {
        key: 'xDai',
        text: 'xDai',
        value: 'xDai',
        image: { avatar: true, src: Xdai },
    },
    {
        key: 'Solana',
        text: 'Solana',
        value: 'Solana',
        coming: true,
        image: { avatar: true, src: Solana },
    },
    {
        key: 'Cardano',
        text: 'Cardano',
        value: 'Cardano',
        coming: true,
        image: { avatar: true, src: Cardano },
    },
    {
        key: 'Heco',
        text: 'Heco',
        value: 'Heco',
        coming: true,
        image: { avatar: true, src: Heco },
    },
]