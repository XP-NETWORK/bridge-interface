/* eslint-disable no-debugger */
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setAccount,
  setConnectedWallet,
  setWalletsModal,
  setFrom,
  setIsClaiming,
  setConnectedWalletType,
} from "../../../store/reducers/generalSlice";
import { Chain } from "xp.network";
import PropTypes from "prop-types";
import { hashConnect } from "./hederaConnections";
import { getChainObject } from "../../values";

export const withHederaConnection = (Wrapped) =>
  function CB(props) {
    const dispatch = useDispatch();
    const quietConnection = useSelector(
      (state) => state.signers.quietConnection
    );
    const {
      serviceContainer: { bridge },
    } = props;
    let signer;

    useEffect(() => {
      const handler = (pairingData) => {
        import("@hashgraph/sdk").then((hashSDK) => {
          const accountId = pairingData.accountIds[0];
          const address = hashSDK.AccountId.fromString(
            accountId
          ).toSolidityAddress();

          try {
            signer = hashConnect.getSigner(accountId);
            signer.address = address;

            bridge.getChain(Chain.HEDERA).then(async (chainWrapper) => {
              if (!chainWrapper.chain?.isInjected) {
                const injectedChainWrapper = bridge.setInnerChain(
                  Chain.HEDERA,
                  chainWrapper.chain.injectSDK(hashSDK)
                );

                injectedChainWrapper.setSigner(signer);
              }

              if (!quietConnection) {
                dispatch(setAccount(address));
                dispatch(setWalletsModal(false));
                dispatch(setConnectedWallet("HashPack"));
                dispatch(setConnectedWalletType("Hedera"));
                dispatch(setFrom(getChainObject(Chain.HEDERA)));
                dispatch(setWalletsModal(false));
              }
            });

            dispatch(setIsClaiming(true));
          } catch (error) {
            console.log("pairingEvent error", error);
          }
        });
      };
      hashConnect.pairingEvent.on(handler);
      return () => hashConnect.pairingEvent.off(handler);
    }, [quietConnection]);

    CB.propTypes = {
      serviceContainer: PropTypes.object,
    };

    return <Wrapped {...props} />;
  };
