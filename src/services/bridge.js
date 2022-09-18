import {
  Chain as ChainNonce,
  CHAIN_INFO,
  AppConfigs,
  ChainFactory,
  ChainFactoryConfigs,
} from "xp.network";

import ChainInterface from "./chains";

class Bridge {
  async init() {
    try {
      const config = !this.isTestnet
        ? await ChainFactoryConfigs.MainNet()
        : await ChainFactoryConfigs.TestNet();

      this.bridge = ChainFactory(
        this.isTestnet ? AppConfigs.TestNet() : AppConfigs.MainNet(),
        config
      );

      return this;
    } catch (e) {
      console.log(e, "on Init bridge");
    }
  }

  constructor(isTestnet = false) {
    this.isTestnet = isTestnet;
    return this;
  }

  async getChain(chainParams) {
    try {
      const nonce = ChainNonce[chainParams.key.toUpperCase()];
      const params = {
        nonce,
        chainParams,
        chain: await this.bridge.inner(nonce),
        bridge: this.bridge,
      };

      switch (chainParams.type) {
        case "EVM":
          return new ChainInterface.EVM(params);
        case "Tron":
          return new ChainInterface.Tron(params);
        case "Elrond":
          return new ChainInterface.Elrond(params);
        case "Algorand":
          return new ChainInterface.Algorand(params);
        case "Tezos":
          return new ChainInterface.Tezos(params);
        case "VeChain":
          return new ChainInterface.VeChain(params);
        case "Cosmos":
          return new ChainInterface.Cosmos(params);
        default:
          throw new Error("unsuported chain");
      }
    } catch (e) {
      console.log(e.message || e, "error in getChain");
      throw e;
    }
  }
}






false && (async () => {

  const nft = {
    uri: "https://ipfs.moralis.io:2053/ipfs/QmUyGiGSRK56Pz9XizhiXp6ABfUimm8TVHJ3n3HA7NNwSN/30",
    native: {
        chainId: "7",
        tokenId: "30",
        contract: "0xa36251C995D8376B6FCf9964eed79E62706b4723",
        owner: "0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE",
        uri: "https://ipfs.moralis.io:2053/ipfs/QmUyGiGSRK56Pz9XizhiXp6ABfUimm8TVHJ3n3HA7NNwSN/30",
        symbol: "NANO",
        name: "Nano Paint",
        contractType: "ERC1155"
    },
    collectionIdent: "0xa36251C995D8376B6FCf9964eed79E62706b4723"}
  
  // const nftObj = JSON.parse(nft)

   //console.log(nftObj);

    const bridge = await new Bridge().init()



    const chain = await bridge.getChain({
      type: "EVM",
      key: "Fuse",
    });

    const to = await bridge.getChain({
      type: "Tron",
      key: "Tron",
    });

  

    const estim = await chain.estimate(to.chain, nft, '0x6449b68cc5675f6011e8DB681B142773A3157cb9')

    console.log(estim);

    
  })();

export default (isTestnet) => new Bridge(isTestnet);
