import MaiarModal from "../MaiarModal";
import EVMWallet from "./EVMWallet";
import TezosWallet from "./TezosWallet";
import AlgorandWallet from "./AlgorandWallet";
import TronWallet from "./TronWallet";
import ElrondWallet from "./ElrondWallet";
import USBWallet from "./USBWallet";
import { useSelector } from "react-redux";

export default function WalletList({search}) {

    const from = useSelector(state => state.general.from)

    const walletComponents = [
        { Component: <EVMWallet wallet={"MetaMask"} key="wallet-index-0" />, name: "MetaMask", type: "EVM"},
       
        { Component: <EVMWallet wallet={"TrustWallet"} key="wallet-index-2" />, name: "Trust Wallet", type: "EVM" },
        { Component: <AlgorandWallet wallet={"MyAlgo"} key="wallet-index-3" />, name: "MyAlgo", type: "Algorand" },
        { Component: <AlgorandWallet wallet={"AlgoSigner"} key="wallet-index-4" />, name: "AlgoSigner", type: "Algorand" },
        { Component: <AlgorandWallet wallet={undefined} key="wallet-index-5" />, name: "Algorand Wallet", type: "Algorand" },
        { Component: <TronWallet key="wallet-index-6" />, name: "TronLink", type: "Tron"},
        { Component: <TezosWallet wallet={"TempleWallet"} key="wallet-index-7" />, name: "Temple Wallet Tezos", type: "Tezos" },
        { Component: <TezosWallet wallet={undefined} key="wallet-index-8" />, name: "Beacon Tezos", type: "Tezos" },
        { Component: <ElrondWallet wallet={"Maiar"} key="wallet-index-9" />, name: "Maiar Elrond", type: "Elrond" },
        { Component: <ElrondWallet wallet={undefined} key="wallet-index-10" />, name: "Maiar Extension Elrond", type: "Elrond" },
        { Component: <EVMWallet wallet={undefined} key="wallet-index-1" />, name: "WalletConnect", type: "EVM" },
        { Component: <USBWallet wallet={"Ledger"} key="wallet-index-11" />, name: "Ledger", type: '' },
        { Component: <USBWallet key="wallet-index12" />, name: "Trezor", type: '' }
     ]

  return (
    <ul className="walletList scrollSty">
        { !search ? walletComponents.sort( wallet => wallet.name.includes(from.text) ? -1 : 0 ).map( wallet => wallet.Component)
        : walletComponents.sort( wallet => wallet.name.includes(from.text) ? -1 : 0 ).filter( wallet => wallet.name.toLowerCase().includes(search.toLocaleLowerCase())).map( wallet => wallet.Component)}
    </ul>
  )
}
