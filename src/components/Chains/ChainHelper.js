import { CHAIN_INFO } from "../../components/values";

export const checkIfLive = (chain, validatorsInfo) => {
    const nonce = CHAIN_INFO[chain]?.nonce;
    if (validatorsInfo) {
      return validatorsInfo[nonce]?.bridge_alive;
    }
};

export const filterChains = (arr, extraChain) => {
console.log("🚀 ~ file: ChainHelper.js ~ line 11 ~ filterChains ~ extraChain", extraChain)
console.log("🚀 ~ file: ChainHelper.js ~ line 11 ~ filterChains ~ arr", arr)
console.log("🚀 ~ file: ChainHelper.js ~ line 11 ~ filterChains ~ arr", arr.filter(chain => chain.text !== extraChain))
  return arr.filter(chain => chain.text !== extraChain)
}
