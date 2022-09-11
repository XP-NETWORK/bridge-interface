import {
  Chain as ChainNonce,
  CHAIN_INFO,
  AppConfigs,
  ChainFactory,
  ChainFactoryConfigs,
} from "xp.network";

class AbstractChain {
  chain;

  constructor({ chain }) {
    this.chainParams = chain;
  }

  async init(isTestnet, signer) {
    try {
      if (!signer) throw new Error("shit fucks");
      const config = !isTestnet
        ? await ChainFactoryConfigs.MainNet()
        : await ChainFactoryConfigs.TestNet();

      const chain = ChainFactory(
        isTestnet ? AppConfigs.TestNet() : AppConfigs.MainNet(),
        config
      );

      const nonce = ChainNonce[this.chainParams?.key?.toUpperCase()];

      if (!nonce) throw new Error("Cant find chain by key");
      this.nonce = nonce;
      this.chain = await chain.inner(nonce);
      if (!this.chain) throw new Error("Cant get inner object of chain");
      this.signer = signer;
      return this;
    } catch (e) {
      console.log(e, "error in chain init");
      throw e;
    }
  }

  async balance(account) {
    try {
      const res = await this.chain.balance(account);
      const decimals = CHAIN_INFO.get(this.nonce)?.decimals;
      return res.dividedBy(decimals).toNumber();
    } catch (e) {
      console.log(e, "error in balance");
    }
  }

  send(nfts) {}

  approve(nfts) {}
}

class EVM extends AbstractChain {
  constructor(params) {
    super(params);
  }
}

class Elrond extends AbstractChain {
  constructor(params) {
    super(params);
  }

  async getWlgdBalance(account) {
    return await this.chain.wegldBalance(account);
  }
}

class Tron extends AbstractChain {
  constructor(params) {
    super(params);
  }
}

class Algorand extends AbstractChain {
  constructor(params) {
    super(params);
  }

  async getClaimables(account) {
    return await this.chain.claimableAlgorandNfts(account);
  }
}

class Tezos extends AbstractChain {
  constructor(params) {
    super(params);
  }
}

class VeChain extends AbstractChain {
  constructor(params) {
    super(params);
  }
}

class Cosmos extends AbstractChain {
  constructor(params) {
    super(params);
  }
}

export const ChainFabric = (chain) => {
  const params = {
    chain,
  };

  switch (chain.type) {
    case "EVM":
      return new EVM(params);
    case "Tron":
      return new Tron(params);
    case "Elrond":
      return new Elrond(params);
    case "Algorand":
      return new Algorand(params);
    case "Tezos":
      return new Tezos(params);
    case "VeChain":
      return new VeChain(params);
    case "Cosmos":
      return new Cosmos(params);
    default:
      throw new Error("unsuported chain");
  }
};

false &&
  (async () => {
    const chain = await ChainFabric({
      type: "Cosmos",
      key: "Secret",
    }).init(false, window.ethereum);

    const bal = await chain.balance(
      "secret1ugsxn37pxee06zyenvqv6y68mgdq0dehqc8sy9"
    );
    console.log(bal, "bal");
  })();
