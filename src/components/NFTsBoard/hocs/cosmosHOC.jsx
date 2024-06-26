/* eslint-disable react/prop-types */
import React from "react";

import { ChainType, MainNetRpcUri, TestNetRpcUri } from "xp.network";
import { ClaimInDestination } from "../../TransferBoard/ClaimInDestination";
import { Chain } from "xp.network";
import { getChainObject } from "../../values";
import { useSelector } from "react-redux";
import { promisify } from "../../../utils";

export const withCosmos = (Wrapped) =>
  function CBU(props) {
    const testnet = useSelector((state) => state.general.testNet);

    const connectionCallback = async (bridge) => {
      const chainWrapper = await bridge.getChain(Chain.SECRET);

      //////////////////////

      const chain = getChainObject(Chain.SECRET);

      const chainId = testnet ? chain.tnChainId : chain.chainId;
      const key = chain.key.toUpperCase();

      await window.keplr.enable(chainId);
      const offlineSigner = window.keplr.getOfflineSigner(chainId);

      const accounts = await offlineSigner.getAccounts();

      const { address } = accounts[0];

      const secretjs = await promisify(() => import("secretjs"));
      const signer = new secretjs.SecretNetworkClient({
        url: testnet ? TestNetRpcUri[key] : MainNetRpcUri[key],
        chainId,
        wallet: offlineSigner,
        walletAddress: address,
        //encryptionUtils: window.getEnigmaUtils(chain),
      });
      console.log("aa- signer--->", signer);

      chainWrapper.setSigner(signer);

      ///////////////////////////

      return chainWrapper;
    };

    return (
      <Wrapped
        {...props}
        chainSpecificRender={{
          ...(props.chainSpecificRender || {}),
          [ChainType.COSMOS]: {
            RenderClaimInDestination: ClaimInDestination(connectionCallback),
          },
        }}
      />
    );
  };
