import BigNumber from "bignumber.js";

export const getTronFees = (from) => {

    console.log("getTronFees", from);

    return from === "BSC"
      ? new BigNumber("100000000000000000")
      : from === "Polygon"
      ? new BigNumber("23200000000000000000")
      : from === "Ethereum"
      ? new BigNumber("14952490000000000")
      : from === "Algorand"
      ? new BigNumber("32160950300000000000")
      : from === "Elrond"
      ? new BigNumber("239344350000000000")
      : from === "Avalanche"
      ? new BigNumber("529683610000000000")
      : from === "xDai"
      ? new BigNumber("56645012600000000000")
      : from === "Fuse"
      ? new BigNumber("95352570490000000000")
      : new BigNumber('')
}