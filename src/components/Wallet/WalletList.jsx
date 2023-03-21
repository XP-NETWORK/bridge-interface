import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// import EVMWallet from "./EVMWallet";
import TezosWallet from "./TezosWallet";
import AlgorandWallet from "./AlgorandWallet";
import TronWallet from "./TronWallet";
// import ElrondWallet from "./ElrondWallet";
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
// import Solana from "./SOLWallet";
import { biz } from "../values";
import Phantom from "./SOLWallet/Phantom";
import Solflare from "./SOLWallet/Solflare";
import OKX from "./EVMWallet/OKX";
import XPortal from "./MultiversXWallet/XPortal";
import MultiversXDeFi from "./MultiversXWallet/MultiversXDeFi";

export default function WalletList({ connected, input, discount }) {
    const from = useSelector((state) => state.general.from);
    const location = useLocation();

    const walletComponents = [
        {
            Component: (
                <MetaMask
                    wallet={"MetaMask"}
                    key="metamask"
                    close={connected}
                />
            ),
            name: "MetaMask",
            type: "EVM",
            mobile: true,
            desktop: true,
            order: 1,
            keyName: "MetaMask",
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
            keyName: "TrustWallet",
        },
        {
            Component: (
                <WalletConnect
                    wallet={"WalletConnect"}
                    key="wallet-connect"
                    close={connected}
                />
            ),
            name: "WalletConnect",
            type: "EVM",
            mobile: true,
            desktop: true,
            order: 1,
            keyName: "WalletConnect",
        },
        {
            Component: (
                <BitKeep
                    wallet={"BitKeep"}
                    key="bitKeep"
                    close={connected}
                    discount={discount}
                />
            ),
            name: "BitKeep",
            type: "EVM",
            mobile: true,
            desktop: true,
            order: 1,
            keyName: "BitKeep",
        },
        {
            Component: (
                <OKX
                    wallet={"OKX"}
                    key="OKX"
                    close={connected}
                    discount={discount}
                />
            ),
            name: "OKX",
            type: "EVM",
            mobile: false,
            desktop: false,
            order: 1,
            keyName: "OKX",
        },
        {
            Component: (
                <TezosWallet
                    wallet={"TempleWallet"}
                    key="wallet-index-7"
                    close={connected}
                />
            ),
            name: "Temple Wallet",
            type: "Tezos",
            mobile: true,
            desktop: true,
            order: 4,
            keyName: "TempleWallet",
        },
        {
            Component: (
                <TezosWallet
                    wallet={"Beacon"}
                    key="wallet-index-8"
                    close={connected}
                />
            ),
            name: "Beacon",
            type: "Tezos",
            mobile: true,
            desktop: true,
            order: 5,

            keyName: "Beacon",
        },
        {
            Component: <XPortal wallet={"xPortal"} key="wallet-index-9" />,
            name: "xPortal",
            type: "Elrond",
            mobile: true,
            desktop: true,
            order: 6,
            keyName: "xPortal",
        },
        {
            Component: (
                <MultiversXDeFi wallet={undefined} key="wallet-index-10" />
            ),
            name: "MultiversX DeFi Wallet",
            type: "Elrond",
            mobile: false,
            desktop: true,
            order: 7,
            keyName: "MultiversX DeFi Wallet",
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
            keyName: "MyAlgo",
        },
        {
            Component: (
                <AlgorandWallet
                    wallet={"AlgoSigner"}
                    key="wallet-index-4"
                    close={connected}
                />
            ),
            name: "Algo Signer",
            type: "Algorand",
            mobile: false,
            desktop: true,
            order: 9,
            keyName: "AlgoSigner",
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
            keyName: "Algorand Wallet",
        },
        {
            Component: <TronWallet key="wallet-index-6" close={connected} />,
            name: "TronLink",
            type: "Tron",
            mobile: true,
            desktop: true,
            order: 11,
            keyName: "TronLink",
        },
        {
            Component: (
                <VeChainWallet key="wallet-index-14" close={connected} />
            ),
            name: "Sync2",
            type: "VeChain",
            mobile: true,
            desktop: true,
            order: 12,
            keyName: "Sync2",
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
            mobile: biz,
            desktop: false,
            order: 13,
            keyName: "VeChainThor",
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
            mobile: true,
            desktop: true,
            order: 14,
            keyName: "Keplr",
        },
        {
            Component: (
                <CosmosWallet
                    key="wallet-index-17"
                    wallet={"Fina"}
                    close={connected}
                />
            ),
            name: "Fina",
            type: "Cosmos",
            mobile: true,
            desktop: false,
            order: 14,
            keyName: "Fina",
        },
        {
            Component: <TonKeeper key="TonKeeper" close={connected} />,
            name: "TonKeeper",
            mobile: biz,
            desktop: true,
            order: 14,
            type: "TON",
            keyName: "TonKeeper",
        },
        {
            Component: <TonHub key="TonHub" close={connected} />,
            name: "TonHub",
            mobile: biz,
            desktop: true,
            order: 14,
            type: "TON",
            keyName: "TonHub",
        },
        {
            Component: <TonWallet key="TonWallet" close={connected} />,
            name: "Ton Wallet",
            mobile: false,
            desktop: true,
            order: 14,
            type: "TON",
            keyName: "Ton Wallet",
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
            keyName: "Hashpack",

            mobile: biz,
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
            mobile: biz,
            desktop: biz,
            order: 18,
            type: "Hedera",
            keyName: "Blade",
        },
        {
            Component: <Unscopables key="wallet-index-21" close={connected} />,
            name: "Unstoppable Domains",
            mobile: true,
            desktop: true,
            order: 14,
            type: "EVM",
            keyName: "Unstoppable Domains",
        },
        {
            Component: <Martioan key="martian" close={connected} />,
            name: "Martian",
            keyName: "Martian",

            mobile: false,
            desktop: false,
            order: 19,
            type: "APTOS",
        },
        {
            Component: <Petra key="petra" close={connected} />,
            name: "Petra",
            keyName: "Petra",

            mobile: false,
            desktop: true,
            order: 20,
            type: "APTOS",
        },
        {
            Component: <Pontem key="pontem" close={connected} />,
            name: "Pontem",
            keyName: "Pontem",
            mobile: false,
            desktop: false,
            order: 19,
            type: "APTOS",
        },
        {
            Component: <NearWallet key="near" close={connected} />,
            name: "NearWallet",
            mobile: false,
            desktop: true,
            order: -888,
            type: "NEAR",
            keyName: "NearWallet",
        },
        {
            Component: <Phantom key="Phantom" close={connected} />,
            name: "Phantom",
            mobile: true,
            desktop: true,
            order: -889,
            type: "Solana",
            keyName: "Phantom",
        },

        {
            Component: <Solflare key="Solflare" close={connected} />,
            name: "Solflare",
            mobile: true,
            desktop: true,
            order: -889,
            type: "Solana",
            keyName: "Solflare",
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

    // const filteredWallets = input
    // ? walletComponents
    //       .sort((a, b) => b.order - a.order)
    //       .filter((wallet) =>
    //           wallet.name.toLowerCase().includes(input.toLowerCase())
    //       )
    // : from
    // ? sortWallet(walletComponents)
    // : walletComponents.sort((a, b) => a.order - b.order);

    const filteredWallets = input
        ? walletComponents
              .sort((a, b) => b.order - a.order)
              .filter((wallet) =>
                  wallet.keyName.toLowerCase().includes(input.toLowerCase())
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
                              .filter(
                                  (e) => e.type === "EVM" || e.type === "Skale"
                              )
                              .filter((wallet) => wallet.mobile)
                              .map((wallet) => wallet.Component)
                        : walletComponents
                              .filter(
                                  (e) => e.type === "EVM" || e.type === "Skale"
                              )
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
