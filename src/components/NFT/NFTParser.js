import axios from "axios";

export const setupURI = (uri) => {
    if (uri) {
        if (uri.includes("https://ipfs.io")) {
            return uri;
        } else if (uri.includes("ipfs://")) {
            return "https://ipfs.io/" + uri.replace(":/", "");
        } else if (
            uri.includes("data:image/") ||
            uri.includes("data:application/")
        ) {
            return uri;
        } else {
            if (uri) {
                uri.replace("http://", "https://");
                return uri;
            }
        }
    }
    return uri;
};

const getData = async (url, index) => {
    debugger;
    try {
        if (url.includes("base64")) {
            const resp = await axios.got(
                `https://sheltered-crag-76748.herokuapp.com/${setupURI(url)}`
            );
            console.log("🚀 resp", resp, url);
        } else {
            const { data, status, headers } = await axios.get(
                `https://sheltered-crag-76748.herokuapp.com/${setupURI(url)}`
            );
            return { data, headers };
        }
    } catch (error) {
        console.log(error);
    }
};

export const NFTParser = async (nft, index) => {
    let nftUpdate = { ...nft };
    const uri = nftUpdate.uri;

    if (uri.includes("https")) {
        const {
            data: {
                artifactUri,
                attributes,
                description,
                image,
                animation_url,
                displayUri,
                name,
            },
            headers,
        } = await getData(uri, index);
        nftUpdate = {
            artifactUri: artifactUri || undefined,
            attributes: attributes || undefined,
            description: description || undefined,
            image: setupURI(image) || undefined,
            animation_url: setupURI(animation_url) || undefined,
            displayUri: setupURI(displayUri) || undefined,
            name: name || undefined,
        };
        console.log(
            "🚀 ~ file: NFTParser.js ~ line 51 ~ NFTParser ~ nftUpdate",
            nftUpdate
        );
    }
};
