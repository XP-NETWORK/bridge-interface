import { chainsConfig } from "../../../components/values.js";
import store from "../../../store/store.js";
import { errorToLog } from "../../../wallet/helpers";
import { setError } from "../../../store/reducers/generalSlice";
import { setQRCodeModal } from "../../../components/Wallet/TONWallet/tonStore";
import BigNumber from "bignumber.js";

import { biz } from "../../../components/values.js";

export const transferNFTFromTON = async ({
  to,
  from,
  nft,
  signer,
  receiver,
  fee,
}) => {
  console.log("🚀 ~ file: tonHelper.js ~ line 15 ~ signer", signer);
  // eslint-disable-next-line no-debugger

  const {
    general: { factory },
  } = store.getState();
  const toChain = await factory.inner(chainsConfig[to.text].Chain);
  const fromChain = await factory.inner(chainsConfig[from.text].Chain);

  const {
    general: { tonAccount },
  } = store.getState();
  let mintWith;

  let result;

  switch (true) {
    default:
      result = await transfer(
        fromChain,
        toChain,
        nft,
        signer,
        receiver,
        undefined,
        fee,
        mintWith,
        factory,
        tonAccount
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
  account
) => {
  let result;
  const {
    general: { from, to },
  } = store.getState();

  nft = {
    ...nft,
    native: {
      ...nft.native,
      nftItemAddr: nft.native.address,
    },
  };

  try {
    switch (true) {
      case amount > 0:
        result = await factory.transferSft(
          fromChain,
          toChain,
          nft,
          signer,
          receiver,
          new BigNumber(amount),
          undefined,
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
          biz ? new BigNumber(100000000) : undefined,
          mintWith
        );
        break;
    }
    store.dispatch(setQRCodeModal(false));
    return result;
  } catch (error) {
    store.dispatch(setError(error));
    const date = new Date();
    const errBogy = {
      type: "Transfer",
      walletAddress: account,
      time: date.toString(),
      fromChain: from.text,
      toChain: to.text,
      message: error,
      nfts: nft.native,
    };
    errorToLog(errBogy);
  }

  store.dispatch(setQRCodeModal(false));
};
