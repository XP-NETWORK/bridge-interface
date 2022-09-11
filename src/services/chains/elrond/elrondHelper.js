import { CHAIN_INFO, chainsConfig } from "../../../components/values.js";
import store from "../../../store/store.js";
import { getFactory } from "../../../wallet/helpers";
import { setError, setTxnHash } from "../../../store/reducers/generalSlice";

export const transferNFTFromElrond = async ({
  to,
  from,
  nft,
  signer,
  receiver,
  fee,
  index,
  txnHashArr,
  chainConfig,
  testnet,
  discountLeftUsd,
}) => {
  const factory = await getFactory();
  const toChain = await factory.inner(chainsConfig[to.text].Chain);
  const fromChain = await factory.inner(chainsConfig[from.text].Chain);
  const fromNonce = CHAIN_INFO[from.text].nonce;
  const toNonce = CHAIN_INFO[to.text].nonce;
  const wrapped = await factory.isWrappedNft(nft, fromNonce);
  const {
    native: { contract, tokenId },
    amountToTransfer,
  } = nft;
  let mintWith;
  if (!wrapped) {
    mintWith = await factory.getVerifiedContract(
      contract,
      toNonce,
      fromNonce,
      tokenId && !isNaN(Number(tokenId)) ? tokenId.toString() : undefined
    );
  }
  let result;
  switch (true) {
    case !wrapped && !mintWith && !testnet && to.type === "EVM":
      store.dispatch(
        setError({
          message:
            "Transfer has been canceled. The NFT you are trying to send will be minted with a default NFT collection",
        })
      );
      if (txnHashArr[0]) {
        store.dispatch(setTxnHash({ txn: "failed", nft }));
      }
      break;
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
        factory
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
  factory
) => {
  let result;
  try {
    switch (true) {
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
        return result;
    }
  } catch (error) {
    store.dispatch(setError(error));
  }
};
