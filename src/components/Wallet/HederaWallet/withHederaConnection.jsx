/* eslint-disable no-debugger */
import React, { useEffect } from "react";
//import { hethers } from "@hashgraph/hethers";

import { useDispatch } from "react-redux";
import {
  setAccount,
  setConnectedWallet,
  setWalletsModal,
  setFrom,
} from "../../../store/reducers/generalSlice";
//import { setClaimable } from "../../../store/reducers/hederaSlice";
import { Chain } from "xp.network";
import PropTypes from "prop-types";
import { hashConnect } from "./hederaConnections";
import * as hashSDK from "@hashgraph/sdk";

import { BridgeModes } from "../../values";

import { getChainObject } from "../../values";

export const withHederaConnection = (Wrapped) =>
  function CB(props) {
    const dispatch = useDispatch();

    // const checkClaimables = useSelector((state) => state.hedera.checkClaimables);

    const {
      serviceContainer: { bridge },
    } = props;
    let provider;
    let signer;

    const setSigner = async (signer) => {
      try {
        const chainWrapper = await getChain();

        chainWrapper.chain.injectSDK(hashSDK);
        chainWrapper.setSigner(signer);
        dispatch(setWalletsModal(false));
        dispatch(setConnectedWallet("HashPack"));
        // connected();
      } catch (error) {
        console.log(error);
      }
    };
    const getChain = async () => {
      let chain;
      try {
        chain = await bridge.getChain(Chain.HEDERA);
      } catch (error) {
        console.log(error);
      }
      return chain;
    };

    useEffect(async () => {
      hashConnect.pairingEvent.once((pairingData) => {
        const topic = pairingData.topic;
        const accountId = pairingData.accountIds[0];
        const address = hashSDK.AccountId.fromString(
          accountId
        ).toSolidityAddress(); //hethers.utils.getAddressFromAccount(accountId);

        dispatch(setAccount(address));
        const isTestnet = window.location.pathname.includes(
          BridgeModes.TestNet
        );
        try {
          provider = hashConnect.getProvider(
            isTestnet ? "testnet" : "mainnet",
            topic,
            accountId
          );
          provider.client.setMaxQueryPayment(new hashSDK.Hbar(5));
          provider.client.setDefaultMaxTransactionFee(new hashSDK.Hbar(5));
          signer = hashConnect.getSigner(provider);

          signer.address = address;
          setSigner(signer);

          dispatch(setFrom(getChainObject(Chain.HEDERA)));
          dispatch(setWalletsModal(false));
          dispatch(setConnectedWallet("HashPack"));
        } catch (error) {
          console.log("pairingEvent error", error);
        }
      });
      hashConnect.acknowledgeMessageEvent.once((acknowledgeData) => {
        console.log("acknowledgeMessageEvent", { acknowledgeData });
      });
      hashConnect.connectionStatusChangeEvent.once((connectionStatus) => {
        console.log("connectionStatusChangeEvent", {
          connectionStatus,
        });
      });
    }, []);

    CB.propTypes = {
      serviceContainer: PropTypes.object,
    };

    return <Wrapped {...props} />;
  };
