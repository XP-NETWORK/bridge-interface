import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import * as UAuthWeb3Modal from "@uauth/web3modal";
import UAuthSPA from "@uauth/js";

export const injected = new InjectedConnector({});

export const algoConnector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org", // Required
    qrcodeModal: QRCodeModal,
});

export const uauthOptions = {
    clientID: "f909d011-195c-4688-92b4-2cab4c550dcc",
    redirectUri: "http://localhost:3000",
    scope: "openid wallet",
};

export const providerOptions = {
    walletonnect: {
        package: WalletConnectProvider,
        options: {
            rpc: {
                137: "https://rpc-mainnet.matic.network",
            },
            chainId: 137,
        },
    },
    "custom-uauth": {
        display: UAuthWeb3Modal.display,
        connector: UAuthWeb3Modal.connector,
        package: UAuthSPA,
        options: uauthOptions,
    },
};

export const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions, // required
});

UAuthWeb3Modal.registerWeb3Modal(web3Modal);
