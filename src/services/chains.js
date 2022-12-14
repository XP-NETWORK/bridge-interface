/* eslint-disable no-unused-vars */

import axios from "axios";

import { Chain as ChainNonce, CHAIN_INFO } from "xp.network";
import BigNumber from "bignumber.js";

import { ethers, BigNumber as BN } from "ethers";
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

  async checkSigner() {
    if (!this.signer) {
      throw new Error("No signer");
    }
  }

  async setSigner(signer) {
    console.log(signer, this.nonce);
    try {
      //if (!signer) throw new Error("no signer");
      this.signer = signer;
      return this;
    } catch (e) {
      console.log(e, "error in setSigner");
      throw e;
    }
  }

  async getNFTs(address) {
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

  async unwrap(nft, data) {
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
        wrapped: data.wrapped,
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

  async mintNFT(uri) {
    console.log(this.signer);
    const mint = await this.chain.mintNft(this.signer, {
      contract: "0x34933A5958378e7141AA2305Cdb5cDf514896035",
      uri,
    });
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

  async estimate(toChain, nft, receiver = "", amount) {
    //tron case
    /* if (toChain.getNonce() === 9) {
      return calcFees(getTronFees(this.chainParams.key), this.nonce);
    }*/

    try {
      const res = await this.bridge.estimateFees(
        this.chain,
        toChain,
        nft,
        receiver
      );

      let sftFees = new BigNumber(0);

      if (Number(nft.amountToTransfer) > 0) {
        sftFees = await this.bridge.estimateSFTfees(
          this.chain,
          BigInt(nft.amountToTransfer),
          0.05
        );
      }

      const fees = res.multipliedBy(feeMultiplier).integerValue();

      return {
        fees: fees.toString(10),
        formatedFees: fees
          .dividedBy(this.chainParams.decimals)
          .plus(sftFees.dividedBy(this.chainParams.decimals))
          .toNumber(),
      };
    } catch (e) {
      console.log(e.message || e, "in estimate");
      return {
        fees: "",
        formatedFees: 0,
      };
    }
  }

  async transfer(args) {
    try {
      if (!this.signer)
        throw new Error("No signer for ", this.chainParams.text);
      console.log(args, "args");
      const { nft, toChain, receiver, fee, gasLimit, extraFee } = args;

      let { tokenId } = args;

      if (!tokenId) {
        tokenId = nft.native.tokenId;
      }

      const wrapped = await this.bridge.isWrappedNft(nft, Number(this.nonce));

      let mintWith = undefined;

      if (!wrapped) {
        mintWith = await this.bridge.getVerifiedContract(
          nft.native.contract,
          Number(toChain.nonce),
          Number(this.nonce),
          tokenId //tokenId && !isNaN(Number(tokenId)) ? tokenId.toString() : undefined
        );
      }
      const amount = nft.amountToTransfer;
      const beforeAmountArgs = [
        this.chain,
        toChain.chain,
        nft,
        this.signer,
        receiver?.trim(),
      ];

      const afterAmountArgs = [fee, mintWith, gasLimit, extraFee];

      if (!amount || toChain.rejectSft) {
        const args = [...beforeAmountArgs, ...afterAmountArgs];
        const res = await this.bridge.transferNft(...args);
        console.log(res, "res");
        return res;
      } else {
        const args = [...beforeAmountArgs, BigInt(amount), ...afterAmountArgs];
        console.log(args, "args");

        const res = await this.bridge.transferSft(...args);
        console.log(res, "res");
        return res;
      }
    } catch (e) {
      console.log(e, "in transfer");
      throw e;
    }
  }

  async preTransfer(nft, fees) {
    if (!this.signer) throw new Error("No signer for ", this.chainParams.text);
    try {
      return await this.chain.preTransfer(this.signer, nft, fees);
    } catch (e) {
      console.log(e, "in preTransfer");
      throw e;
    }
  }
}

class EVM extends AbstractChain {
  constructor(params) {
    super(params);
  }

  async checkSigner() {
    try {
      this.signer = undefined;
      await super.checkSigner();
    } catch (e) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      this.setSigner(signer);
    }
  }

  async preTransfer(nft, fees) {
    if (!this.signer) throw new Error("No signer for ", this.chainParams.text);
    try {
      return await this.chain.approveForMinter(nft, this.signer, fees);
    } catch (e) {
      console.log(e, "EVM :in preTransfer");
      throw e;
    }
  }

  async transfer(args) {
    try {
      return await super.transfer(args);
    } catch (e) {
      if (e.message?.includes("cannot estimate gas;")) {
        return await super.transfer({
          ...args,
          gasLimit: BN.from(100000),
        });
      }
      throw e;
    }
  }
}

class Elrond extends AbstractChain {
  rejectSft = true;

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

  async unwrap(nft, data) {
    let nonce =
      data.wrapped?.token_id ||
      data.wrapped?.tokenId ||
      data.wrapped?.item_address;

    let contract = data.wrapped?.contract || data.wrapped?.source_mint_ident;

    if (!contract && nonce?.split("-")?.length === 3) {
      contract = nonce
        .split("-")
        ?.slice(0, 2)
        .join("-");
    }

    if (!nonce || nonce.split("-")?.length > 1) {
      nonce = data.wrapped.source_token_id || data.wrapped.nonce;
    }

    const tokenId =
      contract + "-" + ("0000" + Number(nonce).toString(16)).slice(-4);

    return {
      contract,
      tokenId,
      chainId: String(this.nonce),
      nft: {
        ...nft,
        collectionIdent: contract,
        native: {
          ...nft.native,
          chainId: String(this.nonce),
          contract,
          tokenId,
          nonce,
        },
      },
    };
  }

  async getWegldBalance(account) {
    try {
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

class Solana extends AbstractChain {
  constructor(params) {
    super(params);
  }
  async preTransfer() {
    return true;
  }

  async mintNFT(uri) {
    const mint = await this.chain.mintNft(this.signer, {
      uri,
    });
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
  Solana,
};
