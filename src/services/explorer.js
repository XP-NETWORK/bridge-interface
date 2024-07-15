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

export const notifyExplorerForHederaAssociation = async (hederaAddress, evmAddress) => {
    const body = {
        hederaAddress,
        evmAddress,
    };
    const explorerService = axios.create({
        baseURL: "https://dev-explorer-api.herokuapp.com",
        timeout: 1000,
    });
    const response = (await explorerService.post("/createHederaAssociation", body)).data;
    return response;
};