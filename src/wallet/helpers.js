import store from "../store/store";
import io from "socket.io-client";
import axios from "axios";

import Harmony from "@harmony-js/core";

const testnet = window.location.pathname.includes("testnet");
const socketUrl = "wss://dev-explorer-api.herokuapp.com"; //wss://dest-scraper.herokuapp.com/
const scraperUrl = "wss://dest-scraper.herokuapp.com";
const testnetSocketUrl = "wss://testnet-bridge-explorer.herokuapp.com/";

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
        ? `${str.substring(
              0,
              getSubstringValue(length) || 10
          )}...${str.substring(str.length - length)}`
        : "";

export const promisify = (cb) => new Promise((r) => cb().then((res) => r(res)));
