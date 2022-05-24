import axios from "axios";

export const setupURI = (uri) => {
    if (uri) {
        if (uri.includes("https://ipfs.io")) {
            return `https://sheltered-crag-76748.herokuapp.com/${uri}`;
        } else if (uri.includes("ipfs://")) {
            return "https://ipfs.io/" + uri.replace(":/", "");
        } else if (
            uri.includes("data:image/") ||
            uri.includes("data:application/")
        ) {
            return `https://sheltered-crag-76748.herokuapp.com/${uri}`;
        } else {
            if (uri) {
                uri.replace("http://", "https://");
                return `https://sheltered-crag-76748.herokuapp.com/${uri}`;
            }
        }
    }
    return `https://sheltered-crag-76748.herokuapp.com/${uri}`;
};

const getData = async (url) => {
    let dataToReturn = {};
    try {
        const { data, status, headers } = await axios.get(setupURI(url));
        dataToReturn = { ...data };
        return dataToReturn;
    } catch (error) {
        console.log(error);
    }
};

export const NFTParser = async (uri, index) => {
    if (uri.includes("https")) {
        const data = await getData(uri);
        console.log("data: ", data, "index: ", index);
    }
};
