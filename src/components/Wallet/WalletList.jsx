import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// import EVMWallet from "./EVMWallet";
import TezosWallet from "./TezosWallet";
import AlgorandWallet from "./AlgorandWallet";
import TronWallet from "./TronWallet";
import ElrondWallet from "./ElrondWallet";
// import USBWallet from "./USBWallet";
import VeChainWallet from "./VeChainWallet";
import PropTypes from "prop-types";
import CosmosWallet from "./CosmosWallet";
import HederaWallet from "./HederaWallet";
import Unscopables from "./Unscopables";
import { sortWallet } from "./WalletListHelper";
import TonWallet from "./TONWallet/TonWallet";
import TonKeeper from "./TONWallet/TonKeeper";
import TonHub from "./TONWallet/TonHub";
import BitKeep from "./EVMWallet/BitKeep";
import WalletConnect from "./EVMWallet/WalletConnect";
import MetaMask from "./EVMWallet/MetaMask";
import TrustWallet from "./EVMWallet/TrustWallet";
import Martioan from "./APTOSWallet/Martioan";
import Petra from "./APTOSWallet/Petra";
import Pontem from "./APTOSWallet/Pontem";
import NearWallet from "./NEARWallet/NearWallet";

export default function WalletList({ connected, input, discount }) {
  const from = useSelector((state) => state.general.from);
  const location = useLocation();

  const walletComponents = [
    {
      Component: (
        <MetaMask wallet={"MetaMask"} key="metamask" close={connected} />
      ),
      name: "MetaMask",
      type: "EVM",
      mobile: true,
      desktop: true,
      order: 1,
    },
    {
      Component: (
        <TrustWallet
          wallet={"TrustWallet"}
          key="trust-wallet"
          close={connected}
        />
      ),
      name: "Trust Wallet",
      type: "EVM",
      mobile: true,
      desktop: false,
      order: 2,
    },
    {
      Component: (
        <WalletConnect
          wallet={"MetaMask"}
          key="wallet-connect"
          close={connected}
        />
      ),
      name: "MetaMask",
      type: "EVM",
      mobile: true,
      desktop: true,
      order: 1,
    },
    {
      Component: (
        <BitKeep
          wallet={"MetaMask"}
          key="bitKeep"
          close={connected}
          discount={discount}
        />
      ),
      name: "MetaMask",
      type: "EVM",
      mobile: true,
      desktop: true,
      order: 1,
    },
    {
      Component: (
        <TezosWallet
          wallet={"TempleWallet"}
          key="wallet-index-7"
          close={connected}
        />
      ),
      name: "Temple Wallet Tezos",
      type: "Tezos",
      mobile: true,
      desktop: true,
      order: 4,
    },
    {
      Component: (
        <TezosWallet wallet={"Beacon"} key="wallet-index-8" close={connected} />
      ),
      name: "Beacon Tezos",
      type: "Tezos",
      mobile: true,
      desktop: true,
      order: 5,
    },
    {
      Component: (
        <ElrondWallet wallet={"Maiar"} key="wallet-index-9" close={connected} />
      ),
      name: "Maiar Elrond",
      type: "Elrond",
      mobile: true,
      desktop: true,
      order: 6,
    },
    {
      Component: (
        <ElrondWallet
          wallet={undefined}
          key="wallet-index-10"
          close={connected}
        />
      ),
      name: "Maiar Extension Elrond",
      type: "Elrond",
      mobile: false,
      desktop: true,
      order: 7,
    },
    {
      Component: (
        <AlgorandWallet
          wallet={"MyAlgo"}
          key="wallet-index-3"
          close={connected}
        />
      ),
      name: "MyAlgo",
      type: "Algorand",
      mobile: false,
      desktop: true,
      order: 8,
    },
    {
      Component: (
        <AlgorandWallet
          wallet={"AlgoSigner"}
          key="wallet-index-4"
          close={connected}
        />
      ),
      name: "AlgoSigner",
      type: "Algorand",
      mobile: false,
      desktop: true,
      order: 9,
    },
    {
      Component: (
        <AlgorandWallet
          wallet={undefined}
          key="wallet-index-5"
          close={connected}
        />
      ),
      name: "Algorand Wallet",
      type: "Algorand",
      mobile: true,
      desktop: true,
      order: 10,
    },
    {
      Component: <TronWallet key="wallet-index-6" close={connected} />,
      name: "TronLink",
      type: "Tron",
      mobile: true,
      desktop: true,
      order: 11,
    },
    {
      Component: <VeChainWallet key="wallet-index-14" close={connected} />,
      name: "Sync2",
      type: "VeChain",
      mobile: true,
      desktop: true,
      order: 12,
    },

    {
      Component: (
        <VeChainWallet
          key="wallet-index-15"
          wallet={"VeChainThor"}
          close={connected}
        />
      ),
      name: "VeChainThor",
      type: "VeChain",
      mobile: true,
      desktop: false,
      order: 13,
    },
    {
      Component: (
        <CosmosWallet
          key="wallet-index-16"
          wallet={"Keplr"}
          close={connected}
        />
      ),
      name: "Keplr",
      type: "Cosmos",
      mobile: "false",
      desktop: "true",
      order: 14,
    },
    {
      Component: (
        <CosmosWallet key="wallet-index-17" wallet={"Fina"} close={connected} />
      ),
      name: "Fina",
      type: "Cosmos",
      mobile: true,
      desktop: false,
      order: 14,
    },
    {
      Component: <TonKeeper key="TonKeeper" close={connected} />,
      name: "TonKeeper",
      mobile: true,
      desktop: true,
      order: 14,
      type: "TON",
    },
    {
      Component: <TonHub key="TonHub" close={connected} />,
      name: "TonHub",
      mobile: true,
      desktop: true,
      order: 14,
      type: "TON",
    },
    {
      Component: <TonWallet key="TonWallet" close={connected} />,
      name: "TonWallet",
      mobile: false,
      desktop: true,
      order: 14,
      type: "TON",
    },
    {
      Component: (
        <HederaWallet
          key="wallet-index-13"
          close={connected}
          wallet={"Hashpack"}
        />
      ),
      name: "Hashpack",
      mobile: false,
      desktop: true,
      order: 17,
      type: "Hedera",
    },
    {
      Component: (
        <HederaWallet
          key="wallet-index-20"
          close={connected}
          wallet={"Blade"}
        />
      ),
      name: "Blade",
      mobile: false,
      desktop: true,
      order: 18,
      type: "Hedera",
    },
    {
      Component: <Unscopables key="wallet-index-21" close={connected} />,
      name: "Unscopables",
      mobile: true,
      desktop: true,
      order: 14,
      type: "EVM",
    },
    {
      Component: <Martioan key="martian" close={connected} />,
      name: "Martian",
      mobile: false,
      desktop: true,
      order: 19,
      type: "APTOS",
    },
    {
      Component: <Petra key="petra" close={connected} />,
      name: "Petra",
      mobile: false,
      desktop: true,
      order: 20,
      type: "APTOS",
    },
    {
      Component: <Pontem key="pontem" close={connected} />,
      name: "Pontem",
      mobile: false,
      desktop: true,
      order: 19,
      type: "APTOS",
    },
    {
      Component: <NearWallet key="near" close={connected} />,
      name: "NearWallet",
      mobile: false,
      desktop: false,
      order: -888,
      type: "NEAR",
    },
    // ////////////!!!!
    // {
    //     Component: (
    //         <USBWallet
    //             wallet={"Ledger"}
    //             key="wallet-index-11"
    //             connected={connected}
    //         />
    //     ),
    //     name: "Ledger",
    //     mobile: false,
    //     desktop: true,
    //     order: 15,
    //     type: "USB",
    // },
    // {
    //     Component: (
    //         <USBWallet key="wallet-index-12" connected={connected} />
    //     ),
    //     name: "Trezor",
    //     mobile: false,
    //     desktop: true,
    //     order: 16,
    //     type: "USB",
    // },
  ];

  const filteredWallets = input
    ? walletComponents
        .sort((a, b) => b.order - a.order)
        .filter((wallet) =>
          wallet.name.toLowerCase().includes(input.toLowerCase())
        )
    : from
    ? sortWallet(walletComponents)
    : walletComponents.sort((a, b) => a.order - b.order);

  switch (location.pathname) {
    case "/deposits":
      return (
        <ul className="walletList scrollSty">
          {window.innerWidth < 600
            ? walletComponents
                .filter((e) => e.type === "EVM" || e.type === "Skale")
                .filter((wallet) => wallet.mobile)
                .map((wallet) => wallet.Component)
            : walletComponents
                .filter((e) => e.type === "EVM" || e.type === "Skale")
                .filter((wallet) => wallet.desktop)
                .map((wallet) => wallet.Component)}
        </ul>
      );

    default:
      return (
        <ul className="walletList scrollSty">
          {window.innerWidth < 600
            ? filteredWallets
                .filter((wallet) => wallet.mobile)
                .map((wallet) => wallet.Component)
            : filteredWallets
                .filter((wallet) => wallet.desktop)
                .map((wallet) => {
                  return wallet.Component;
                })}
        </ul>
      );
  }
}
//  WalletList({ search, connected, input })
WalletList.propTypes = {
  connected: PropTypes.any,
  discount: PropTypes.bool,
  input: PropTypes.string,
};
