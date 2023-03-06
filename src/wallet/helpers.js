import { AppConfigs, ChainFactory, ChainFactoryConfigs } from "xp.network";

import { Chain } from "xp.network/dist/consts";

import {
  setAlgorandClaimables,
  setFactory,
} from "../store/reducers/generalSlice";
import store from "../store/store";
import io from "socket.io-client";
import axios from "axios";
import { utils } from "ethers";

import { setChainFactoryConfig } from "../store/reducers/signersSlice";
import Harmony from "@harmony-js/core";

const socketUrl = "wss://dev-explorer-api.herokuapp.com"; //wss://dest-scraper.herokuapp.com/
const testnet = window.location.pathname.includes("testnet");
const scraperUrl = "wss://dest-scraper.herokuapp.com";
const testnetSocketUrl = "wss://testnet-bridge-explorer.herokuapp.com/";

export const isApproved = async (c, nft) => {
  const {
    signers: { signer },
    general: { factory },
  } = store.getState();

  const chain = await factory.inner(c);

  let isApproved;

  try {
    isApproved =
      c === 24
        ? await chain.isApprovedForMinter(signer, nft)
        : await chain.isApprovedForMinter(nft, signer);
  } catch (error) {
    console.log(error);
  }
  return isApproved;
};

export const convertTransactionHash = (txn) => {
  let convertedTxn;
  switch (true) {
    case txn.hash?.hash instanceof Uint8Array:
      convertedTxn = txn.hash = utils
        .hexlify(txn.hash?.hash)
        .replace(/^0x/, "");
      break;
    case txn.hash?.hash?.data instanceof Uint8Array:
      convertedTxn = utils.hexlify(txn.hash?.hash?.data)?.replace(/^0x/, "");
      break;
    case txn.hash?.hash?.type === "Buffer":
      convertedTxn = utils.hexlify(txn.hash?.hash?.data)?.replace(/^0x/, "");
      break;
    default:
      convertedTxn = txn.hash;
      break;
  }
  return convertedTxn;
};

export const socket = io(testnet ? testnetSocketUrl : socketUrl, {
  path: "/socket.io",
});

export const scraperSocket = io(scraperUrl, {
  path: "/socket.io",
});

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
    .get("https://xpvitaldata.herokuapp.com/last-commit")
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

export const getAndSetFactory = async (network) => {
  // eslint-disable-next-line no-debugger

  let config;
  let factory;
  switch (network) {
    case "testnet":
      config = await ChainFactoryConfigs.TestNet();
      factory = await ChainFactory(AppConfigs.TestNet(), config);
      break;
    case "staging":
      config = await ChainFactoryConfigs.Staging();
      factory = await ChainFactory(AppConfigs.Staging(), config);
      break;
    default:
      config = await ChainFactoryConfigs.MainNet();
      factory = await ChainFactory(AppConfigs.MainNet(), config);
      break;
  }
  store.dispatch(setFactory(factory));
  store.dispatch(setChainFactoryConfig(config));
  return factory;
};

export const handleChainFactory = async (someChain) => {
  const { factory } = store.getState().general;

  try {
    switch (someChain) {
      case "Ethereum":
        return await factory.inner(Chain.ETHEREUM);
      case "BSC":
        return await factory.inner(Chain.BSC);
      case "Tron":
        return await factory.inner(Chain.TRON);
      case "Elrond":
        return await factory.inner(Chain.ELROND);
      case "Polygon":
        return await factory.inner(Chain.POLYGON);
      case "Avalanche":
        return await factory.inner(Chain.AVALANCHE);
      case "Fantom":
        return await factory.inner(Chain.FANTOM);
      case "Algorand":
        return await factory.inner(Chain.ALGORAND);
      case "xDai":
        return await factory.inner(Chain.XDAI);
      case "Gnosis":
        return await factory.inner(Chain.XDAI);
      case "Solana":
        return await factory.inner(Chain.SOLANA);
      case "Cardano":
        return await factory.inner(Chain.CARDANO);
      case "Fuse":
        return await factory.inner(Chain.FUSE);
      case "Velas":
        return await factory.inner(Chain.VELAS);
      case "Tezos":
        return await factory.inner(Chain.TEZOS);
      case "Iotex":
        return await factory.inner(Chain.IOTEX);
      case "Harmony":
        return await factory.inner(Chain.HARMONY);
      case "Aurora":
        return await factory.inner(Chain.AURORA);
      case "GateChain":
        return await factory.inner(Chain.GATECHAIN);
      case "VeChain":
        return await factory.inner(Chain.VECHAIN);
      case "Godwoken":
        return await factory.inner(Chain.GODWOKEN);
      case "Secret":
        return await factory.inner(Chain.SECRET);
      case "Hedera":
        return await factory.innner(Chain.HEDERA);
      case "Skale":
        return await factory.inner(Chain.SKALE);
      case "ABEY":
        return await factory.inner(Chain.ABEYCHAIN);
      case "Moonbeam":
        return await factory.inner(Chain.MOONBEAM);
      case "TON":
        return await factory.inner(Chain.TON);
      case "NEAR":
        return await factory.inner(Chain.NEAR);
      default:
        return "";
    }
  } catch (error) {
    console.error(error);
  }
};

/*export const mintForTestNet = async (from, signer) => {
  const { factory } = store.getState().general;
  const chain = await factory.inner(chainsConfig[from].Chain);
  const uri = await prompt();

  try {
    const mint = await chain.mintNft(signer, {
      contract: "0x34933A5958378e7141AA2305Cdb5cDf514896035",
      uri,
    });

    return mint;
  } catch (error) {
    console.log(error);
  }
};*/

export const checkIfSmartContract = async (c, address) => {
  const { factory } = store.getState().general;
  const chain = await factory.inner(c);
  const isSC = await chain.isContractAddress(address);
  return isSC;
};

export const setClaimablesAlgorand = async (algorandAccount, returnList) => {
  const { factory } = store.getState().general;
  let claimables;
  try {
    if (algorandAccount && algorandAccount.length > 50) {
      claimables = await factory.claimableAlgorandNfts(algorandAccount);
      console.log(claimables, "claimablesNFT");
      if (claimables && claimables.length > 0) {
        if (returnList) return claimables;
        else store.dispatch(setAlgorandClaimables(claimables));
      }
    }
    return [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getAlgorandClaimables = async (account) => {
  const { checkWallet, factory } = store.getState().general;

  let claimables;
  try {
    claimables = await factory.claimableAlgorandNfts(checkWallet || account);
    store.dispatch(setAlgorandClaimables(claimables));
  } catch (error) {
    console.error(error);
  }
};

export function isValidHttpUrl(string) {
  let url;
  if (string.includes("data:image/") || string.includes("data:application/"))
    return true;
  if (string.includes("ipfs://")) return true;
  if (string.includes("ipfs")) return true;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

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
  const baseUrl = "https://server-bridge.herokuapp.com/saveUser";
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
  const url = `https://server-bridge.herokuapp.com/nft?address=${address}&nft=${searched}&chain=${nonce}`;
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

export const getRightPath = (checkFrom, checkTo) => {
  const {
    general: { testNet, staging, from, to },
  } = store.getState();

  // eslint-disable-next-line no-debugger
  // debugger;
  if (checkFrom && checkFrom !== from.key) {
    return;
  }

  if (checkTo && checkTo !== to.key) {
    return;
  }

  const query = window.location.search;

  switch (true) {
    case testNet:
      return `/testnet/account${query || ""}`;
    case staging:
      return `/staging/account${query || ""}`;
    default:
      return `/account${query || ""}`;
  }
};

const getSubstringValue = (length) => {
  if (window.innerWidth <= 320) return 3;
  else if (window.innerWidth <= 375) return length;
  else return false;
};

export const StringShortener = (str, length) =>
  str
    ? `${str.substring(0, getSubstringValue(length) || 10)}...${str.substring(
        str.length - length
      )}`
    : "";
