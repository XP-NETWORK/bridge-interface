import { ChainNonce, ChainParams } from "xp.network";

class AbstractChain {
  bridge = {};

  constructor({ chain }) {
    this.chain = chain;
  }

  send(nfts) {}

  approve(nfts) {}
}

class EVM extends AbstractChain {
  constructor(params) {
    super(params);
  }

  send(nfts) {}
}

export const ChainFabric = async (chain) => {
  //c;

  switch (chain.type) {
    case "EVM":
      return new EVM({ chain });
    case "Tron":
    //return new Tron({ chain });
    case "Elrond":
    //return new Elrond({ chain });
    case "Algorand":
    // return new Algorand({ chain });
    case "Tezos":
    // return new Tezos({ chain });
    case "VeChain":
    // return new VeChain({ chain });
    case "Cosmos":
    //return new Cosmos({ chain });
    default:
      throw new Error("unsuported chain");
  }
};
