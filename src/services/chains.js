/* eslint-disable no-unused-vars */

import axios from "axios";

import {
  Chain as ChainNonce,
  CHAIN_INFO,
  AppConfigs,
  ChainFactory,
  ChainFactoryConfigs,
} from "xp.network";

import { getTronFees } from "./chainUtils/tronUtil";
import { calcFees } from "./chainUtils";

class AbstractChain {
  chain;

  constructor({ chainParams, nonce, chain, bridge }) {
    this.chainParams = chainParams;
    this.nonce = nonce;
    this.chain = chain;
    this.bridge = bridge;
  }

  async connect() {
    throw new Error("connect method not implemented");
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

  async getNFTs(address) {
    console.log(this.bridge);
    try {
      return await this.bridge.nftList(this.chain, address);
    } catch (e) {
      throw new Error("NFT-Indexer is temporarily under maintenance");
    }
  }

  filterNFTs(nfts) {
    const unique = {};
    try {
      const allNFTs = nfts.filter((n) => {
        const { chainId, address } = n.native;
        const tokenId = n.native.tokenId || n.native.token_id;
        const contract = n.native.contract || n.native.contract_id;

        if (
          unique[
            `${tokenId}_${contract?.toLowerCase() ||
              address?.toLowerCase()}_${chainId}`
          ]
        ) {
          return false;
        } else {
          unique[
            `${tokenId}_${contract?.toLowerCase() ||
              address?.toLowerCase()}_${chainId}`
          ] = true;
          return true;
        }
      });
      if (allNFTs.length < 1) {
        //store.dispatch(setIsEmpty(true));
      } else {
        //store.dispatch(setIsEmpty(false));
      }
      return allNFTs;
    } catch (err) {
      return [];
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
    console.log(toChain);

    if (toChain.getNonce() === 9) {
      return calcFees(getTronFees(this.chainParams.key), this.nonce);
    }

    try {
      const res = await this.bridge.estimateFees(this.chain, toChain, nft, acc);

      return calcFees(res, this.nonce);
    } catch (e) {
      console.log(e.message || e, "in estimate");
      return {
        fees: "",
        formatedFees: 0,
      };
    }
  }

  async sendNFT(args) {
    if (!this.signer) throw new Error("No signer for ", this.chainParams.text);
    console.log(args, "args");
    const { nft, toChain, receiver, fee, mintWith } = args;

    return await this.bridge.transferNft(
      this.chain,
      toChain.chain,
      nft,
      this.signer,
      receiver,
      fee,
      mintWith
    );
  }

  async approve(nfts) {
    if (!this.signer) throw new Error("No signer for ", this.chainParams.text);
  }
}

class EVM extends AbstractChain {
  constructor(params) {
    super(params);
  }

  async send(nfts, toChain, receiver, fee, mintWith) {}
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

class TON extends AbstractChain {
  constructor(params) {
    super(params);
  }
}

class Near extends AbstractChain {
  constructor(params) {
    super(params);
  }

  async connect(wallet) {
    switch (wallet) {
      default:
        return await this.chain.connectWallet();
    }
  }

  async getNFTs(address) {
    //const nfts = await super.getNFTs(address);

    const res = await axios.post(
      `https://interop-testnet.hasura.app/v1/graphql?rand=${Math.random()}`,
      {
        query: `
      query MyQuery {
        mb_views_nft_tokens(
          distinct_on: metadata_id
          where: {owner: {_eq: "${address}"}, _and: {burned_timestamp: {_is_null: true}}}
        ) {
          nft_contract_id
          title
          description
          media
          token_id
          owner
          metadata_id
        }
      }
      `,
      }
    );

    console.log(res.data);

    const {
      data: {
        data: { mb_views_nft_tokens: nfts },
      },
    } = res;

    return nfts.map((nft) => ({
      ...nft,
      native: {
        ...nft.native,
        chainId: String(ChainNonce.NEAR),
        tokenId: nft.token_id || nft.native.token_id,
        contract: nft.nft_contract_id || nft.native.contract_id,
      },
      /*metaData: {
        ...nft.native?.metadata,
        name: nft.title || nft.native.metadata.title,
        image: nft.media || nft.native.metadata.media,
        imageFormat: nft.native.metadata.mime_type.split("/").at(1),
      },*/
    }));
  }
}

export default {
  EVM,
  Elrond,
  Tron,
  Algorand,
  Tezos,
  VeChain,
  Cosmos,
  Near,
  TON,
};
