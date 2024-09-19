import store from "./store/store";
//import io from "socket.io-client";
import axios from "axios";

import Harmony from "@harmony-js/core";
import TonWeb from "tonweb";
import { connectHashPack } from "./components/Wallet/HederaWallet/hederaConnections";
import { connectTonWallet } from "./components/Wallet/TONWallet/TonConnectors";
import { switchNetwork } from "./services/chains/evm/evmService";
import { getChainObject } from "./components/values";
import { injected } from "./wallet/connectors";
import { TempleWallet } from "@temple-wallet/dapp";

/*const testnet = window.location.pathname.includes("testnet");
const staging = window.location.pathname.includes("staging");
const socketUrl = "wss://dev-explorer-api.herokuapp.com"; //wss://dest-scraper.herokuapp.com/
const scraperUrl = "wss://dest-scraper.herokuapp.com";
const stagingUrl = "https://tools.xp.network/explorer";
const testnetSocketUrl = "wss://testnet-bridge-explorer.herokuapp.com/";*/

export const isALLNFTsApproved = () => {
  const { selectedNFTList, approvedNFTList } = store.getState().general;
  if (selectedNFTList.length <= approvedNFTList.length) {
    const approvedNFTs = [];
    approvedNFTList.forEach((n) => {
      const { native } = n;
      const isInSelected = selectedNFTList.filter((y) => {
        const { tokenId, contract, chainId } = y.native;
        return (
          tokenId === native.tokenId &&
          contract === native.contract &&
          chainId === native.chainId
        );
      })[0];
      if (isInSelected) approvedNFTs.push(isInSelected);
    });
    return approvedNFTs.length === selectedNFTList.length;
  } else return false;
};

export const transformToDate = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const year = dateObj.getFullYear();
  const tm = month + ", " + year;
  return tm;
};

export const fetchXPUpdate = () => {
  return axios
    .get("https://case-studies.xp.network/last-commit")
    .then((response) => {
      return response.data;
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
};

export const checkValidators = () => {
  return axios
    .get("https://bridgestatus.herokuapp.com/status")
    .then((response) => {
      return response.data;
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
};

export const checkIfOne1 = (address) => {
  return address?.slice(0, 4) === "one1" ? true : false;
};

export const checkIfIo1 = (address) => {
  return address?.slice(0, 3) === "io1" ? true : false;
};

export const convertOne1 = (address) => {
  const hmySDK = new Harmony();
  const ethAddr = hmySDK.crypto.fromBech32(address);
  return ethAddr;
};

export const convert = (address) => {
  if (checkIfOne1(address)) {
    return convertOne1(address);
  }
  return address;
  // else if(checkIfIo1(address)) return convertIo1(address)
};

export const saveForSearch = async (address, chain, data) => {
  const baseUrl = "https://search-service.xp.network/saveUser";
  const body = {
    address,
    chain,
    data,
  };

  try {
    await axios.post(baseUrl, body);
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const getSearched = async (address, searched, nonce) => {
  const url = `https://search-service.xp.network/nft?address=${address}&nft=${searched}&chain=${nonce}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const errorToLog = async (error) => {
  try {
    if (
      typeof error.message === "string" &&
      error.message.includes("user rejected")
    ) {
      return;
    }

    const response = await axios.post(
      "https://bridge-error-logs.herokuapp.com/log/error",
      error,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*",
        },
      }
    );
    console.log("Log", response.data);
  } catch (e) {
    console.log(e);
  }
};

export const getRightPath = (network, from, to, checkFrom, checkTo) => {
  network = network !== "mainnet" ? network : "";

  if (checkFrom && checkFrom !== from.key) {
    return;
  }

  if (checkTo && checkTo !== to.key) {
    return;
  }

  return `${network ? `/${network}` : ""}/account${window.location.search ||
    ""}`;
};

const getSubstringValue = (length) => {
  if (window.innerWidth <= 320) return 3;
  else if (window.innerWidth <= 375) return length;
  else return false;
};

export const StringShortener = (str, length) =>
  str
    ? `${str.substring(0, getSubstringValue(length) || 5)}...${str.substring(
        str.length - length
      )}`
    : "";

export const promisify = (cb) => new Promise((r) => cb().then((res) => r(res)));

export function generateKey(length) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const fixify = (number) => {
  if (!number) return "0";
  const digitsAfterDot =
    String(number)
      .split(".")
      ?.at(1)?.length || 0;

  return digitsAfterDot
    ? number
        .toFixed(Math.min(digitsAfterDot))
        .match(/\d*\.(0*)(\d{0,3})/)
        .at(0)
    : number;
};

export const setupURI = (uri) => {
  if (/^ipfs:\/\//.test(uri) || uri[0] === "Q")
    return uri.replace(/ipfs:\/\/(?:ipfs)?/, "https://ipfs.io/ipfs/");

  return uri.replace(/^http:\/\//, "https://");
};

export const isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
  },
  any: function() {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

export const createSafeStorage = () => {
  window.safeLocalStorage = {
    getItem(key) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.log("error in safeLocalStorage", e);
        return undefined;
      }
    },
    setItem(key, val) {
      try {
        return localStorage.setItem(key, val);
      } catch (e) {
        console.log("error in safeLocalStorage", e);
        return undefined;
      }
    },
    removeItem(key) {
      try {
        return localStorage.removeItem(key);
      } catch (e) {
        console.log("error in safeLocalStorage", e);
        return undefined;
      }
    },
    clear() {
      try {
        return localStorage.clear();
      } catch (e) {
        console.log("error in safeLocalStorage", e);
        return undefined;
      }
    },
  };
};

export const extractType = (imageUri) =>
  imageUri.match(/(?:\.([^.]+))?$/)?.at(1) || "";

//1. install wagmi @web3modal/ethereum @web3modal/react

export async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatAddress(address) {
  const Address = TonWeb.utils.Address;
  return new Address(address).toString(true, false, true, false);
}

const connectWallet = {
  HEDERA: async (network) => {
    await connectHashPack(network);
    await sleep(10000);
  },

  TON: async (bridge, nonce) => {
    const chainWrapper = await bridge.getChain(nonce);
    const account = await connectTonWallet();

    chainWrapper.setSigner({
      address: account.address,
      send: account.signer.send,
    });
  },

  EVM: async (bridge, nonce, activate) => {
    bridge.currentType === "EVM"
      ? await switchNetwork(getChainObject(nonce))
      : (await activate(injected), await switchNetwork(getChainObject(nonce)));
  },

  TEZOS: async (bridge, nonce) => {
    const chain = await bridge.getChain(nonce);
    let account = {};
    const available = await TempleWallet.isAvailable();
    if (!available) {
      throw new Error("Temple Wallet not installed");
    }
    const wallet = new TempleWallet("XP.NETWORK Cross-Chain NFT Bridge");
    await wallet.connect("mainnet");
    account = wallet;
    chain.setSigner(account);
  },
};

export const connectWalletByChain = async (
  type,
  nonce,
  network,
  bridge,
  activate
) => {
  console.log("inside: ", type);
  switch (type) {
    case "HEDERA":
      await connectWallet[type](network);
      break;
    case "TON":
      await connectWallet[type](bridge, nonce);
      break;
    case "EVM":
      await connectWallet[type](bridge, nonce, activate);
      break;
    case "TEZOS":
      await connectWallet[type](bridge, nonce);
      break;
  }
  await sleep(5000);
};
