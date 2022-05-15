import MaiarModal from "../MaiarModal";
import EVMWallet from "./EVMWallet";
import TezosWallet from "./TezosWallet";
import AlgorandWallet from "./AlgorandWallet";
import TronWallet from "./TronWallet";
import ElrondWallet from "./ElrondWallet";
import USBWallet from "./USBWallet";
import VeChainWallet from "./VeChainWallet"
import { useSelector } from "react-redux";

export default function WalletList({search, connected, input}) {

    const from = useSelector(state => state.general.from)

  

    const walletComponents = [
        { Component: <EVMWallet wallet={"MetaMask"} key="wallet-index-0" close={connected} />, name: "MetaMask", type: "EVM", mobile: true, desktop: true },
        { Component: <EVMWallet wallet={"TrustWallet"} key="wallet-index-2" close={connected} />, name: "Trust Wallet", type: "EVM", mobile:true, desktop: false },
        { Component: <EVMWallet wallet={undefined} key="wallet-index-1" close={connected} />, name: "WalletConnect", type: "EVM", mobile: true, desktop: true },
        { Component: <TezosWallet wallet={"TempleWallet"} key="wallet-index-7" close={connected} />, name: "Temple Wallet Tezos", type: "Tezos", mobile: true, desktop: true },
        { Component: <TezosWallet wallet={undefined} key="wallet-index-8" close={connected} />, name: "Beacon Tezos", type: "Tezos", mobile: true, desktop: true },
        { Component: <ElrondWallet wallet={"Maiar"} key="wallet-index-9" close={connected} />, name: "Maiar Elrond", type: "Elrond", mobile: true, desktop: true },
        { Component: <ElrondWallet wallet={undefined} key="wallet-index-10" close={connected} />, name: "Maiar Extension Elrond", type: "Elrond", mobile: false, desktop: true },
        { Component: <AlgorandWallet wallet={"MyAlgo"} key="wallet-index-3" close={connected} />, name: "MyAlgo", type: "Algorand", mobile:false, desktop: true },
        { Component: <AlgorandWallet wallet={"AlgoSigner"} key="wallet-index-4" close={connected} />, name: "AlgoSigner", type: "Algorand", mobile:false, desktop: true },
        { Component: <AlgorandWallet wallet={undefined} key="wallet-index-5" close={connected} />, name: "Algorand Wallet", type: "Algorand", mobile:false, desktop: false },
        { Component: <TronWallet key="wallet-index-6" close={connected} />, name: "TronLink", type: "Tron", mobile:true, desktop: true},
        { Component: <VeChainWallet key="wallet-index-14" close={connected} />, name: "Sync2", type: "VeChain", mobile: true, desktop: true},
        { Component: <USBWallet wallet={"Ledger"} key="wallet-index-11" connected={connected} />, name: "Ledger", mobile:false, desktop: true },
        { Component: <USBWallet key="wallet-index12" connected={connected} />, name: "Trezor", mobile:false, desktop: true }
     ]

     const filteredWallets = input ? walletComponents.filter( wallet => wallet.name.toLowerCase().includes(input.toLowerCase())) : walletComponents

  return (
    <ul className="walletList scrollSty">
        { window.innerWidth < 600 ? filteredWallets.filter(wallet => wallet.mobile).map( wallet => wallet.Component) 
        :filteredWallets.filter(wallet => wallet.desktop).map( wallet => wallet.Component)}
    </ul>
  )
}
