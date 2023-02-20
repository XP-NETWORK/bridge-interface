/* eslint-disable react/prop-types */
import React, { useEffect } from "react";

import { useSelector } from "react-redux";

import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

export const withEVMConnection = (Wrapped) =>
  function CB(props) {
    const { serviceContainer } = props;

    const bitKeep = useSelector((state) => state.general.bitKeep);
    const WCProvider = useSelector((state) => state.general.WCProvider);
    const { chainId, account } = useWeb3React();

    const { bridge } = serviceContainer;

    useEffect(() => {
      if (serviceContainer.bridge && account && chainId) {
        (async () => {
          const nonce = bridge.getNonce(chainId);

          bridge.getChain(nonce).then((chainWrapper) => {
            const provider = new ethers.providers.Web3Provider(
              bitKeep
                ? window.bitkeep?.ethereum
                : WCProvider?.walletConnectProvider || window.ethereum
            );
            const signer = provider.getSigner(account);

            chainWrapper.setSigner(signer);
            bridge.setCurrentType(chainWrapper);
          });
        })();
      }
    }, [serviceContainer, account, chainId]);

    return <Wrapped {...props} />;
  };
