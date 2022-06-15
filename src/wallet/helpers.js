import { AppConfigs, ChainFactory, ChainFactoryConfigs } from "xp.network";
import { Chain, Config } from "xp.network/dist/consts";
import { chainsConfig, CHAIN_INFO } from "../components/values";
import {
    setAlgorandClaimables,
    setBigLoader,
    setEachClaimables,
    setEachNFT,
    setFactory,
    setNFTList,
    setPreloadNFTs,
} from "../store/reducers/generalSlice";
import store from "../store/store";
import io from "socket.io-client";
import { isWhiteListed } from "./../components/NFT/NFTHelper";

const socketUrl = "wss://dev-explorer-api.herokuapp.com";
const testnet = window.location.href.includes("testnet");
const testnetSocketUrl = "wss://testnet-bridge-explorer.herokuapp.com/";
const base64 = require("base-64");
export const socket = io(testnet ? testnetSocketUrl : socketUrl, {
    path: "/socket.io",
});
const { Harmony } = require("@harmony-js/core");
const axios = require("axios");

export const setupURI = (uri) => {
    // debugger
    if (uri) {
        if (uri.includes("https://ipfs.io")) {
            return uri;
        } else if (uri && uri.includes("ipfs://")) {
            return "https://ipfs.io/" + uri.replace(":/", "");
        } else if (uri && uri.includes("https://ipfs.io")) {
            return uri;
        } else if (
            uri &&
            (uri.includes("data:image/") || uri.includes("data:application/"))
        ) {
            return uri;
        } else {
            if (uri) return uri.replace("http://", "https://");
        }
    }
    return uri;
};

const checkIfImage = (url) => {
    const imageFormats = [".gif", ".jpg", ".jpeg", ".png", ".svg", ".webp"];
    const imageFormat = imageFormats.some((format) => url?.includes(format));
    return imageFormat ? url : undefined;
};

const checkIfVideo = (url) => {
    const videoFormats = [".mp4", ".ogg", ".webm", ".avi"];
    const videoFormat = videoFormats.some((format) => url?.includes(format));
    return videoFormat ? url : undefined;
};

const tryIPFS = async (str) => {
    let res;
    try {
        res = await axios.get(
            `https://sheltered-crag-76748.herokuapp.com/https://ipfs.io/ipfs/${str}`
        );
        if (res && typeof data === "object") {
            return res.data;
        } else if (typeof data === "string") {
            res = await tryIPFS(res);
            console.log("nft", res);
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
};

const fetchURI = async (uri) => {
    if (uri.includes("http") || uri.includes("https")) {
        try {
            const { data, headers } = await axios.get(
                `https://sheltered-crag-76748.herokuapp.com/${uri}`
            );
            if (
                headers["content-type"].includes("image") ||
                headers["content-type"].includes("video")
            ) {
                return headers["content-type"];
            }
            return data.data ? data.data : data;
        } catch (error) {
            console.log(error);
        }
    } else {
        const data = await tryIPFS(uri);
        console.log("data", data);
        return data;
    }
};

const ipfsOrjson = (url) => {
    if (url.includes("ipfs")) {
        return "ipfs";
    } else if (url.includes(".json")) {
        return "json";
    } else {
        return undefined;
    }
};

function isJson(item) {
    item = typeof item !== "string" ? JSON.stringify(item) : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return item;
    }

    return false;
}

const Rookie = async (nft) => {
    let uri = nft.uri;
    const { data } = await axios.get(setupURI(uri));
    return data;
};

export const parseEachNFT = async (nft, index, testnet, claimables) => {
    const collectionIdent = nft.collectionIdent;
    let uri = nft.uri;

    if (collectionIdent === "0x36f8f51f65fe200311f709b797baf4e193dd0b0d") {
        uri = `https://treatdao.com/api/nft/${nft.native.tokenId}`;
    } else if (
        collectionIdent === "0x691bd0f2f5a145fcf297cf4be79095b66f002cbc"
    ) {
        uri = `https://api.crosspunks.com/cars/meta/2/${nft.native.tokenId}`;
    } else if (
        collectionIdent === "0x7f3495cf2d05db6e9e52cdf989bced71e786725c"
    ) {
        uri = `https://api.crosspunks.com/cars/meta/1/${nft.native.tokenId}`;
    } else if (
        collectionIdent === "0x36f8f51f65fe200311f709b797baf4e193dd0b0d"
    ) {
        uri = `https://treatdao.com/api/nft/${nft.native.tokenId}`;
    }
    const { from, NFTList } = store.getState().general;
    let whitelisted;
    let videoFormat;
    let imageFormat;
    let nftObj = {
        uri,
        collectionIdent: nft.collectionIdent || undefined,
        native: { ...nft.native },
        dataLoaded: true,
        whitelisted: testnet ? true : whitelisted,
        nftId: nft.nftId || undefined,
        appId: nft.appId || undefined,
    };
    if (from.text === "Tezos") {
        if (nft.native?.meta?.token?.metadata?.formats) {
            const obj = nft.native?.meta?.token?.metadata?.formats;
            const mimeType = obj[0]["mimeType"];
            const format = mimeType?.slice(0, mimeType?.lastIndexOf("/"));
            if (format === "image") {
                imageFormat = true;
                nftObj.image = setupURI(obj.uri);
            } else if (format === "video") {
                videoFormat = true;
                nftObj.animation_url = setupURI(obj.uri);
            }
        }
        if (nft.native?.meta?.token?.metadata?.mimeType) {
            const mimeType = nft.native?.meta?.token?.metadata?.mimeType;
            const format = mimeType.slice(0, mimeType.lastIndexOf("/"));
            if (format === "image") {
                imageFormat = true;
                nftObj.image = setupURI(
                    nft.native?.meta?.token?.metadata?.displayUri
                );
            } else if (format === "video") {
                videoFormat = true;
                nftObj.animation_url = setupURI(
                    nft.native?.meta?.token?.metadata?.displayUri
                );
            }
        }
        if (
            !nftObj.image &&
            nft.native?.meta?.token?.metadata?.displayUri &&
            imageFormat
        ) {
            nftObj.image = nft.native?.meta?.token?.metadata?.displayUri;
            imageFormat = true;
        } else if (!nftObj.image && nft.native?.meta?.token?.metadata?.image) {
            nftObj.image = nft.native?.meta?.token?.metadata?.image;
            imageFormat = true;
        }
        nftObj.image = imageFormat
            ? nftObj.image ||
              nft.native?.meta?.token?.metadata?.formats?.uri ||
              nft.image ||
              nft.native?.uri
            : undefined;
        nftObj.animation_url = videoFormat
            ? nftObj.animation_url ||
              nft.native?.meta?.token?.metadata?.formats?.uri
            : undefined;
        nftObj.native.contract = nft.native?.contract;
        nftObj.native.tokenId = nft.native?.tokenId;
        nftObj.native.uri = nft.native?.uri;
        nftObj.name = nft.name || nft.native?.meta?.token?.metadata?.name;
        nftObj.collectionIdent = nft.collectionIdent;
        nftObj.description =
            nft.description || nft.native?.meta?.token?.metadata?.description;
        nftObj.native.symbol =
            nft.symbol || nft.native?.meta?.token?.metadata?.symbol;
    } else {
        // debugger;
        const video = checkIfVideo(setupURI(uri));
        nftObj.animation_url = video;
        const image = !video ? checkIfImage(setupURI(uri)) : undefined;
        nftObj.image = nftObj.image ? nftObj.image : image;
        let data;
        if (isJson(uri)) {
            const { description, image, name } = isJson(uri);
            nftObj.image = image;
            nftObj.name = name;
            nftObj.description = description;
        } else if (uri) {
            try {
                data = await fetchURI(setupURI(uri));
            } catch (error) {
                console.error(error);
            }
        }
        if (typeof data === "object") {
            nftObj = { ...nftObj, ...data };
            if (
                !nftObj.image?.includes("http") &&
                !nftObj.image?.includes("https") &&
                !nftObj.image?.includes("ipfs")
            ) {
                nftObj.image = `https://ipfs.io/ipfs/${nftObj.image}`;
            } else if (nftObj.image?.includes(".json")) {
                const n = await fetchURI(setupURI(nftObj.image));
                if (typeof n === "object") {
                    nftObj = { ...nftObj, ...data, ...n };
                }
            }
        } else {
            if (data) {
                let n;
                try {
                    n = base64.decode(data);
                } catch (error) {
                    console.log(error);
                }
                const json = JSON.parse(n);
                nftObj.image = setupURI(json.image);
            }
        }
        if (nftObj.animation_url && nftObj.image) {
            if (ipfsOrjson(nftObj.animation_url)) {
                const n = await fetchURI(setupURI(nftObj.animation_url));
                if (typeof n === "object") {
                    const imageFormat = n.formats[0]?.mimeType?.includes(
                        "image"
                    );
                    const videoFormat = n.formats[0]?.mimeType?.includes(
                        "video"
                    );
                    nftObj.image = imageFormat ? n.displayUri : undefined;
                    nftObj.animation_url = videoFormat
                        ? n.displayUri
                        : undefined;
                }
            }
            if (ipfsOrjson(nftObj.image)) {
                const n = await fetchURI(setupURI(nftObj.image));
                if (typeof n === "object") {
                    const imageFormat = n.formats[0]?.mimeType?.includes(
                        "image"
                    );
                    const videoFormat = n.formats[0]?.mimeType?.includes(
                        "video"
                    );
                    nftObj.image = imageFormat ? n.displayUri : undefined;
                    nftObj.animation_url = videoFormat
                        ? n.displayUri
                        : undefined;
                }
            }
        }
    }

    if (
        !testnet &&
        nft?.native?.contract === "0xED1eFC6EFCEAAB9F6d609feC89c9E675Bf1efB0a"
    ) {
        whitelisted = false;
    } else if (!testnet) {
        try {
            whitelisted = await isWhiteListed(from.text, nft);
            nftObj.whitelisted = whitelisted;
        } catch (error) {
            console.log(error);
        }
    }
    if (
        nftObj?.image?.includes("ipfs") &&
        !nftObj?.image?.includes("https://ipfs.io") &&
        !nftObj?.image?.includes("https://treatdao")
    ) {
        nftObj.image = "https://ipfs.io/" + nftObj.image.replace(":/", "");
    }
    if (nftObj.image) {
        // debugger
        const isVideo = await checkIfVideo(nftObj.image);
        if (isVideo) {
            nftObj.animation_url = nftObj.image;
            nftObj.image = undefined;
        }
    }
    if (nft?.native?.name?.includes("Rookie77")) {
        const object = await Rookie(nft);
        nftObj.image = object.image;
        nftObj.animation_url = object.video;
    }
    if (collectionIdent === "0x35b5583e9dffe80aab650b158cc263d9ebfe1138") {
        const { data } = await axios(setupURI(nft.uri));
        nftObj.image = data.image;
        nftObj.animation_url = data.video;
    } else if (
        collectionIdent === "0xfc2b3db912fcd8891483ed79ba31b8e5707676c9"
    ) {
        const { data } = await axios(setupURI(nft.uri));
        nftObj.name = data.name;
        nftObj.attributes = data.attributes;
        nftObj.image = data.image;
        nftObj.description = data.description;
    } else if (
        collectionIdent === "0xf0E778BD5C4c2F219A2A5699e3AfD2D82D50E271"
    ) {
        const { data } = await axios(setupURI(nft.uri));
        nftObj.animation_url = data.artifactUri;
        nftObj.attributes = data.attributes;
        nftObj.name = data.name;
    }
    if (
        claimables &&
        (!claimables[index]?.dataLoaded ||
            !claimables[index]?.image ||
            !claimables[index]?.animation_url)
    ) {
        store.dispatch(setEachClaimables({ nftObj, index }));
    } else if (
        !NFTList[index]?.dataLoaded ||
        !NFTList[index]?.image ||
        !NFTList[index]?.animation_url
    ) {
        store.dispatch(setEachNFT({ nftObj, index }));
    }
};

export const parseNFTS = async (nfts) => {
    const { from, to } = store.getState().general;
    if (from.key === "Tezos") {
        return nfts
            .filter((n) => n.native)
            .map((n) => {
                return {
                    ...n,
                    ...n?.native?.meta?.token?.metadata,
                };
            });
    }
    const result = await Promise.all(
        nfts.map(async (n, index) => {
            return await new Promise(async (resolve) => {
                try {
                    if (!n.uri) resolve({ ...n });
                    const jsonURI = undefined;
                    const uri = jsonURI?.image;
                    if (jsonURI) resolve({ ...n, ...jsonURI, uri });
                    const res = await axios({
                        url: setupURI(n.uri),
                        timeout: 5000,
                    });

                    if (res && res.data) {
                        const isImageIPFS = setupURI(res.data.image)?.includes(
                            "ipfs.io"
                        );

                        let result =
                            typeof res.data != "string"
                                ? { ...res.data, ...n }
                                : { ...n };
                        if (isImageIPFS) {
                            const ipfsNFT = await axios({
                                url: setupURI(res.data.image),
                                timeout: 5000,
                            });
                            if (ipfsNFT.data && ipfsNFT.data.displayUri)
                                result.image = ipfsNFT.data.displayUri;
                        }
                        resolve(result);
                    } else resolve(undefined);
                } catch (err) {
                    if (err) {
                        try {
                            const res = await axios({
                                url: `https://sheltered-crag-76748.herokuapp.com/${setupURI(
                                    n.uri?.uri ? n.uri?.uri : n.uri
                                )}`,
                                timeout: 5000,
                            });
                            if (res.data) {
                                try {
                                    const { uri } = res.data;
                                    const result = await axios({
                                        url: `https://sheltered-crag-76748.herokuapp.com/${setupURI(
                                            n.uri?.uri ? n.uri?.uri : n.uri
                                        )}`,
                                        timeout: 5000,
                                    });
                                    resolve({
                                        data: result.data,
                                        ...n,
                                        cantSend: true,
                                    });
                                } catch (err) {
                                    resolve({ ...n });
                                }
                            } else {
                                resolve(undefined);
                            }
                        } catch (err) {
                            resolve(undefined);
                        }
                    }
                }
            });
        })
    );
    return result.filter((n) => n);
};

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
        month: "short", //month: window.innerWidth > 480 ? "long" : "short",
        day: "numeric",
    });
    const year = dateObj.getFullYear();
    const day = month.replace(/^\D+/g, "");
    let ending = "th";
    if (day === "1") {
        ending = "st";
    }
    if (day === "2") {
        ending = "nd";
    }
    if (day === "3") {
        ending = "rd";
    }
    const tm = month + ", " + year;
    return tm;
};

export const getFactory = async () => {
    // debugger
    const f = store.getState().general.factory;
    const testnet = store.getState().general.testNet;

    if (f) return f;
    const testnetConfig = await ChainFactoryConfigs.TestNet();
    const mainnetConfig = await ChainFactoryConfigs.MainNet();
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        mainnetConfig.tronParams.provider = window.tronWeb;
    }
    const factory = ChainFactory(
        testnet ? AppConfigs.TestNet() : AppConfigs.MainNet(),
        testnet ? testnetConfig : mainnetConfig
    );
    store.dispatch(setFactory(factory));
    return factory;
};

export const getFac = async () => {
    const mainnetConfig = ChainFactoryConfigs.MainNet();
    const factory = ChainFactory(AppConfigs.MainNet(), mainnetConfig);
    return factory;
};

export const handleChainFactory = async (someChain) => {
    const factory = await getFactory();
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
            default:
                return "";
        }
    } catch (error) {
        console.error(error);
    }
};

export const getNFTS = async (wallet, from) => {
    const { checkWallet } = store.getState().general;
    const factory = await getFactory();
    const chain = await factory.inner(chainsConfig[from].Chain);
    try {
        let response;
        response = await factory.nftList(
            chain,
            checkWallet ? checkWallet : wallet
        );
        const unique = {};
        try {
            const allNFTs = response.filter((n) => {
                const { tokenId, contract, chainId } = n?.native;
                if (unique[`${tokenId}_${contract.toLowerCase()}_${chainId}`])
                    return false;
                else {
                    unique[
                        `${tokenId}_${contract.toLowerCase()}_${chainId}`
                    ] = true;
                    return true;
                }
            });
            return allNFTs;
        } catch (err) {
            return [];
        }
    } catch (err) {
        console.log(err, "NFT Indexer error");
        return [];
    }
};

export const setClaimablesAlgorand = async (algorandAccount, returnList) => {
    let claimables;
    try {
        if (algorandAccount && algorandAccount.length > 50) {
            const factory = await getFactory();
            claimables = await factory.claimableAlgorandNfts(algorandAccount);
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
    // debugger;
    const hard = "2RKU6NQ3T36B42NJHUO27WTUCS3BOBM7YTAMGQNHPP2CAAUVO2LLMYW5EE";
    let claimables;
    const factory = await getFactory();
    try {
        claimables = await factory.claimableAlgorandNfts(account);
        store.dispatch(setAlgorandClaimables(claimables));
    } catch (error) {
        console.error(error);
    }
};

export const setNFTS = async (w, from, testnet, str) => {
    store.dispatch(setBigLoader(true));
    const res = await getNFTS(w, from, testnet);
    store.dispatch(setPreloadNFTs(res.length));
    store.dispatch(setNFTList(res));
    store.dispatch(setBigLoader(false));
};

export function isValidHttpUrl(string, index) {
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

export const getTronNFTs = async (wallet) => {
    const res = await axios.get(
        `https://apilist.tronscan.org/api/account/tokens?address=${wallet}&start=0&limit=500&hidden=0&show=3&sortType=0&sortBy=0`
    );
    const { total, data } = res.data;

    if (total > 0) {
        const tokens = [];
        for await (let nft of data) {
            const { tokenId, balance, tokenName, tokenAbbr } = nft;
            const contract = await window.tronWeb.contract().at(tokenId);
            const array = new Array(parseInt(balance)).fill(0).map((n, i) => i);
            for await (let index of array) {
                try {
                    const token = await contract
                        .tokenOfOwnerByIndex(wallet, index)
                        .call();
                    const uri = await contract
                        .tokenURI(parseInt(token._hex))
                        .call();
                    const t = {
                        uri,
                        native: {
                            chainId: "9",
                            contract: tokenId,
                            contractType: "ERC721",
                            name: tokenName,
                            symbol: tokenAbbr,
                            tokenId: parseInt(token._hex),
                            uri,
                        },
                    };
                    tokens.push(t);
                } catch (err) {
                    console.log(err);
                }
            }
        }
        return tokens;
    }
    return [];
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

// export const convertIo1 = (address) => {
//   const addr = from(address)
//   return addr.stringEth()
// }

export const convert = (address) => {
    // debugger
    if (checkIfOne1(address)) {
        return convertOne1(address);
    }
    // else if(checkIfIo1(address)) return convertIo1(address)
};
