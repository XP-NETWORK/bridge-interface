import { CHAIN_INFO } from "../../components/values";

export const checkIfLive = (chain, validatorsInfo) => {
    const nonce = CHAIN_INFO[chain]?.nonce;
    if (validatorsInfo) {
      return validatorsInfo[nonce]?.bridge_alive;
    }
};

export const filterChains = (arr, extraChain) => {
  const allChains = arr.filter(chain => chain.text !== extraChain)
  const onlyNew = allChains.filter(chain => chain.new)
  const onlyComing = allChains.filter(chain => chain.coming)
  const onlyMaintenance = allChains.filter( chain => chain.maintenance)
  const regular = allChains.filter(chain => !chain.maintenance && !chain.new && !chain.coming).sort((a,b) => b.order - a.order)
  return [...onlyNew, ...regular, ...onlyMaintenance, ...onlyComing]
}
