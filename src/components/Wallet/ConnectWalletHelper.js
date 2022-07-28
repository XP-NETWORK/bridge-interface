import Connex from "@vechain/connex";
import { TempleWallet } from "@temple-wallet/dapp";
import { injected, algoConnector } from "../../wallet/connectors";
import store from "../../store/store";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import {
    WalletConnectProvider,
    ProxyProvider,
    ExtensionProvider,
} from "@elrondnetwork/erdjs";
import QRCode from "qrcode";
import {
    setTronWallet,
    setConfirmMaiarMob,
    setTronLink,
    setMetaMask,
    setTronLoginError,
    setStep,
    setOnMaiar,
    setElrondAccount,
    setMaiarProvider,
    setReset,
    setError,
    setTronPopUp,
    setAlgoSigner,
    setAlgorandAccount,
    setMyAlgo,
    setTezosAccount,
    setKukaiWallet,
    setTempleWallet,
    setQrImage,
    setQrCodeString,
    setWC,
    setOnWC,
    setAccount,
    setSync2,
    setSync2Connecx,
    setTempleWalletSigner,
    setKukaiWalletSigner,
    setKeplrAccount,
    setKeplrWallet,
} from "../../store/reducers/generalSlice";
import { useNavigate } from "react-router";
import { chainsConfig, CHAIN_INFO, TESTNET_CHAIN_INFO } from "../values";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { getAddEthereumChain } from "../../wallet/chains";
import Web3 from "web3";

import { SecretNetworkClient } from "secretjs";

export const wallets = [
    "MetaMask",
    "WalletConnect",
    "Trust Wallet",
    "MyAlgo",
    "AlgoSigner",
    "Algorand Wallet",
    "TronLink",
    "Temple Wallet",
    "Beacon",
    "Maiar",
    "Maiar Extension",
    "Ledger",
    "Trezor",
];
const { to, modalError } = store.getState();
const connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org", // Required
});

export const switchNetWork = async (from) => {
    // let fromChainId;
    const chain = getAddEthereumChain()[parseInt(from.chainId).toString()];
    const params = {
        chainId: from.chainID, // A 0x-prefixed hexadecimal string
        chainName: chain.name,
        nativeCurrency: {
            name: chain.nativeCurrency.name,
            symbol: chain.nativeCurrency.symbol, // 2-6 characters long
            decimals: chain.nativeCurrency.decimals,
        },
        rpcUrls: chain.rpc,
        blockExplorerUrls: [
            chain.explorers &&
            chain.explorers.length > 0 &&
            chain.explorers[0].url
                ? chain.explorers[0].url
                : chain.infoURL,
        ],
    };
    window.bitkeep?.ethereum &&
        window.bitkeep?.ethereum
            .request({
                method: "wallet_switchEthereumChain",
                params,
            })
            .then(() => {
                console.log("Network Switch Success");
            })
            .catch((e) => {
                console.log(e);
            });
};

export const connectKeplr = async (testnet, chain) => {
    // debugger;

    console.log(chain);
    const chainId = testnet ? "pulsar-2" : "cosmoshub-4";
    if (window.keplr) {
        try {
            await window.keplr.enable(chainId);
            const offlineSigner = window.keplr.getOfflineSigner(chainId);
            console.log(offlineSigner);
            const accounts = await offlineSigner.getAccounts();

            const { address } = accounts[0];

            const signer = await SecretNetworkClient.create({
                grpcWebUrl: chain.tnRpc,
                chainId,
                wallet: offlineSigner,
                walletAddress: address,
            });

            store.dispatch(setKeplrAccount(address));
            store.dispatch(setKeplrWallet(signer));
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    } else {
        store.dispatch(setError("Please install Keplr extension"));
        return false;
    }
};

export const connectBitKeep = async (from) => {
    let provider;
    const isInstallBikeep = () => {
        return window.bitkeep && window.bitkeep?.ethereum;
    };
    if (!isInstallBikeep()) {
        window.open(
            "https://chrome.google.com/webstore/detail/bitkeep-bitcoin-crypto-wa/jiidiaalihmmhddjgbnbgdfflelocpak",
            "bitkeep installer",
            "width=500,height=500"
        );
    } else {
        provider = window.bitkeep?.ethereum;
        await provider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(provider);
        const address = await web3.eth.getAccounts();
        const chainId = await web3.eth.getChainId();
        if (from && from?.chainId !== chainId) {
            switchNetWork(from, true);
        } else {
            store.dispatch(setAccount(address[0]));
            return true;
        }
    }
};

export const connectMetaMask = async (activate, from, to) => {
    // debugger;
    try {
        if (!window.ethereum && window.innerWidth <= 600) {
            const link = `https://metamask.app.link/dapp/${window.location.host}?to=${to}&from=${from}/`;
            window.open(link);
        }
        await activate(injected);
        store.dispatch(setMetaMask(true));
        return true;
    } catch (ex) {
        store.dispatch(setError(ex));
        if (ex.data) {
            console.log(ex.data.message);
        } else console.log(ex);
        return false;
    }
};

export const connectSync2 = async (testnet) => {
    let account;
    const client = new Connex(
        testnet
            ? {
                  node: "https://testnet.veblocks.net/",
                  network: "test",
              }
            : {
                  node: "https://sync-mainnet.veblocks.net",
                  network: "main",
              }
    );
    store.dispatch(setSync2Connecx(client));
    const vendor = new Connex.Vendor(testnet ? "test" : "main");
    await vendor
        .sign("cert", {
            purpose: "identification",
            payload: {
                type: "text",
                content: "sign certificate to continue bridging",
            },
        })
        .link("https://connex.vecha.in/{certid}") // User will be back to the app by the url https://connex.vecha.in/0xffff....
        .request()
        .then((result) => {
            account = result?.annex?.signer;
        });
    return account;
};

// Algorand blockchain connection ( AlgoSigner )
export const connectAlgoSigner = async (testnet) => {
    if (typeof window.AlgoSigner !== undefined) {
        try {
            await window.AlgoSigner.connect();
            const algo = await window.AlgoSigner.accounts({
                ledger: testnet ? "TestNet" : "MainNet",
            });
            const { address } = algo[0];

            store.dispatch(setAlgoSigner(true));
            store.dispatch(setAlgorandAccount(address));
            return true;
        } catch (e) {
            console.error(e);
            return JSON.stringify(e, null, 2);
        }
    } else {
        console.log("Algo Signer not installed.");
        return false;
    }
};

export const connectTrustWallet = async (activate, from) => {
    // debugger
    const { rpc, chainId } = chainsConfig[from];
    try {
        const walletConnect = new WalletConnectConnector({
            rpc: {
                [chainId]: rpc,
            },
            chainId,
            qrcode: true,
        });
        walletConnect.networkId = chainId;
        await activate(walletConnect, undefined, true);
        store.dispatch(setOnWC(true));
        store.dispatch(setWC(walletConnect));
        return true;
    } catch (error) {
        store.dispatch(setError(error));
        if (error.data) {
            console.log(error.data.message);
        } else console.log(error);
        return false;
    }
};

// Tezos blockchain connection ( Temple Wallet )
export const connectTempleWallet = async () => {
    try {
        const available = await TempleWallet.isAvailable();
        if (!available) {
            throw new Error("Temple Wallet not installed");
        }
        const wallet = new TempleWallet("XP.NETWORK Cross-Chain NFT Bridge");
        await wallet.connect("mainnet");
        store.dispatch(setTempleWalletSigner(wallet));
        const tezos = wallet.toTezos();
        const accountPkh = await tezos.wallet.pkh();
        store.dispatch(setTezosAccount(accountPkh));
        store.dispatch(setTempleWallet(true));
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
// Tezos blockchain connection ( Beacon )
export const connectBeacon = async () => {
    const Tezos = new TezosToolkit("https://mainnet-tezos.giganode.io");
    const wallet = new BeaconWallet({
        name: "XP.NETWORK Cross-Chain NFT Bridge",
    });
    Tezos.setWalletProvider(wallet);
    try {
        const permissions = await wallet.client.requestPermissions();
        store.dispatch(setTezosAccount(permissions.address));

        store.dispatch(setKukaiWalletSigner(wallet));
        store.dispatch(setKukaiWallet(true));
        return true;
    } catch (error) {
        console.log("Got error:", error);
        return false;
    }
};

export const connectMyAlgo = async () => {
    const myAlgoConnect = new MyAlgoConnect();
    try {
        const accountsSharedByUser = await myAlgoConnect.connect();
        store.dispatch(setAlgorandAccount(accountsSharedByUser[0].address));
        store.dispatch(setMyAlgo(true));
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const onWalletConnect = async (activate, from, testnet) => {
    const { rpc, chainId } = chainsConfig[from];
    try {
        const walletConnect = new WalletConnectConnector({
            rpc: {
                [chainId]: rpc,
                network: testnet ? "testnet" : "mainnet",
            },
            chainId,
            qrcode: true,
        });
        walletConnect.networkId = chainId;
        await activate(walletConnect, undefined, true);
        const account = await walletConnect.getAccount();
        store.dispatch(setAccount(account));
        store.dispatch(setOnWC(true));
        store.dispatch(setWC(walletConnect));
        return true;
    } catch (error) {
        store.dispatch(setError(error));
        if (error.data) {
            console.log(error.data.message);
        } else console.log(error);
        return false;
    }
};

const onClientConnect = (maiarProvider) => {
    return {
        onClientLogin: async () => {
            const add = await maiarProvider.getAddress();
            store.dispatch(setConfirmMaiarMob(true));
            store.dispatch(setElrondAccount(add));

            store.dispatch(setMaiarProvider(maiarProvider));
            store.dispatch(setOnMaiar(true));
            store.dispatch(setStep(2));
        },
        onClientLogout: async () => {
            store.dispatch(setQrCodeString(""));
        },
    };
};
const generateQR = async (text) => {
    try {
        const QR = await QRCode.toDataURL(text);
        return QR;
    } catch (err) {
        console.error(err);
    }
};
// Elrond blockchain connection ( Maiar )
export const connectMaiar = async () => {
    // debugger
    const provider = new ProxyProvider("https://gateway.elrond.com");
    const maiarProvider = new WalletConnectProvider(
        provider,
        "https://bridge.walletconnect.org/"
    );
    try {
        await maiarProvider.init();
        maiarProvider.onClientConnect = onClientConnect(maiarProvider);
        const qrCodeString = await maiarProvider.login();
        store.dispatch(setQrCodeString(qrCodeString));
        const qr = await generateQR(qrCodeString);
        store.dispatch(setQrImage(qr));
    } catch (error) {
        store.dispatch(setError(error));
        if (error.data) {
            console.log(error.data.message);
        } else console.log(error);
    }
};

// Elrond blockchain connection ( Maiar Extension )
export const connectMaiarExtension = async () => {
    const instance = ExtensionProvider.getInstance();
    try {
        await instance.init();
        await instance.login();
        const { account } = instance;
        store.dispatch(setOnMaiar(true));
        store.dispatch(setElrondAccount(account.address));
        store.dispatch(setMaiarProvider(instance));
        return true;
    } catch (err) {
        window.open("https://getmaiar.com/defi", "_blank");
        console.log(err);
        return false;
    }
};

// Tron blockchain connection ( TronLink )
export const connectTronlink = async () => {
    if (window.innerWidth <= 600 && !window.tronWeb) {
        store.dispatch(setTronPopUp(true));
    } else {
        try {
            try {
                const accounts = await window.tronLink.request({
                    method: "tron_requestAccounts",
                });

                if (!accounts) {
                    store.dispatch(setTronLoginError("loggedOut"))``;
                }
            } catch (err) {
                console.log(err);
                if (!window.tronWeb) {
                    store.dispatch(setTronLoginError("noTronWeb"));
                }
            }

            if (window.tronLink && window.tronWeb.defaultAddress.base58) {
                const publicAddress = window.tronWeb.defaultAddress.base58;
                store.dispatch(setTronWallet(publicAddress));
                store.dispatch(setTronLink(true));
                return true;
            }
        } catch (error) {
            if (!modalError) {
                store.dispatch(setError(error));
                if (error.data) {
                    console.log(error.data.message);
                } else console.log(error);
            }
            return false;
        }
    }
};

// Algorand blockchain connection ( Algo Wallet )
export const connectAlgoWallet = async () => {
    if (!algoConnector.connected) {
        algoConnector.createSession();
    }
};
