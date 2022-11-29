/* eslint-disable no-unused-vars */
import {
  Chain as ChainNonce,
  CHAIN_INFO,
  AppConfigs,
  ChainFactory,
  ChainFactoryConfigs,
  ChainType,
} from "xp.network";

import ChainInterface from "./chains";

import { BridgeModes } from "../components/values";

class Bridge {
  chains = {};
  config;
  checkWallet = null;

  setCheckWallet(wallet) {
    this.checkWallet = wallet;
  }

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
    console.log(nonce);
    const chainParams = CHAIN_INFO.get(nonce);
    const chainId = String(nonce);
    const chain = this.chains[chainId];
    if (chain) return chain;
    try {
      const params = {
        nonce,
        chainParams,
        chain: await this.bridge.inner(nonce),
        bridge: this.bridge,
      };

      console.log(chainParams);

      switch (chainParams.type) {
        case ChainType.EVM:
          this.chains[chainId] = new ChainInterface.EVM(params);
          return this.chains[chainId];
        case ChainType.TRON:
          this.chains[chainId] = new ChainInterface.Tron(params);
          return this.chains[chainId];
        case ChainType.ELROND:
          this.chains[chainId] = new ChainInterface.Elrond(params);
          return this.chains[chainId];
        case ChainType.ALGORAND:
          this.chains[chainId] = new ChainInterface.Algorand(params);
          return this.chains[chainId];
        case ChainType.TEZOS:
          this.chains[chainId] = new ChainInterface.Tezos(params);
          return this.chains[chainId];
        case ChainType.COSMOS:
          this.chains[chainId] = new ChainInterface.Cosmos(params);
          return this.chains[chainId];
        case ChainType.TON:
          this.chains[chainId] = new ChainInterface.TON(params);
          return this.chains[chainId];
        case ChainType.NEAR:
          this.chains[chainId] = new ChainInterface.Near(params);
          return this.chains[chainId];
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
