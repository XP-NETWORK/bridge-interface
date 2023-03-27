/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useAccount, useNetwork, useSigner } from "wagmi";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import {
  setAccount,
  setConnectedWallet,
  setError,
} from "../../../store/reducers/generalSlice";
import { wcSupportedChains } from "./evmConnectors";

import { useNavigate } from "react-router";
import { getRightPath } from "../../../wallet/helpers";

export const withEVMConnection = (Wrapped) =>
  function CB(props) {
    const { serviceContainer } = props;
    const dispatch = useDispatch();
    const bitKeep = useSelector((state) => state.general.bitKeep);
    const WCProvider = useSelector((state) => state.general.WCProvider);
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);

    const connectedWallet = useSelector(
      (state) => state.general.connectedWallet
    );

    const navigate = useNavigate();

    const { chainId, account } = useWeb3React();
    const { address } = useAccount();
    const { chain } = useNetwork();
    const { data: signer } = useSigner();
    const { bridge } = serviceContainer;

    useEffect(() => {
      if (address && signer && !connectedWallet) {
        const isSupported = wcSupportedChains.find(
          (supported) => chain.id === supported.id
        );
        console.log("from: ", from);
        if (from) {
          if (isSupported) {
            if (
              isSupported.id === from?.chainId ||
              isSupported.id === from?.tnChainId
            ) {
              dispatch(setConnectedWallet("WalletConnect"));
              dispatch(setAccount(address));
              const nonce = bridge.getNonce(chain.id);
              bridge.getChain(nonce).then((chainWrapper) => {
                chainWrapper.setSigner(signer);
                bridge.setCurrentType(chainWrapper);
                to && from && navigate(getRightPath());
              });
            } else
              dispatch(
                setError({
                  message: `Departure chain and WalletConnect selected network must be the same.`,
                })
              );
          } else {
            dispatch(
              setError({
                message: `${chain.name} is not supported by WalletConnect protocol.`,
              })
            );
          }
        }
      }
    }, [address, signer, chain]);

    useEffect(() => {
      if (bridge && account && chainId) {
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
    }, [bridge, account, chainId, WCProvider]);

    return <Wrapped {...props} />;
  };
