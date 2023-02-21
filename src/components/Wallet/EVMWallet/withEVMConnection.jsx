/* eslint-disable react/prop-types */
import React, { useEffect } from "react";

import { useSelector } from "react-redux";

import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import { useDispatch } from "react-redux";

import { setAccount } from "../../../store/reducers/generalSlice";

export const withEVMConnection = (Wrapped) =>
  function CB(props) {
    const { serviceContainer } = props;

    const dispatch = useDispatch();

    const bitKeep = useSelector((state) => state.general.bitKeep);
    const WCProvider = useSelector((state) => state.general.WCProvider);
    const { chainId, account } = useWeb3React();

    const { bridge } = serviceContainer;

    useEffect(() => {
      if (serviceContainer.bridge && account && chainId) {
        (async () => {
          const nonce = bridge.getNonce(chainId);

          bridge.getChain(nonce).then((chainWrapper) => {
            const provider = bitKeep
              ? window.bitkeep?.ethereum
              : WCProvider?.walletConnectProvider || window.ethereum;

            if (!provider) return;

            const upgradedProvider = new ethers.providers.Web3Provider(
              provider
            );
            const signer = upgradedProvider.getSigner(account);

            chainWrapper.setSigner(signer);
            dispatch(setAccount(account));
            bridge.setCurrentType(chainWrapper);
          });
        })();
      }
    }, [serviceContainer, account, chainId, WCProvider]);

    return <Wrapped {...props} />;
  };
