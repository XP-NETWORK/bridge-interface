import axios from "axios";
import { isWhiteListed } from "../components/NFT/NFTHelper";
import { setEachClaimables, setEachNFT } from "../store/reducers/generalSlice";
import store from "../store/store";

const setupURI = (uri) => {
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
        // TODO EVM
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
    } else if (collectionIdent === "KT1EpGgjQs73QfFJs9z7m1Mxm5MTnpC2tqse") {
        const {
            native: {
                meta: {
                    token: {
                        metadata: {
                            displayUri,
                            artifactUri,
                            description,
                            name,
                            collectionName,
                        },
                    },
                },
            },
        } = nft;
        nftObj.image = displayUri;
        nftObj.animation_url = artifactUri;
        nftObj.description = description;
        nftObj.name = name;
        nftObj.collectionName = collectionName;
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

const parseForTezos = (collection) => {
    switch (collection) {
        default:
            break;
    }
};
