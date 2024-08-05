import { ChainFactory, ChainFactoryConfigs } from "xp-decentralized-sdk";
import { sleep } from "../utils";
import { TIME } from "../constants/time";
import {
  getChainObject,
  isTestnet,
  v3_bridge_mode,
} from "../components/values";
import { v3_ChainId, v3_getChainNonce } from "./chainsTypes";
import { ethers } from "ethers";
import { switchNetwork } from "../services/chains/evm/evmService";

export class XPDecentralizedUtility {
  isV3Enabled = false;
  factory = ChainFactory(
    isTestnet ? ChainFactoryConfigs.TestNet() : ChainFactoryConfigs.MainNet()
  );

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

    const originChain = await this.getChainFromFactory(
      v3_ChainId[fromChain.nonce].name
    );

    if (fromChain.nonce === 29) {
      const sdk = await import("@hashgraph/sdk");
      originChain.injectSDK(sdk);
    }
    await originChain.approveNft(signer, tokenId, contract);

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

    const originChain = await this.getChainFromFactory(
      v3_ChainId[fromChain.nonce].name
    );

    console.log(
      "destChain: ",
      toChain,
      v3_ChainId[toChain.nonce],
      v3_ChainId[fromChain.nonce]
    );
    console.log({
      nft,
      contract: nft.contract || nft.collectionIdent,
      tokenId,
      signer,
      receiver,
    });
    if (fromChain.nonce === 29) {
      const sdk = await import("@hashgraph/sdk");
      originChain.injectSDK(sdk);
    }
    const res = await originChain.lockNft(
      signer,
      nft.contract || nft.collectionIdent,
      v3_ChainId[toChain?.nonce].name,
      receiver,
      tokenId,
      nft.uri
    );
    console.log({ res });
    const hash = await res.hash();
    console.log({ hash });
    const { lockNftMintWith: mintWith, ret: result } = res;
    await sleep(TIME.TEN_SECONDS);
    return {
      result: result ?? hash,
      mintWith: mintWith,
    };
  };

  getLockNftSignatures = async (targetChain, hash, originChainIdentifier) => {
    await sleep(TIME.FIVE_SECONDS);
    console.log("hash", hash, v3_ChainId[originChainIdentifier.nonce].name);
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

    return signatures;
  };

  getClaimData = async (originChain, hash) => {
    console.log("getClaimData: ", { originChain, hash });

    let foundedData = false;
    let nftData = null;
    while (!foundedData) {
      try {
        nftData = await this.factory.getClaimData(originChain, hash);
        console.log("nftData: ", nftData);
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
    bridge,
    hash,
    chainWapper = null,
    fromChainWapper = null
  ) => {
    if (this.isV3Enabled) {
      return await this.claimNFT_V3(originChainIdentifier, hash, bridge);
    } else {
      return await this.claimNFT_V2(chainWapper, fromChainWapper, hash);
    }
  };

  claimNFT_V2 = async (chainWapper, fromChainWapper, hash) => {
    const { result } = await chainWapper.claim(fromChainWapper, hash);
    const resultObject = chainWapper.handlerResult(result);
    return resultObject;
  };
  claimNFT_V3 = async (originChainIdentifier, hashs, bridge) => {
    const hash =
      originChainIdentifier.nonce == 29 ? "0x" + hashs.slice(0, 64) : hashs;

    const originChain = await this.getChainFromFactory(
      v3_ChainId[originChainIdentifier?.nonce].name
    );

    console.log({ originChain });
    const nftData = await this.getClaimData(originChain, hash);

    const targetChain = await this.getChainFromFactory(
      nftData?.destinationChain
    );

    const signatures = await this.getLockNftSignatures(
      targetChain,
      hash,
      originChainIdentifier
    );

    const targetChainIdentifier = await bridge.getChain(
      v3_getChainNonce[nftData.destinationChain]
    );

    await targetChainIdentifier.checkSigner();
    const targetChainSigner = await targetChainIdentifier.getSigner();
    console.log("targetChainSigner", {
      targetChainSigner,
      targetChainIdentifier,
    });

    console.log(
      targetChainSigner?.provider,
      targetChainSigner?.provider?._network,
      targetChainSigner?.provider?._network?.chainId
    );

    if (
      targetChainIdentifier.chainParams.chainId !==
      targetChainSigner?.provider?._network?.chainId
    ) {
      console.log("inside if");
      await switchNetwork(getChainObject(targetChainIdentifier?.nonce));
    }
    console.log("if skipped");

    console.log("claimNft: ", {
      targetChainSigner,
      targetChain,
      signatures,
    });
    let claim;
    if (targetChainIdentifier.nonce === 29) {
      const sdk = await import("@hashgraph/sdk");
      targetChain.injectSDK(sdk);
    }
    console.log("transformed data", targetChain.transform(nftData));
    claim = await targetChain.claimNft(
      targetChainSigner,
      targetChain.transform(nftData),
      signatures
    );

    console.log("claimed: ", claim);
    if (
      v3_ChainId[targetChainIdentifier?.nonce].name === "TON" ||
      v3_ChainId[targetChainIdentifier?.nonce].name === "HEDERA"
    ) {
      return {
        hash: claim.hash(),
      };
    }
    return claim?.ret;
  };

  associateTokens = async (targetChainIdentifier) => {
    const targetChain = await this.factory.inner(
      v3_ChainId[targetChainIdentifier?.nonce].name
    );

    const sdk = await import("@hashgraph/sdk");
    targetChain.injectSDK(sdk);

    await targetChainIdentifier.checkSigner();
    const targetChainSigner = await targetChainIdentifier.getSigner();

    const isAssociated = await targetChain.associateTokens(targetChainSigner);
    console.log({ isAssociated });

    return isAssociated;
  };

  decodeParams = async (data) => {
    return ethers.utils.defaultAbiCoder.decode(
      ["uint256", "string", "string", "address"],
      ethers.utils.hexDataSlice(data, 4)
    );
  };

  getChainFromFactory = async (chain) => {
    return await this.factory.inner(chain);
  };
}
