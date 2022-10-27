import store from "../../store/store";
import Unscopables from "./Unscopables";

export const sortWallet = (components) => {
    const {
        discount: { discount },
        general: { temporaryFrom, from },
    } = store.getState();

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
    const tonWallets = components.filter((e) => e.type === "TON");

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
                ...tonWallets,
                Unscopables,
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
                ...tonWallets,
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
                ...tonWallets,
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
                ...tonWallets,
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
                ...tonWallets,
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
                ...tonWallets,
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
                ...tonWallets,
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
                ...tonWallets,
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
                ...tonWallets,
                ...usbWallet,
            ];
            return sortedWallets;
        case "TON":
            sortedWallets = [
                ...tonWallets,
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
