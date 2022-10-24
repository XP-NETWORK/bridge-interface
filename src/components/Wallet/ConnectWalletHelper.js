/* eslint-disable valid-typeof */
import Connex from "@vechain/connex";
import { TempleWallet } from "@temple-wallet/dapp";
import { injected, algoConnector, web3Modal } from "../../wallet/connectors";
import store from "../../store/store";

import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import * as thor from "web3-providers-connex";
import { HashConnect } from "hashconnect";
import { hethers } from "@hashgraph/hethers";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import TonWeb from "tonweb";
// import tonMnemonic from "tonweb-mnemonic";

import {
    WalletConnectProvider,
    ProxyProvider,
    ExtensionProvider,
} from "@elrondnetwork/erdjs";
import QRCode from "qrcode";
import { ethers } from "ethers";

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
    setTempleWalletSigner,
    setKukaiWalletSigner,
    setKeplrAccount,
    setKeplrWallet,
    setHederaAccount,
    setHederaWallet,
    setSync2Connex,
    setRedirectModal,
} from "../../store/reducers/generalSlice";
import { chainsConfig } from "../values";
import { getAddEthereumChain } from "../../wallet/chains";
import Web3 from "web3";

import { SecretNetworkClient } from "secretjs";
import { setSigner } from "../../store/reducers/signersSlice";
import { getFactory } from "../../wallet/helpers";

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
    "Hashpack",
];
const { modalError } = store.getState();

const hashConnect = new HashConnect(true);

hashConnect.pairingEvent.once(async (pairingData) => {
    const {
        accountIds,
        topic,
        metadata: { name },
    } = pairingData;
    const address = await hethers.utils.getAddressFromAccount(accountIds[0]);
    const provider = hashConnect.getProvider("testnet", topic, accountIds[0]);
    const signer = hashConnect.getSigner(provider);

    store.dispatch(setHederaAccount(address));
    store.dispatch(setHederaWallet(name));
    store.dispatch(setSigner(signer));
});

// hashConnect.foundExtensionEvent.once((walletMetadata) => {
//     // hashPackWalletMetaData = walletMetadata;
// });

export const connectHashpack = async () => {
    let appMetadata = {
        name: "XP.NETWORK Cross-Chain NFT Bridge",
        description:
            "Seamlessly move assets between chains | The first multichain NFT bridge to connect all major Blockchains into one ecosystem",
        icon: "%PUBLIC_URL%/favicon.ico",
    };

    try {
        const initData = await hashConnect.init(appMetadata, "testnet", false);
        const { pairingString } = initData;
        await hashConnect.connectToLocalWallet(pairingString, appMetadata);
        return true;
    } catch (error) {
        console.log("connectHashpack error: ", error);
    }
};

export const createKeyPairTonWallet = async () => {
    // debugger
    // 1. Use tonweb-mnemonic to generate random 24 words which determine the secret key.
    // These words will be compatible with TON wallet applications, i.e. using them you will be able to import your account into third-party applications.

    return TonWeb.utils.nacl.sign.keyPair();
};

export const createWallet = async () => {
    // debugger;
    const keyPair = await createKeyPairTonWallet();
    const tonweb = new TonWeb();

    // There are standard wallet smart contracts that everyone uses.
    // There are several versions, at the moment wallet v3R2 is default.

    const WalletClass = tonweb.wallet.all.v3R2;

    const wallet = new WalletClass(tonweb.provider, {
        publicKey: keyPair.publicKey,
    });
    store.dispatch(setSigner(wallet));

    // Wallet address depends on key pair and smart contract code.
    // So for different versions of the smart contract you will get a different address, although the key pair is the same.
    // Let's get the wallet address (offline operation):

    /** @type {Address} */
    const address = await wallet.getAddress();

    // The address can be displayed in different formats
    // More on https://ton.org/docs/#/howto/step-by-step?id=_1-smart-contract-addresses

    const account = address.toString(true, true, true); // print address in default format. In 99% of cases this format is used in UI applications.
    return account;
    // We did everything offline and there is no our wallet smart contract on the network yet.
    // To deploy it, we first need to send Toncoins to the address.
    // Then when you want to send Toncoins from wallet to someone else - along with this first outgoing transfer, the deployment of the wallet smart contract will happen automatically.
};

export const connectUnstoppable = async () => {
    try {
        const provider = await web3Modal.connect();
        return provider.sendAsync();
    } catch (error) {
        console.log(error);
    }
};

export const switchNetWork = async (from) => {
    // let fromChainId;
    const chain = getAddEthereumChain()[parseInt(from.chainId).toString()];
    const params = {
        chainId: from.chainId, // A 0x-prefixed hexadecimal string
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

export const connectKeplr = async (testnet, chain, wallet, isMobile) => {
    const chainId = testnet ? chain.tnChainId : chain.chainId;
    if (window.keplr) {
        try {
            await window.keplr.enable(chainId);
            const offlineSigner = window.keplr.getOfflineSigner(chainId);

            const accounts = await offlineSigner.getAccounts();

            const { address } = accounts[0];

            const signer = await SecretNetworkClient.create({
                grpcWebUrl: testnet ? chain.tnRpc : chain.rpc,
                chainId,
                wallet: offlineSigner,
                walletAddress: address,
                //encryptionUtils: window.getEnigmaUtils(chain),
            });

            store.dispatch(setKeplrAccount(address));
            store.dispatch(setKeplrWallet(signer));
            store.dispatch(setSigner(signer));
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    } else {
        if (isMobile) {
            store.dispatch(setRedirectModal("Fina"));
        } else
            store.dispatch(
                setError({
                    message: "Please install Keplr extension",
                })
            );
        return false;
    }
};

const setBitKeepSigner = (account) => {
    const provider = new ethers.providers.Web3Provider(window.bitkeep.ethereum);
    const signer = provider.getSigner(account);
    store.dispatch(setSigner(signer));
};

export const connectBitKeep = async (from) => {
    // debugger;
    let provider;
    const isInstallBikeep = () => {
        return window.bitkeep && window.bitkeep?.ethereum;
    };
    if (!isInstallBikeep()) {
        if (window.innerWidth <= 600) {
            store.dispatch(setRedirectModal("BitKeep"));
        } else {
            window.open(
                "https://chrome.google.com/webstore/detail/bitkeep-bitcoin-crypto-wa/jiidiaalihmmhddjgbnbgdfflelocpak",
                "bitkeep installer",
                "width=500,height=500"
            );
        }
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
            setBitKeepSigner(address[0]);
            return true;
        }
    }
};

export const connectMetaMask = async (activate, from, to) => {
    // debugger;
    try {
        if (!window.ethereum && window.innerWidth <= 600) {
            const link = `dapp://${window.location.host}?to=${to}&from=${from}/`;

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

export const connectVeChainThor = async (testnet) => {
    let account;
    let connex;
    const userAgent = navigator.userAgent;

    if (userAgent.match(/vechainthorwallet|vechain|thor/)) {
        connex = new Connex(
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
        await connex.vendor
            .sign("cert", {
                purpose: "identification",
                payload: {
                    type: "text",
                    content: "sign certificate to continue bridging",
                },
            })
            .request()
            .then((result) => {
                account = result?.annex?.signer;
            });
    } else store.dispatch(setRedirectModal("VeChainThor"));

    const provider = thor.ethers.modifyProvider(
        new ethers.providers.Web3Provider(new thor.ConnexProvider({ connex }))
    );
    const signer = await provider.getSigner(account);
    store.dispatch(setSync2Connex(connex));
    store.dispatch(setSigner(signer));
    return account;
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
    store.dispatch(setSync2Connex(client));
    const connex = new Connex(testnet ? "test" : "main");
    await connex.vendor
        .sign("cert", {
            purpose: "identification",
            payload: {
                type: "text",
                content: "sign certificate to continue bridging",
            },
        })
        .link("https://connex.vecha.in/{certid}")
        .request()
        .then((result) => {
            account = result?.annex?.signer;
        });

    const provider = thor.ethers.modifyProvider(
        new ethers.providers.Web3Provider(
            new thor.ConnexProvider({
                connex: new Connex({
                    node: testnet
                        ? "https://testnet.veblocks.net/"
                        : "https://sync-mainnet.veblocks.net",
                    network: testnet ? "test" : "main",
                }),
            })
        )
    );
    const signer = await provider.getSigner(account);
    store.dispatch(setSigner(signer));
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
            const signer = {
                address: address,
                AlgoSigner: window.AlgoSigner,
                ledger: testnet ? "TestNet" : "MainNet",
            };
            store.dispatch(setSigner(signer));
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
        store.dispatch(setSigner(wallet));
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
        store.dispatch(setSigner(wallet));
        store.dispatch(setKukaiWallet(true));
        return true;
    } catch (error) {
        console.log("Got error:", error);
        return false;
    }
};

const getMyAlgoSigner = async (base, algorandAccount) => {
    const factory = await getFactory();
    const inner = await factory.inner(15);
    const signer = inner.myAlgoSigner(base, algorandAccount);
    return signer;
};

export const connectMyAlgo = async () => {
    const myAlgoConnect = new MyAlgoConnect();
    try {
        const accountsSharedByUser = await myAlgoConnect.connect();
        const signer = await getMyAlgoSigner(
            myAlgoConnect,
            accountsSharedByUser[0].address
        );
        store.dispatch(setAlgorandAccount(accountsSharedByUser[0].address));
        store.dispatch(setSigner(signer));
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
            store.dispatch(setSigner(maiarProvider));
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
    // debugger;
    const instance = ExtensionProvider.getInstance();
    try {
        await instance.init();
        await instance.login();
        const { account } = instance;
        if (account?.name === "CanceledError") {
            return false;
        }
        store.dispatch(setOnMaiar(true));
        store.dispatch(setElrondAccount(account.address));
        store.dispatch(setMaiarProvider(instance));
        store.dispatch(setSigner(instance));
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
                    store.dispatch(setTronLoginError("loggedOut"));
                }
            } catch (err) {
                console.log(err);
                if (!window.tronWeb) {
                    store.dispatch(setTronLoginError("noTronWeb"));
                }
            }

            if (window.tronLink && window.tronWeb.defaultAddress.base58) {
                console.log(window.tronLink);
                const publicAddress = window.tronWeb.defaultAddress.base58;
                const factory = await getFactory();
                await factory
                    .setProvider(9, window.tronWeb)
                    .catch((e) => console.log(e, "e"));

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
