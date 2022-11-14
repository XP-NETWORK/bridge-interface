import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setConnectedWallet,
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
  awaitTonHubReady,
} from "./TonConnectors";
import {
  setActiveTonWalletConnection,
  setQRCodeModal,
  setTonHubSession,
  setTonKeeperSession,
} from "./tonStore";

import { getRightPath } from "../../../wallet/helpers";

import store from "../../../store/store";
import { useNavigate } from "react-router";

export default function HigherTON(OriginalComponent) {
  //
  return function updatedComponent() {
    //

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { from, to, temporaryFrom } = useSelector((state) => state.general);
    const factory = useSelector((state) => state.general.factory);

    const tonKeeperSession = useSelector(
      (state) => state.tonStore.tonKeeperSession
    );

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

      switch (wallet) {
        case "TonWallet":
          break;
        case "TonKeeper":
          break;
        case "TonHub":
          break;
        default:
          break;
      }

      return styles;
    };

    const connectWallet = async (wallet, isMobile) => {
      let account;
      let signer;
      let connectedWallet;
      const fromChain = await factory.inner(27);
      switch (wallet) {
        case "TonWallet": {
          account = await connectTonWallet();
          connectedWallet = "TonWallet";
          signer = fromChain.tonWalletWrapper({
            wallet: account.signer,
            config: {
              address: account.address,
            },
          });

          break;
        }
        case "TonKeeper":
          store.dispatch(setActiveTonWalletConnection("TonKeeper"));
          account = await connectTonKeeper(tonKeeperSession.userId);
          connectedWallet = "TonKeeper";
          signer = fromChain.tonKeeperWrapper({
            wallet: {
              send: (deepLink) => {
                store.dispatch(setActiveTonWalletConnection("TonKeeper"));

                store.dispatch(
                  setTonKeeperSession({
                    message: "Approve TON transaction",
                    deepLink,
                    userId: tonKeeperSession.userId,
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
        case "TonHub": {
          store.dispatch(setActiveTonWalletConnection("TonHub"));
          const { connector, session } = await connectTonHub(isMobile);
          dispatch(setTonHubSession(session));
          signer = connector;
          account = await awaitTonHubReady(session);

          connectedWallet = "TonHub";
          signer = fromChain.tonHubWrapper({
            wallet: signer,
            config: {
              seed: session.seed,
              appPublicKey: account.config.appPublicKey,
              address: account.address,
            },
          });

          break;
        }
        default:
          break;
      }
      dispatch(setConnectedWallet(connectedWallet));
      dispatch(setTonAccount(account.address));
      dispatch(setWalletAddress(account.address));
      dispatch(setSigner(signer));
      dispatch(setTonWallet(true));
      dispatch(setWalletsModal(false));
      dispatch(setQRCodeModal(false));

      if (from && to) {
        navigate(getRightPath("TON"));
      }
    };

    return (
      <OriginalComponent styles={getStyles} connectWallet={connectWallet} />
    );
  };
}
