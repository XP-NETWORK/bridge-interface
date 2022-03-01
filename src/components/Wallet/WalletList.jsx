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
        { Component: <EVMWallet wallet={"MetaMask"} />, name: "MetaMask", type: "EVM" },
        { Component: <EVMWallet wallet={undefined} />, name: "WalletConnect", type: "EVM" },
        { Component: <EVMWallet wallet={"TrustWallet"} />, name: "Trust Wallet", type: "EVM" },
        { Component: <AlgorandWallet wallet={"MyAlgo"} />, name: "MyAlgo", type: "Algorand" },
        { Component: <AlgorandWallet wallet={"AlgoSigner"} />, name: "AlgoSigner", type: "Algorand" },
        { Component: <AlgorandWallet wallet={undefined} />, name: "Algorand Wallet", type: "Algorand" },
        { Component: <TronWallet />, name: "TronLink", type: "Tron"},
        { Component: <TezosWallet wallet={"TempleWallet"} />, name: "Temple Wallet Tezos", type: "Tezos" },
        { Component: <TezosWallet wallet={undefined} />, name: "Beacon Tezos", type: "Tezos" },
        { Component: <ElrondWallet wallet={"Maiar"} />, name: "Maiar Elrond", type: "Elrond" },
        { Component: <ElrondWallet wallet={undefined} />, name: "Maiar Extension Elrond", type: "Elrond" },
        { Component: <USBWallet wallet={"Ledger"} />, name: "Ledger", type: '' },
        { Component: <USBWallet />, name: "Trezor", type: '' }
     ]

  return (
    <ul className="walletList scrollSty">
        { !search ? walletComponents.sort( wallet => wallet.name.includes(from.text) ? -1 : 0 ).map( wallet => wallet.Component)
        : walletComponents.sort( wallet => wallet.name.includes(from.text) ? -1 : 0 ).filter( wallet => wallet.name.toLowerCase().includes(search.toLocaleLowerCase())).map( wallet => wallet.Component)}
    </ul>
  )
}
