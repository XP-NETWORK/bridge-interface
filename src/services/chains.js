import {
  Chain as ChainNonce,
  CHAIN_INFO,
  AppConfigs,
  ChainFactory,
  ChainFactoryConfigs,
} from "xp.network";

import BigNumber from "bignumber.js";

class AbstractChain {
  chain;

  constructor({ chainParams, nonce, chain, bridge }) {
    this.chainParams = chainParams;
    this.nonce = nonce;
    this.chain = chain;
    this.bridge = bridge;
  }

  async setSigner(signer) {
    try {
      if (!signer) throw new Error("no signer");
      this.signer = signer;
      return this;
    } catch (e) {
      console.log(e, "error in setSigner");
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

  async estimate(toChain, nft, acc) {
    //TODO
    /*if (toTronFees) {
      return toTronFees
    }*/
    try {
      const res = await this.bridge.estimateFees(
        this.chain,
        toChain.chain,
        nft,
        acc
      );

      const fees =
        res &&
        res
          .multipliedBy(1.1)
          .integerValue()
          .toString(10);

      const decimals = CHAIN_INFO.get(this.nonce)?.decimals;

      return {
        fees,
        formatedFees: fees.dividedBy(decimals).toNumber(),
      };
    } catch (e) {
      console.log(e.message || e, "in estimate");
      return {
        fees: "",
        formatedFees: 0,
      };
    }
  }

  async sendAsset(args) {
    if (!this.signer) throw new Error("No signer for ", this.chainParams.text);
    let result;
    const { nft, toChain, receiver, fee, mintWith } = args;
    if (nft.amount > 0) {
      result = await this.bridge.transferSft(
        this.chain,
        toChain.chain,
        nft,
        this.signer,
        receiver,
        new BigNumber(nft.amount),
        fee,
        mintWith
      );
    } else {
      result = await this.bridge.transferNft(
        this.chain,
        toChain.chain,
        nft,
        this.signer,
        receiver,
        fee,
        mintWith
      );
    }
    return result;
  }

  async approve(nfts) {
    if (!this.signer) throw new Error("No signer for ", this.chainParams.text);
  }
}

class EVM extends AbstractChain {
  constructor(params) {
    super(params);
  }

  async send(nfts, toChain, receiver, fee, mintWith) {
    for (let index = 0; index < nfts.length; index++) {
      const args = {
        nft: nfts[index],
        toChain,
        receiver,
        fee,
        mintWith,
      };
      const result = await super.sendAsset(args);
    }
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

export default { EVM, Elrond, Tron, Algorand, Tezos, VeChain, Cosmos };
