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
    clientID: "uauth_client_id",
    redirectUri: "http://localhost:3000",

    // Must include both the openid and wallet scopes.
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
        // The UI Assets
        display: UAuthWeb3Modal.display,

        // The Connector
        connector: UAuthWeb3Modal.connector,

        // The SPA libary
        package: UAuthSPA,

        // The SPA libary options
        options: uauthOptions,
    },
};

export const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions, // required
});

UAuthWeb3Modal.registerWeb3Modal(web3Modal);
