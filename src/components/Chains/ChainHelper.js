import { CHAIN_INFO } from "../../components/values";

export const checkIfLive = (chain, validatorsInfo) => {
    const nonce = CHAIN_INFO[chain]?.nonce;
    if (validatorsInfo) {
      return validatorsInfo[nonce]?.bridge_alive;
    }
};

export const filterChains = (arr, extraChain) => {
  return arr.filter(chain => chain.text !== extraChain).sort((a, b) => a.order - b.order)
}