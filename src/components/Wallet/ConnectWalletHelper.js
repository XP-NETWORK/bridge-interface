/* eslint-disable valid-typeof */

import { injected, algoConnector, web3Modal } from "../../wallet/connectors";
import store from "../../store/store";

import MyAlgoConnect from "@randlabs/myalgo-connect";

import { HashConnect } from "hashconnect";
import { hethers } from "@hashgraph/hethers";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

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
  setQrImage,
  setQrCodeString,
  setWC,
  setOnWC,
  setAccount,
  setKeplrWallet,
  setHederaAccount,
  setHederaWallet,
  setRedirectModal,
} from "../../store/reducers/generalSlice";
import { chainsConfig } from "../values";
import { getAddEthereumChain } from "../../wallet/chains";
import Web3 from "web3";

import { SecretNetworkClient } from "secretjs";
import { setSigner } from "../../store/reducers/signersSlice";

// import AuthClient from "@walletconnect/auth-client";

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
  console.log(from, "from");
  const chain = getAddEthereumChain()[parseInt(from.chainId).toString()];
  console.log(chain);
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
      chain.explorers && chain.explorers.length > 0 && chain.explorers[0].url
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

      store.dispatch(setAccount(address));
      store.dispatch(setKeplrWallet(signer));
      store.dispatch(setSigner(signer));
      return signer;
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
        address,
        algoSigner: window.AlgoSigner,
        ledger: testnet ? "TestNet" : "MainNet",
      };
      store.dispatch(setSigner(signer));
      return { signer, address };
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

export const connectMyAlgo = async (chain) => {
  const myAlgoConnect = new MyAlgoConnect();
  try {
    const accountsSharedByUser = await myAlgoConnect.connect();
    const address = accountsSharedByUser[0].address;

    const signer = await chain.myAlgoSigner(myAlgoConnect, address);

    return { signer, address };
  } catch (error) {
    console.log(error);
    return false;
  }
};

// const authClient = await AuthClient.init({
//     projectId: "<dhd8193nbaq>",
//     metadata: {
//         name: "XP.NETWORK Cross-Chain NFT Bridge",
//         description:
//             "Seamlessly move assets between chains | The first multichain NFT bridge to connect all major Blockchains into one ecosystem",
//         url: "my-auth-dapp.com",
//         icons: ["https://my-auth-dapp.com/icons/logo.png"],
//     },
// });

// export const onWalletConnectV2 = async () => {
//     console.log(authClient);
// };

export const onWalletConnect = async (activate, from, testnet) => {
  // onWalletConnectV2();
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
  const {
    general: { factory },
  } = store.getState();
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
