import { ChainFactory, ChainFactoryConfigs } from "xp-decentralized-sdk";
import { sleep } from "../utils";
import { TIME } from "../constants/time";
import { v3_bridge_mode } from "../components/values";
import { v3_ChainId } from "./chainsTypes";
import { ethers } from "ethers";

export class XPDecentralizedUtility {
  isV3Enabled = false;
  factory = ChainFactory(ChainFactoryConfigs.TestNet());

  constructor() {
    this.isV3Enabled = v3_bridge_mode;
  }

  approveNFT = async (
    fromChain,
    nft,
    to = null,
    bigNumberFees = null,
    receiver = null
  ) => {
    await fromChain.checkSigner();
    this.isV3Enabled
      ? await this.approveNFT_V3(fromChain, nft)
      : await this.approveNFT_V2(fromChain, nft, to, bigNumberFees, receiver);
  };

  approveNFT_V2 = async (fromChain, nft, to, bigNumberFees, receiver) => {
    await fromChain.preTransfer(
      nft,
      to.nonce,
      bigNumberFees,
      /*new BigNumber(bigNumberFees)
                .div(10)
                .integerValue()
                .toString(10)*/
      {
        to: Number(to.nonce),
        receiver: receiver.trim(),
      }
    );
  };
  approveNFT_V3 = async (fromChain, nft) => {
    const { tokenId, contract } = nft.native;

    const signer = fromChain.getSigner();
    console.log({ fromChain, chain: v3_ChainId[fromChain.nonce].name });
    const originChain = await this.factory.inner(
      v3_ChainId[fromChain.nonce].name
    );

    await originChain.approveNft(signer, tokenId, contract, {
      gasLimit: 5_000_000,
    });

    await sleep(TIME.TEN_SECONDS);
  };

  lockNFT = async (
    fromChain,
    toChain,
    nft,
    receiver,
    fee = null,
    discountLeftUsd = null,
    account = null
  ) => {
    if (this.isV3Enabled) {
      return await this.lockNFT_V3(fromChain, toChain, nft, receiver);
    } else {
      return await this.lockNFT_V2(
        fromChain,
        toChain,
        nft,
        receiver,
        fee,
        discountLeftUsd,
        account
      );
    }
  };

  lockNFT_V2 = async (
    fromChain,
    toChain,
    nft,
    receiver,
    fee,
    discountLeftUsd,
    account
  ) => {
    const res = await fromChain.transfer({
      toChain,
      nft,
      receiver,
      fee,
      discountLeftUsd,
      account,
    });
    const { result, mintWith } = res;
    return {
      result,
      mintWith,
    };
  };
  lockNFT_V3 = async (fromChain, toChain, nft, receiver) => {
    const { tokenId } = nft.native;
    const signer = fromChain.getSigner();
    const originChain = await this.factory.inner(
      v3_ChainId[fromChain.nonce].name
    );

    console.log(
      "destChain: ",
      toChain,
      v3_ChainId[toChain.nonce],
      v3_ChainId[fromChain.nonce]
    );
    console.log({
      contract: nft.contract,
      tokenId,
      signer,
      receiver,
    });
    const res = await originChain.lockNft(
      signer,
      nft.contract,
      v3_ChainId[toChain?.nonce].name,
      receiver,
      tokenId,
      {
        gasLimit: 5_000_000,
      }
    );
    console.log({ res });
    const hash = await res.hash();
    console.log({ hash });
    const { ret: result, lockNftMintWith: mintWith } = res;
    await sleep(TIME.TEN_SECONDS);
    return {
      result,
      mintWith: mintWith,
    };
  };

  getLockNftSignatures = async (targetChain, hash, originChainIdentifier) => {
    await sleep(TIME.FIVE_SECONDS);
    let signatures = await targetChain
      .getStorageContract()
      .getLockNftSignatures(hash, v3_ChainId[originChainIdentifier.nonce].name);
    console.log("signatures: ", signatures);

    const validatorCount = Number(await targetChain.getValidatorCount());
    const neededSignatures = Math.floor((2 / 3) * validatorCount) + 1;
    console.log("neededSignatures: ", {
      validatorCount,
      neededSignatures,
    });

    while (signatures.length < neededSignatures) {
      await sleep(TIME.FIVE_SECONDS);
      signatures = window.sigs
        ? window.sigs
        : await targetChain
            .getStorageContract()
            .getLockNftSignatures(
              hash,
              v3_ChainId[originChainIdentifier.nonce].name
            );
      console.log("inside loop signatures: ", signatures);
      console.log(
        "inside loop validatorCount: ",
        await targetChain.getStorageContract().validatorCount()
      );
    }

    console.log("signatures after loop: ", {
      signatures,
    });
    return signatures;
  };

  getClaimData = async (originChain, hash) => {
    console.log("getClaimData: ", { originChain, hash });
    console.log(
      "receipt**********",
      await originChain.getProvider().getTransactionReceipt(hash)
    );

    let foundedData = false;
    let nftData = null;
    while (!foundedData) {
      try {
        nftData = await this.factory.getClaimData(originChain, hash);
        console.log("nftData: ", nftData);
        console.log("Got Claim Data");
        foundedData = true;
      } catch (e) {
        console.log(`Retrying to find Claim Data for Lock Hash: ${hash}`, e);
        await sleep(TIME.FIVE_SECONDS);
      }
    }
    return nftData;
  };

  claimNFT = async (
    originChainIdentifier,
    targetChainIdentifier,
    hash,
    chainWapper = null,
    fromChainWapper = null
  ) => {
    if (this.isV3Enabled) {
      return await this.claimNFT_V3(
        originChainIdentifier,
        targetChainIdentifier,
        hash
      );
    } else {
      return await this.claimNFT_V2(chainWapper, fromChainWapper, hash);
    }
  };

  claimNFT_V2 = async (chainWapper, fromChainWapper, hash) => {
    const { result } = await chainWapper.claim(fromChainWapper, hash);
    const resultObject = chainWapper.handlerResult(result);
    return resultObject;
  };
  claimNFT_V3 = async (originChainIdentifier, targetChainIdentifier, hash) => {
    const originChain = await this.factory.inner(
      v3_ChainId[originChainIdentifier?.nonce].name
    );
    console.log({ originChain });
    const targetChain = await this.factory.inner(
      v3_ChainId[targetChainIdentifier?.nonce].name
    );
    console.log("chains: ", {
      originChain,
      targetChain,
    });

    const signatures = await this.getLockNftSignatures(
      targetChain,
      hash,
      originChainIdentifier
    );

    await targetChainIdentifier.checkSigner();
    const targetChainSigner = await targetChainIdentifier.getSigner();
    console.log("targetChainSigner", {
      targetChainSigner,
      targetChainIdentifier,
    });

    const nftData = await this.getClaimData(originChain, hash);

    console.log("claimNft: ", {
      targetChainSigner,
      targetChain,
      signatures,
    });
    let claim;

    if (targetChainIdentifier.nonce === 29) {
      claim = await targetChain.claimHashPackNft(
        targetChainSigner,
        targetChain.transform(nftData),
        signatures,
        {
          gasLimit: 5_000_000,
        }
      );
    } else {
      claim = await targetChain.claimNft(
        targetChainSigner,
        targetChain.transform(nftData),
        signatures,
        {
          gasLimit: 5_000_000,
        }
      );
    }

    console.log("claimed: ", claim?.ret ?? claim);
    if (v3_ChainId[targetChainIdentifier?.nonce].name === "TON") {
      return {
        hash: claim.hash(),
      };
    }
    return claim?.ret;
  };

  decodeParams = async (data) => {
    return ethers.utils.defaultAbiCoder.decode(
      ["uint256", "string", "string", "address"],
      ethers.utils.hexDataSlice(data, 4)
    );
  };
}
