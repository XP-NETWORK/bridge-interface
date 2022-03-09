import MaiarModal from "../MaiarModal";
import EVMWallet from "./EVMWallet";
import TezosWallet from "./TezosWallet";
import AlgorandWallet from "./AlgorandWallet";
import TronWallet from "./TronWallet";
import ElrondWallet from "./ElrondWallet";
import USBWallet from "./USBWallet";
import { useSelector } from "react-redux";

export default function WalletList({search, connected}) {

    const from = useSelector(state => state.general.from)

    const walletComponents = [
        { Component: <EVMWallet wallet={"MetaMask"} key="wallet-index-0" close={connected} />, name: "MetaMask", type: "EVM"},
        { Component: <EVMWallet wallet={undefined} key="wallet-index-1" close={connected} />, name: "WalletConnect", type: "EVM" },
        { Component: <EVMWallet wallet={"TrustWallet"} key="wallet-index-2" close={connected} />, name: "Trust Wallet", type: "EVM" },
        { Component: <AlgorandWallet wallet={"MyAlgo"} key="wallet-index-3" close={connected} />, name: "MyAlgo", type: "Algorand" },
        { Component: <AlgorandWallet wallet={"AlgoSigner"} key="wallet-index-4" close={connected} />, name: "AlgoSigner", type: "Algorand" },
        { Component: <AlgorandWallet wallet={undefined} key="wallet-index-5" close={connected} />, name: "Algorand Wallet", type: "Algorand" },
        { Component: <TronWallet key="wallet-index-6" close={connected} />, name: "TronLink", type: "Tron"},
        { Component: <TezosWallet wallet={"TempleWallet"} key="wallet-index-7" close={connected} />, name: "Temple Wallet Tezos", type: "Tezos" },
        { Component: <TezosWallet wallet={undefined} key="wallet-index-8" close={connected} />, name: "Beacon Tezos", type: "Tezos" },
        { Component: <ElrondWallet wallet={"Maiar"} key="wallet-index-9" close={connected} />, name: "Maiar Elrond", type: "Elrond" },
        { Component: <ElrondWallet wallet={undefined} key="wallet-index-10" close={connected} />, name: "Maiar Extension Elrond", type: "Elrond" },
        { Component: <USBWallet wallet={"Ledger"} key="wallet-index-11" connected={connected} />, name: "Ledger", type: '' },
        { Component: <USBWallet key="wallet-index12" connected={connected} />, name: "Trezor", type: '' }
     ]

  return (
    <ul className="walletList scrollSty">
        {walletComponents.map( wallet => wallet.Component)}
    </ul>
  )
}
