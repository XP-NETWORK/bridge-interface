import axios from "axios";

// ? Proxy server
const proxy = "https://sheltered-crag-76748.herokuapp.com/";

// ? setupURI
const setupURI = (uri) => {
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

// ? NFT In Tezos
export const tezosMethod = (nft) => {
    const {
        native: {
            meta: { token: metadata },
        },
        uri,
        native,
        collectionIdent,
    } = nft;
    const data = { ...metadata, uri, native, collectionIdent };
    return data;
};

// ? DEFAULT
export const defaultMethod = async (nft) => {
    const baseUrl = nft.uri;
    try {
        const { data, status, headers } = await axios.get(
            `${proxy}${setupURI(baseUrl)}`
        );
        return data;
    } catch (error) {
        console.error("Default method axios err: ", error);
    }
};

// ? COLLECTIONS BY IDENT
// ! 8BITHEROES-d3022d
export const _8BITHEROES_d3022d = async (nft) => {
    const baseUrl = nft.uri;
    try {
        const { data, status, headers } = await axios.get(
            `${proxy}${setupURI(baseUrl)}`
        );
        return data;
    } catch (error) {
        console.error("_8BITHEROES_d3022d collection axios err: ", error);
    }
};

// ! ADIVCATEAM-599068
export const ADIVCATEAM_599068 = async (nft) => {};

// ! ADIVCCTEAM-9ea546
export const ADIVCCTEAM_9ea546 = async (nft) => {
    const baseUrl = nft.uri;
    try {
        const { data, status, headers } = await axios.get(
            `${proxy}${setupURI(baseUrl)}`
        );
        return data;
    } catch (error) {
        console.error("ADIVCCTEAM_9ea546 collection axios err: ", error);
    }
};

// ! ALETTLTEAM-8b4b7f
export const ALETTLTEAM_8b4b7f = async (nft) => {
    const baseUrl = nft.uri;
    try {
        const { data, status, headers } = await axios.get(
            `${proxy}${setupURI(baseUrl)}`
        );
        return data;
    } catch (error) {
        console.error("ALETTLTEAM-8b4b7f collection axios err: ", error);
    }
};
