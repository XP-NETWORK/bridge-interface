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

export const withEVMConnection = (Wrapped) =>
    function CB(props) {
        const { serviceContainer } = props;
        const dispatch = useDispatch();
        const bitKeep = useSelector((state) => state.general.bitKeep);
        const WCProvider = useSelector((state) => state.general.WCProvider);
        const from = useSelector((state) => state.general.from);

        const { chainId, account } = useWeb3React();
        const { address } = useAccount();
        const { chain } = useNetwork();
        const { data: signer } = useSigner();
        const { bridge } = serviceContainer;

        useEffect(() => {
            if (address) {
                const isSupported = wcSupportedChains.find(
                    (supported) => chain.id === supported.id
                );
                if (isSupported) {
                    if (isSupported.id === from.chainId) {
                        dispatch(setConnectedWallet("WalletConnect"));
                        dispatch(setAccount(address));
                        const nonce = bridge.getNonce(chain.id);
                        bridge.getChain(nonce).then((chainWrapper) => {
                            chainWrapper.setSigner(signer);
                            bridge.setCurrentType(chainWrapper);
                        });
                    } else
                        dispatch(
                            setError({
                                message: `Departure chain and WalletConnect selected network must be the same.`,
                            })
                        );
                } else
                    dispatch(
                        setError({
                            message: `${chain.name} is not supported by WalletConnect protocol.`,
                        })
                    );
            }
        }, [address]);

        useEffect(() => {
            if (bridge && account && chainId) {
                (async () => {
                    console.log(chainId, "chainId");
                    const nonce = bridge.getNonce(chainId);

                    bridge.getChain(nonce).then((chainWrapper) => {
                        const provider = new ethers.providers.Web3Provider(
                            bitKeep
                                ? window.bitkeep?.ethereum
                                : WCProvider?.walletConnectProvider ||
                                  window.ethereum
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
