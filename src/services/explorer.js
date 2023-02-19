import axios from "axios";

export const notifyExplorer = async (fromChainNonce, fromChainHash) => {
    const body = {
        fromChainNonce,
        fromChainHash,
    };
    const explorerService = axios.create({
        baseURL: "https://dev-explorer-api.herokuapp.com",
        timeout: 1000,
    });
    explorerService.post("/handleEvent", body).catch((e) => console.error(e));
};
