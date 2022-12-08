import { CHAIN_INFO, chainsConfig } from "../../../components/values.js";
import store from "../../../store/store.js";
import { errorToLog } from "../../../wallet/helpers";
import { setError } from "../../../store/reducers/generalSlice";
import { ethers } from "ethers";

export const transferNFTFromElrond = async ({
  to,
  from,
  nft,
  signer,
  receiver,
  fee,
}) => {
  const {
    general: { factory },
  } = store.getState();
  const toChain = await factory.inner(chainsConfig[to.text].Chain);
  const fromChain = await factory.inner(chainsConfig[from.text].Chain);
  const fromNonce = CHAIN_INFO[from.text].nonce;
  const toNonce = CHAIN_INFO[to.text].nonce;
  const wrapped = await factory.isWrappedNft(nft, fromNonce);
  const {
    native: { tokenId },
    amountToTransfer,
    collectionIdent,
  } = nft;
  let mintWith;

  if (!wrapped) {
    const hex = tokenId.split("-")?.at(2);
    mintWith = await factory.getVerifiedContract(
      collectionIdent,
      toNonce,
      fromNonce,
      String(hex ? parseInt(hex, 16) : "")
    );
  }
  let result;
  switch (true) {
    default:
      result = await transfer(
        fromChain,
        toChain,
        nft,
        signer,
        receiver,
        amountToTransfer,
        fee,
        mintWith,
        factory,
        to
      );
      break;
  }
  return result || false;
};

const transfer = async (
  fromChain,
  toChain,
  nft,
  signer,
  receiver,
  amount,
  fee,
  mintWith,
  factory,
  to
) => {
  let result;
  const {
    general: { elrondAccount },
  } = store.getState();

  try {
    switch (true) {
      case amount > 0:
        result = await factory.transferSft(
          fromChain,
          toChain,
          nft,
          signer,
          receiver,
          BigInt(amount),
          fee,
          mintWith
        );
        break;
      default:
        result = await factory.transferNft(
          fromChain,
          toChain,
          nft,
          signer,
          receiver,
          fee,
          mintWith
        );
    }
    return ethers.utils.hexlify(result.hash?.hash)?.replace(/^0x/, "");
  } catch (error) {
    store.dispatch(setError(error));
    const date = new Date();
    const errBogy = {
      type: "Transfer",
      walletAddress: elrondAccount,
      time: date.toString(),
      fromChain: "Elrond",
      toChain: to.text,
      message: error,
      nfts: nft.native,
    };
    errorToLog(errBogy);
    return false;
  }
};
