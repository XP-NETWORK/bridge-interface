/* eslint-disable no-debugger */
import { HashConnect } from "hashconnect";

import icon from "./../../../assets/img/icons/XPNET.svg";

export const hashConnect = new HashConnect();

export const connectHashPack = async (testnet) => {
    // debugger;
    let initData;
    let appMetadata = {
        url: location.origin,
        name: "XP.NETWORK Multi-chain NFT bridge",
        description:
            "Seamlessly move assets between chains | The first multichain NFT bridge to connect all major Blockchains into one ecosystem",
        icon: icon,
    };
    try {
        initData = await hashConnect.init(
            appMetadata,
            testnet ? "testnet" : "mainnet",
            false
        );

        hashConnect.connectToLocalWallet();
        return initData;
    } catch (error) {
        console.log(error, "err2or");
        return false;
    }
};
