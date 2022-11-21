/* eslint-disable no-unused-vars */
import {
  Chain as ChainNonce,
  CHAIN_INFO,
  AppConfigs,
  ChainFactory,
  ChainFactoryConfigs,
} from "xp.network";

import ChainInterface from "./chains";

import { BridgeModes } from "../components/values";

class Bridge {
  chains = {};
  config;

  async init(network) {
    const testnet = BridgeModes.TestNet === network ? true : false;

    try {
      const config = !testnet
        ? await ChainFactoryConfigs.MainNet()
        : await ChainFactoryConfigs.TestNet();
      this.config = config;
      this.bridge = ChainFactory(
        testnet ? AppConfigs.TestNet() : AppConfigs.MainNet(),
        config
      );

      return this;
    } catch (e) {
      console.log(e, "on Init bridge");
    }
  }

  async getChain(nonce) {
    const chainParams = CHAIN_INFO.get(nonce);
    const chain = this.chains[chainParams.type];
    if (chain) return chain;
    try {
      const params = {
        nonce,
        chainParams,
        chain: await this.bridge.inner(nonce),
        bridge: this.bridge,
      };

      switch (chainParams.type) {
        case "EVM":
          this.chains["EVM"] = new ChainInterface.EVM(params);
          return this.chains["EVM"];
        case "Tron":
          this.chains["Tron"] = new ChainInterface.Tron(params);
          return this.chains["Tron"];
        case "Elrond":
          this.chains["Elrond"] = new ChainInterface.Elrond(params);
          return this.chains["Elrond"];
        case "Algorand":
          this.chains["Algorand"] = new ChainInterface.Algorand(params);
          return this.chains["Algorand"];
        case "Tezos":
          this.chains["Tezos"] = new ChainInterface.Tezos(params);
          return this.chains["Tezos"];
        case "VeChain":
          this.chains["VeChain"] = new ChainInterface.VeChain(params);
          return this.chains["VeChain"];
        case "Cosmos":
          this.chains["Cosmos"] = new ChainInterface.Cosmos(params);
          return this.chains["Cosmos"];
        case "NEAR":
          this.chains["NEAR"] = new ChainInterface.Near(params);
          return this.chains["NEAR"];
        default:
          throw new Error("unsuported chain");
      }
    } catch (e) {
      console.log(e.message || e, "error in getChain");
      throw e;
    }
  }
}

false &&
  (async () => {
    const nft = {
      uri:
        "https://ipfs.moralis.io:2053/ipfs/QmUyGiGSRK56Pz9XizhiXp6ABfUimm8TVHJ3n3HA7NNwSN/30",
      native: {
        chainId: "7",
        tokenId: "30",
        contract: "0xa36251C995D8376B6FCf9964eed79E62706b4723",
        owner: "0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE",
        uri:
          "https://ipfs.moralis.io:2053/ipfs/QmUyGiGSRK56Pz9XizhiXp6ABfUimm8TVHJ3n3HA7NNwSN/30",
        symbol: "NANO",
        name: "Nano Paint",
        contractType: "ERC1155",
      },
      collectionIdent: "0xa36251C995D8376B6FCf9964eed79E62706b4723",
    };

    // const nftObj = JSON.parse(nft)

    //console.log(nftObj);

    const bridge = await new Bridge().init();

    const chain = await bridge.getChain({
      type: "EVM",
      key: "Fuse",
    });

    const to = await bridge.getChain({
      type: "Tron",
      key: "Tron",
    });

    const estim = await chain.estimate(
      to.chain,
      nft,
      "0x6449b68cc5675f6011e8DB681B142773A3157cb9"
    );

    console.log(estim);
  })();

export default () => new Bridge();
