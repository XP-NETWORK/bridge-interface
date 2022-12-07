export const checkIfLive = (nonce, validatorsInfo) => {
  const localhost =
    window.location.hostname === "localhost" ||
    window.location.pathname.includes("staging");

  if (localhost) return true;
  else if (validatorsInfo) {
    return validatorsInfo[Number(nonce)]?.bridge_alive;
  }
};

export const filterChains = (arr, extraChain) => {
  return arr.filter((chain) => chain.text !== extraChain);
};
