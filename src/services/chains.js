/* eslint-disable no-unused-vars */

import axios from "axios";

import { Chain as ChainNonce, CHAIN_INFO } from "xp.network";

import { getTronFees } from "./chainUtils/tronUtil";
import { calcFees } from "./chainUtils";

const feeMultiplier = 1.1;

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
      console.log(e, "e");
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

      return allNFTs;
    } catch (err) {
      return [];
    }
  }

  preParse(nft) {
    const contract = nft.native?.contract || nft.collectionIdent;
    return {
      ...nft,
      collectionIdent: contract,
      chainId: nft.native?.chainId,
      tokenId: nft.native?.tokenId,
      contract,
    };
  }

  async unwrap(nft) {
    const res = await axios(nft.uri);
    const { data } = res;

    let tokenId =
      data.wrapped?.token_id ||
      data.wrapped?.tokenId ||
      data.wrapped?.item_address;

    let contract = data.wrapped?.contract || data.wrapped?.source_mint_ident;

    return {
      nft: {
        ...nft,
        collectionIdent: contract,
        uri: data.wrapped?.original_uri,
        native: {
          ...nft.native,
          chainId: data.wrapped?.origin,
          contract,
          tokenId,
          uri: data.wrapped?.original_uri,
        },
      },
      chainId: data.wrapped?.origin,
      tokenId,
      contract,
    };
  }

  async mintNFT(uri) {}

  async balance(account) {
    try {
      const res = await this.chain.balance(account);
      const decimals = CHAIN_INFO.get(this.nonce)?.decimals;
      return res.dividedBy(decimals).toNumber();
    } catch (e) {
      console.log(e, "error in balance");
    }
  }

  async estimate(toChain, nft, receiver = "") {
    //tron case
    /* if (toChain.getNonce() === 9) {
      return calcFees(getTronFees(this.chainParams.key), this.nonce);
    }*/
    console.log(toChain);
    try {
      const res = await this.bridge.estimateFees(
        this.chain,
        toChain,
        nft,
        receiver
      );
      const fees = res.multipliedBy(feeMultiplier).integerValue();
      return {
        fees: fees.toString(10),
        formatedFees: fees.dividedBy(this.chainParams.decimals).toNumber(),
      };
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

  async getNFTs(address) {
    try {
      return await super.getNFTs(address);
    } catch (e) {
      return [];
    }
  }

  async unwrap(nft) {
    const res = await super.unwrap(nft);

    const contract =
      res.tokenId
        .split("-")
        ?.slice(0, 2)
        .join("-") ||
      data.wrapped?.source_mint_ident
        .split("-")
        ?.slice(0, 2)
        .join("-");
    const token = data.wrapped?.source_token_id || data.wrapped?.nonce;
    tokenId = this.isHex(token)
      ? contract + token
      : contract + "-" + ("0000" + Number(token).toString(16)).slice(-4);

    return {
      ...nft,
      contract,
    };

    return {
      nft: {
        ...nft,
        collectionIdent: contract,
        uri: data.wrapped?.original_uri,
        native: {
          ...nft.native,
          chainId: data.wrapped?.origin,
          contract,
          tokenId,
          uri: data.wrapped?.original_uri,
        },
      },
      chainId: data.wrapped?.origin,
      tokenId,
      contract,
    };
  }

  async getWegldBalance(account) {
    try {
      console.log(account);
      const bal = await this.chain.wegldBalance(account);
      return bal;
    } catch (e) {
      return 0;
    }
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
    try {
      const x = await this.bridge.claimableAlgorandNfts(account);
      console.log(x, "x");
      return x;
    } catch (e) {
      console.log(e, "e");
      console.log("in getClaimables");
    }
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

  async getNFTs() {
    return [];
  }
}

class TON extends AbstractChain {
  constructor(params) {
    super(params);
  }

  preParse(nft) {
    nft = super.preParse(nft);

    const contract = nft.native?.collectionAddress || "SingleNFt";
    return {
      ...nft,
      collectionIdent: nft.native?.collectionAddress || "SingleNFt",
      native: {
        ...nft.native,
        contract: contract,
        tokenId: nft.native?.address,
      },
    };
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
