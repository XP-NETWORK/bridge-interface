/* eslint-disable no-debugger */
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setAccount,
  setConnectedWallet,
  setWalletsModal,
  setFrom,
  setIsClaiming,
} from "../../../store/reducers/generalSlice";
//import { setClaimable } from "../../../store/reducers/hederaSlice";
import { Chain } from "xp.network";
import PropTypes from "prop-types";
import { hashConnect } from "./hederaConnections";
// import { BridgeModes } from "../../values";
// import { ChainFactory, ChainFactoryConfigs } from "xp-decentralized-sdk";
import { getChainObject } from "../../values";
// import { v3_ChainId } from "../../../utils/chainsTypes";

export const withHederaConnection = (Wrapped) =>
  function CB(props) {
    const dispatch = useDispatch();
    const quietConnection = useSelector(
      (state) => state.signers.quietConnection
    );
    const {
      serviceContainer: { bridge },
    } = props;
    // let provider;
    let signer;

    useEffect(() => {
      const handler = (pairingData) => {
        console.log("inside hedera connection");
        // const factory = ChainFactory(ChainFactoryConfigs.TestNet());

        import("@hashgraph/sdk").then((hashSDK) => {
          // const topic = pairingData.topic;
          const accountId = pairingData.accountIds[0];
          const address = hashSDK.AccountId.fromString(
            accountId
          ).toSolidityAddress(); //hethers.utils.getAddressFromAccount(accountId);

          // const isTestnet = window.location.pathname.includes(
          //   BridgeModes.TestNet
          // );
          try {
            console.log("PROV", hashConnect);
            // provider = hashConnect.getProvider(
            //   isTestnet ? "testnet" : "mainnet",
            //   topic,
            //   accountId
            // );
            signer = hashConnect.getSigner(accountId);

            signer.address = address;

            bridge.getChain(Chain.HEDERA).then(async (chainWrapper) => {
              console.log(chainWrapper.chain);

              if (!chainWrapper.chain?.isInjected) {
                const injectedChainWrapper = bridge.setInnerChain(
                  Chain.HEDERA,
                  chainWrapper.chain.injectSDK(hashSDK)
                );

                injectedChainWrapper.setSigner(signer);
              }

              // const targetChain = await factory.inner(
              //   v3_ChainId[29].name
              // );

              // targetChain.injectSDK(hashSDK);

              //chainWrapper.chain.injectSDK(hashSDK);

              // chainWrapper.setSigner(signer);

              if (!quietConnection) {
                dispatch(setAccount(address));
                dispatch(setWalletsModal(false));
                dispatch(setConnectedWallet("HashPack"));
                dispatch(setFrom(getChainObject(Chain.HEDERA)));
                dispatch(setWalletsModal(false));
              }
            });

            console.log("before toggle");
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
