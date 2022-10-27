import { CHAIN_INFO } from "../../components/values";

export const checkIfLive = (chain, validatorsInfo) => {
    // debugger;
    const { location } = document;
    const localhost = location.hostname === "localhost";
    const nonce = CHAIN_INFO[chain]?.nonce;
    if (localhost) return true;
    else if (validatorsInfo) {
        return validatorsInfo[nonce]?.bridge_alive;
    }
};

export const filterChains = (arr, extraChain) => {
    return arr.filter((chain) => chain.text !== extraChain);
};
