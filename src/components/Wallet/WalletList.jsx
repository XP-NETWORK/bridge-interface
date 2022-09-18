import MaiarModal from "../MaiarModal";
import EVMWallet from "./EVMWallet";
import TezosWallet from "./TezosWallet";
import AlgorandWallet from "./AlgorandWallet";
import TronWallet from "./TronWallet";
import ElrondWallet from "./ElrondWallet";
import USBWallet from "./USBWallet";
import VeChainWallet from "./VeChainWallet";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import BitKeep from "../../assets/img/wallet/bitkeep.svg";
import CosmosWallet from "./CosmosWallet";
import { biz } from "../values";
import HederaWallet from "./HederaWallet";
import { useLocation } from "react-router-dom";
import Unscopables from "./Unscopables";

export default function WalletList({ search, connected, input, discount }) {
  const from = useSelector((state) => state.general.from);
  const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
  const location = useLocation();

  const sortWallet = (components) => {
    let sortedWallets;
    const evmWallets = components.filter(
      (e) => e.type === "EVM" || e.type === "Skale"
    );
    const tezosWallets = components.filter((e) => e.type === "Tezos");
    const elrondWallets = components.filter((e) => e.type === "Elrond");
    const algodWallets = components.filter((e) => e.type === "Algorand");
    const VeChainWallets = components.filter((e) => e.type === "VeChain");
    const tronWallets = components.filter((e) => e.type === "Tron");
    const cosmosWallets = components.filter((e) => e.type === "Cosmos");
    const usbWallet = components.filter((e) => e.type === "USB");
    const hederaWallets = components.filter((e) => e.type === "Hedera");

    if (discount) {
      sortedWallets = [...evmWallets];
      return;
    }

    switch (temporaryFrom?.type || from?.type) {
      case "EVM":
        sortedWallets = [
          ...evmWallets,
          ...hederaWallets,
          ...cosmosWallets,
          ...tezosWallets,
          ...elrondWallets,
          ...algodWallets,
          ...tronWallets,
          ...VeChainWallets,
          ...usbWallet,
        ];
        return sortedWallets;
      case "Skale":
        sortedWallets = [
          ...evmWallets,
          ...hederaWallets,
          ...cosmosWallets,
          ...tezosWallets,
          ...elrondWallets,
          ...algodWallets,
          ...tronWallets,
          ...VeChainWallets,
          ...usbWallet,
        ];
        return sortedWallets;
      case "Tezos":
        sortedWallets = [
          ...tezosWallets,
          ...evmWallets,
          ...hederaWallets,
          ...cosmosWallets,
          ...elrondWallets,
          ...algodWallets,
          ...tronWallets,
          ...VeChainWallets,
          ...usbWallet,
        ];
        return sortedWallets;
      case "Elrond":
        sortedWallets = [
          ...elrondWallets,
          ...evmWallets,
          ...hederaWallets,
          ...cosmosWallets,
          ...tezosWallets,
          ...algodWallets,
          ...tronWallets,
          ...VeChainWallets,
          ...usbWallet,
        ];
        return sortedWallets;
      case "Algorand":
        sortedWallets = [
          ...algodWallets,
          ...evmWallets,
          ...hederaWallets,
          ...cosmosWallets,
          ...elrondWallets,
          ...tezosWallets,
          ...tronWallets,
          ...VeChainWallets,
          ...usbWallet,
        ];
        return sortedWallets;
      case "VeChain":
        sortedWallets = [
          ...VeChainWallets,
          ...evmWallets,
          ...hederaWallets,
          ...cosmosWallets,
          ...algodWallets,
          ...elrondWallets,
          ...tezosWallets,
          ...tronWallets,
          ...usbWallet,
        ];
        return sortedWallets;
      case "Tron":
        sortedWallets = [
          ...tronWallets,
          ...evmWallets,
          ...hederaWallets,
          ...cosmosWallets,
          ...algodWallets,
          ...elrondWallets,
          ...tezosWallets,
          ...VeChainWallets,
          ...usbWallet,
        ];
        return sortedWallets;
      case "Cosmos":
        sortedWallets = [
          ...cosmosWallets,
          ...evmWallets,
          ...hederaWallets,
          ...algodWallets,
          ...elrondWallets,
          ...tezosWallets,
          ...VeChainWallets,
          ...tronWallets,
          ...usbWallet,
        ];
        return sortedWallets;
      case "Hedera":
        sortedWallets = [
          ...hederaWallets,
          ...evmWallets,
          ...algodWallets,
          ...elrondWallets,
          ...tezosWallets,
          ...VeChainWallets,
          ...tronWallets,
          ...usbWallet,
        ];
        return sortedWallets;
      default:
        break;
    }
  };

  const walletComponents = [
    {
      Component: (
        <EVMWallet wallet={"MetaMask"} key="wallet-index-0" close={connected} />
      ),
      name: "MetaMask",
      type: "EVM",
      mobile: true,
      desktop: true,
      order: 1,
    },
    {
      Component: (
        <EVMWallet
          wallet={"TrustWallet"}
          key="wallet-index-2"
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
        <EVMWallet
          wallet={"WalletConnect"}
          key="wallet-index-1"
          close={connected}
        />
      ),
      name: "WalletConnect",
      type: "EVM",
      mobile: true,
      desktop: true,
      order: 3,
    },
    {
      Component: (
        <EVMWallet
          wallet={"BitKeep"}
          key="wallet-index-1-bitkeep"
          close={connected}
          discount={discount}
        />
      ),
      name: "BitKeep",
      type: "EVM",
      mobile: true,
      desktop: true,
      order: 3,
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
      desktop: false,
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
                    key="wallet-index-14"
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
                    key="wallet-index-15"
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
                <CosmosWallet
                    key="wallet-index-16"
                    wallet={"Fina"}
                    close={connected}
                />
            ),
            name: "Fina",
            type: "Cosmos",
            mobile: true,
            desktop: false,
            order: 14,
        },
        {
            Component: (
                <USBWallet
                    wallet={"Ledger"}
                    key="wallet-index-11"
                    connected={connected}
                />
            ),
            name: "Ledger",
            mobile: false,
            desktop: true,
            order: 15,
            type: "USB",
        },
        {
            Component: (
                <USBWallet key="wallet-index-12" connected={connected} />
            ),
            name: "Trezor",
            mobile: false,
            desktop: true,
            order: 16,
            type: "USB",
        },
        {
            Component: <HederaWallet close={connected} wallet={"Hashpack"} />,
            name: "Hashpack",
            mobile: false,
            desktop: true,
            order: 17,
            type: "Hedera",
        },
        {
            Component: <HederaWallet close={connected} wallet={"Blade"} />,
            name: "Blade",
            mobile: false,
            desktop: true,
            order: 18,
            type: "Hedera",
        },
        {
            Component: <Unscopables close={connected} />,
            name: "Unscopables",
            mobile: false,
            desktop: true,
            order: 14,
            type: "Unscopables§",
        },
    ];


  // const evmWallets = walletComponents.filter(
  //     (e) => e.type === "EVM" || e.type === "Skale"
  // );

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
                .map((wallet) => wallet.Component)}
        </ul>
      );
  }
}
