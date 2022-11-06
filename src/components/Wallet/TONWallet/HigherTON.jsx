import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTonAccount,
  setTonWallet,
  setWalletsModal,
} from "../../../store/reducers/generalSlice";
import {
  setSigner,
  setWalletAddress,
} from "../../../store/reducers/signersSlice";
import {
  connectTonHub,
  connectTonKeeper,
  connectTonWallet,
} from "./TonConnectors";
import { setQRCodeModal, setTonKeeperResponse } from "./tonStore";

import store from "../../../store/store";

export default function HigherTON(OriginalComponent) {
  //
  return function updatedComponent() {
    //

    const dispatch = useDispatch();
    const { from, temporaryFrom } = useSelector((state) => state.general);
    const factory = useSelector((state) => state.general.factory);

    const ifTypeIsTonOrNotSelected = () => {
      switch (true) {
        case !from && !temporaryFrom:
          return true;
        case temporaryFrom && temporaryFrom?.type === "TON":
          return true;
        case from && from?.type === "TON":
          return true;
        default:
          return false;
      }
    };

    const getStyles = (wallet) => {
      let styles = {
        pointerEvents: ifTypeIsTonOrNotSelected() ? "" : "none",
        opacity: ifTypeIsTonOrNotSelected() ? "" : "0.6",
      };

      // const tonSigner = ton.tonKpWrapper(
      //     await TonMnemonic.mnemonicToKeyPair(
      //       "alex alex alex alex alex".split(
      //         " "
      //       )
      //     )
      //   );

      switch (wallet) {
        case "TonWallet":
          // styles.display = "none";
          break;
        case "TonKeeper":
          // styles.display = "none";
          break;
        case "TonHub":
          // styles.display = "none";
          break;
        default:
          break;
      }
      return styles;
    };

    const connectWallet = async (wallet) => {
      let account;
      let signer;
      const fromChain = await factory.inner(27);
      switch (wallet) {
        case "TonWallet": {
          account = await connectTonWallet();

          signer = fromChain.tonWalletWrapper({
            wallet: account.signer,
            config: {
              address: account.address,
            },
          });

          break;
        }
        case "TonKeeper":
          account = await connectTonKeeper();
          signer = fromChain.tonKeeperWrapper({
            wallet: {
              send: (deepLink) => {
                store.dispatch(
                  setTonKeeperResponse({
                    message: "Approve TON transaction",
                    deepLink,
                  })
                );
                store.dispatch(setQRCodeModal(true));
              },
            },
            config: {
              ...account.signer,
            },
          });

          break;
        case "TonHub":
          await connectTonHub();

          break;
        default:
          break;
      }
      dispatch(setTonAccount(account.address));
      dispatch(setWalletAddress(account.address));
      dispatch(setSigner(signer));
      dispatch(setTonWallet(true));
      dispatch(setWalletsModal(false));
      dispatch(setQRCodeModal(false));
    };

    return (
      <OriginalComponent styles={getStyles} connectWallet={connectWallet} />
    );
  };
}
