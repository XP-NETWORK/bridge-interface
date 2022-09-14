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

/*(async () => {

    const bridge = Bridge.init()

    const chain = await bridge.getChain({
      type: "Cosmos",
      key: "Secret",
    });

    const bal = await chain.balance(
      "secret1ugsxn37pxee06zyenvqv6y68mgdq0dehqc8sy9"
    );
    console.log(bal, "bal");
  })();*/

export default (isTestnet) => new Bridge(isTestnet);
