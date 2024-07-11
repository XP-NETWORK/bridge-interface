import store from "../../store/store";

// import Unstoppables from "./Unstoppables";

export const sortWallet = (components) => {
    // eslint-disable-next-line no-debugger
    // debugger;
    const {
        discount: { discount },
        general: { temporaryFrom, from },
    } = store.getState();

    let sortedWallets;
    const evmWallets = components.filter(
        (e) => e.type === "EVM" || e.type === "Skale"
    );
    // const tezosWallets = components.filter((e) => e.type === "Tezos");
    // const elrondWallets = components.filter((e) => e.type === "Elrond");
    // const algodWallets = components.filter((e) => e.type === "Algorand");
    // const VeChainWallets = components.filter((e) => e.type === "VeChain");
    // const tronWallets = components.filter((e) => e.type === "Tron");
    // const cosmosWallets = components.filter((e) => e.type === "Cosmos");
    // const usbWallet = components.filter((e) => e.type === "USB");
    const hederaWallets = components.filter((e) => e.type === "Hedera");
    // const tonWallets = components.filter((e) => e.type === "TON");
    // const aptosWallets = components.filter((e) => e.type === "APTOS");
    // const solanaWallet = components.filter((e) => e.type === "Solana");
    // const nearWallets = components.filter((e) => e.type === "NEAR");
    // const icpWallets = components.filter((e) => e.type === "ICP");
    // const casperWallets = components.filter((e) => e.type === "Casper");
    if (discount) {
        sortedWallets = [...evmWallets];
        return;
    }

    switch (temporaryFrom?.type || from?.type) {
        case "EVM":
            sortedWallets = [
                ...evmWallets,
                // ...hederaWallets,
                // ...cosmosWallets,
                // ...tezosWallets,
                // ...elrondWallets,
                // ...algodWallets,
                // ...tronWallets,
                // ...VeChainWallets,
                // ...tonWallets,
                // ...aptosWallets,
                // ...nearWallets,
                // ...icpWallets,
                // ...usbWallet,
                // Unstoppables,
            ];
            return sortedWallets;
        // case "Skale":
        //     sortedWallets = [
        //         ...evmWallets,
        //         ...hederaWallets,
        //         ...cosmosWallets,
        //         ...tezosWallets,
        //         ...elrondWallets,
        //         ...algodWallets,
        //         ...tronWallets,
        //         ...VeChainWallets,
        //         ...tonWallets,
        //         ...icpWallets,
        //         ...aptosWallets,
        //         ...nearWallets,
        //         ...usbWallet,
        //     ];
        //     return sortedWallets;
        // case "Tezos":
        //     sortedWallets = [
        //         ...tezosWallets,
        //         ...evmWallets,
        //         ...hederaWallets,
        //         ...cosmosWallets,
        //         ...elrondWallets,
        //         ...algodWallets,
        //         ...tronWallets,
        //         ...VeChainWallets,
        //         ...tonWallets,
        //         ...icpWallets,
        //         ...nearWallets,
        //         ...aptosWallets,
        //         ...usbWallet,
        //     ];
        //     return sortedWallets;
        // case "Elrond":
        //     sortedWallets = [
        //         ...elrondWallets,
        //         ...evmWallets,
        //         ...hederaWallets,
        //         ...cosmosWallets,
        //         ...tezosWallets,
        //         ...algodWallets,
        //         ...tronWallets,
        //         ...VeChainWallets,
        //         ...icpWallets,
        //         ...tonWallets,
        //         ...aptosWallets,
        //         ...nearWallets,
        //         ...usbWallet,
        //     ];
        //     return sortedWallets;
        // case "Algorand":
        //     sortedWallets = [
        //         ...algodWallets,
        //         ...evmWallets,
        //         ...hederaWallets,
        //         ...cosmosWallets,
        //         ...elrondWallets,
        //         ...tezosWallets,
        //         ...tronWallets,
        //         ...VeChainWallets,
        //         ...icpWallets,
        //         ...tonWallets,
        //         ...aptosWallets,
        //         ...nearWallets,
        //         ...usbWallet,
        //     ];
        //     return sortedWallets;
        // case "VeChain":
        //     sortedWallets = [
        //         ...VeChainWallets,
        //         ...evmWallets,
        //         ...hederaWallets,
        //         ...cosmosWallets,
        //         ...algodWallets,
        //         ...elrondWallets,
        //         ...tezosWallets,
        //         ...tronWallets,
        //         ...tonWallets,
        //         ...aptosWallets,
        //         ...nearWallets,
        //         ...usbWallet,
        //     ];
        //     return sortedWallets;
        // case "Tron":
        //     sortedWallets = [
        //         ...tronWallets,
        //         ...evmWallets,
        //         ...hederaWallets,
        //         ...cosmosWallets,
        //         ...algodWallets,
        //         ...elrondWallets,
        //         ...tezosWallets,
        //         ...VeChainWallets,
        //         ...tonWallets,
        //         ...aptosWallets,
        //         ...nearWallets,
        //         ...usbWallet,
        //     ];
        //     return sortedWallets;
        // case "Cosmos":
            // sortedWallets = [
                // ...cosmosWallets,
                // ...evmWallets,
                // ...hederaWallets,
                // ...algodWallets,
                // ...elrondWallets,
                // ...tezosWallets,
                // ...VeChainWallets,
                // ...tronWallets,
                // ...tonWallets,
                // ...icpWallets,
                // ...aptosWallets,
                // ...nearWallets,
                // ...usbWallet,
            // ];
            // return sortedWallets;
        case "Hedera":
            sortedWallets = [
                ...hederaWallets,
                // ...evmWallets,
                // ...algodWallets,
                // ...elrondWallets,
                // ...tezosWallets,
                // ...VeChainWallets,
                // ...icpWallets,
                // ...tronWallets,
                // ...tonWallets,
                // ...nearWallets,
                // ...aptosWallets,
                // ...usbWallet,
            ];
            return sortedWallets;
        // case "TON":
        //     sortedWallets = [
        //         ...tonWallets,
        //         ...hederaWallets,
        //         ...evmWallets,
        //         ...algodWallets,
        //         ...icpWallets,
        //         ...elrondWallets,
        //         ...tezosWallets,
        //         ...VeChainWallets,
        //         ...tronWallets,
        //         ...nearWallets,
        //         ...aptosWallets,
        //         ...usbWallet,
        //     ];
        //     return sortedWallets;
        // case "APTOS":
        //     sortedWallets = [
        //         ...aptosWallets,
        //         ...evmWallets,
        //         ...algodWallets,
        //         ...elrondWallets,
        //         ...tezosWallets,
        //         ...icpWallets,
        //         ...VeChainWallets,
        //         ...tronWallets,
        //         ...tonWallets,
        //         ...nearWallets,
        //         ...hederaWallets,
        //         ...usbWallet,
        //     ];
        //     return sortedWallets;
        // case "Solana":
        //     sortedWallets = [
        //         ...solanaWallet,
        //         ...evmWallets,
        //         ...algodWallets,
        //         ...elrondWallets,
        //         ...tezosWallets,
        //         ...VeChainWallets,
        //         ...tronWallets,
        //         ...tonWallets,
        //         ...icpWallets,
        //         ...hederaWallets,
        //         ...aptosWallets,
        //         ...nearWallets,
        //         ...usbWallet,
        //     ];
        //     return sortedWallets;
        // case "NEAR":
        //     sortedWallets = [
        //         ...nearWallets,
        //         ...evmWallets,
        //         ...algodWallets,
        //         ...elrondWallets,
        //         ...tezosWallets,
        //         ...icpWallets,
        //         ...solanaWallet,
        //         ...VeChainWallets,
        //         ...tronWallets,
        //         ...tonWallets,
        //         ...hederaWallets,
        //         ...aptosWallets,
        //         ...usbWallet,
        //     ];
        //     return sortedWallets;
        // case "Casper": {
        //     sortedWallets = [...casperWallets];
        //     return sortedWallets;
        // }
        // case "ICP":
            // sortedWallets = [...icpWallets];
            // return sortedWallets;
        default:
            break;
    }
};
