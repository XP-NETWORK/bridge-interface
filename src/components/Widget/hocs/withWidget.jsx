import React from "react";
import { useSelector } from "react-redux";
import BigNumber from "bignumber.js";
import wservice from "../wservice";

const ws = wservice();

export const withWidget = (Wrapped) =>
  function CallBack(props) {
    const testnet = useSelector((state) => state.general.testNet);

    const {
      affiliationFees,
      affiliationWallet,
      affiliationSettings,
    } = useSelector(({ settings }) => ({
      affiliationFees: settings.affiliationFees,
      affiliationWallet: settings.affiliationWallet,
      affiliationSettings: settings.affiliationSettings,
    }));

    const wid = useSelector((state) => state.widget.wid);

    const getExtraFee = (from) => {
      const coef = ws.getFee(
        from,
        affiliationSettings,
        affiliationFees,
        affiliationWallet
      ).coef;

      if (wid && coef > 1) {
        return new BigNumber(coef);
      }
    };

    const setTxForWidget = (tx) => {
      if (tx && wid && !testnet) {
        const {
          result,
          fromNonce,
          toNonce,
          bigNumberFees,
          from,
          nft,
          senderAddress,
          targetAddress,
        } = tx;
        ws.saveTrx({
          wid,
          result,
          fromNonce,
          toNonce,
          bigNumberFees,
          affiliationFees: ws.getFee(
            from,
            affiliationSettings,
            affiliationFees,
            affiliationWallet
          ),
          nftUri: nft.image || nft.uri,
          senderAddress, //: account || algorandAccount,
          targetAddress, //: receiverAddress || receiver,
        });
      }
    };

    return (
      <Wrapped
        {...props}
        setTxForWidget={setTxForWidget}
        getExtraFee={getExtraFee}
      />
    );
  };
