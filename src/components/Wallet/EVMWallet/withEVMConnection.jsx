/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useAccount, useNetwork } from "wagmi";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import {
    setAccount,
    setConnectedWallet,
    setError,
} from "../../../store/reducers/generalSlice";

import { useNavigate } from "react-router";
import { getRightPath } from "../../../utils";

import { withWalletConnect } from "../../App/hocs/withServices";

const WalletConnect = ({ from, to, bridge, walletConnectChains }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { address, connector } = useAccount();

    const { chain } = useNetwork();

    useEffect(() => {
        if (address && connector) {
            const isSupported = walletConnectChains.find(
                (supported) => chain.id === supported.id
            );

            if (isSupported) {
                if (
                    isSupported.id === from?.chainId ||
                    isSupported.id === from?.tnChainId
                ) {
                    const nonce = bridge.getNonce(chain.id);
                    bridge.getChain(nonce).then((chainWrapper) => {
                        connector.getWalletClient().then((signer) => {
                            const { account, chain, transport } = signer;

                            const network = chain
                                ? {
                                      chainId: chain.id,
                                      name: chain.name,
                                      ensAddress:
                                          chain.contracts?.ensRegistry?.address,
                                  }
                                : undefined;

                            const provider = new ethers.providers.Web3Provider(
                                transport,
                                network
                            );
                            const adaptedSigner = provider.getSigner(
                                account.address
                            );

                            dispatch(setConnectedWallet("WalletConnect"));
                            dispatch(setAccount(address));
                            chainWrapper.setSigner(adaptedSigner);
                            bridge.setCurrentType(chainWrapper);
                            to && from && navigate(getRightPath());
                        });
                    });
                } else {
                    dispatch(
                        setError({
                            message: `Departure chain and WalletConnect selected network must be the same.`,
                        })
                    );
                }
            } else {
                dispatch(
                    setError({
                        message: `${chain.name} is not supported by WalletConnect protocol.`,
                    })
                );
            }
        }
    }, [address, chain, connector]);

    return "";
};

export const withEVMConnection = (Wrapped) =>
    withWalletConnect(function CB(props) {
        const { serviceContainer, walletConnectChains } = props;
        const dispatch = useDispatch();
        const bitKeep = useSelector((state) => state.general.bitKeep);
        const WCProvider = useSelector((state) => state.general.WCProvider);
        const from = useSelector((state) => state.general.from);
        const to = useSelector((state) => state.general.to);

        const { chainId, account } = useWeb3React();
        const { bridge } = serviceContainer;

        useEffect(() => {
            if (bridge && account && chainId) {
                (async () => {
                    const nonce = bridge.getNonce(chainId);

                    bridge.getChain(nonce).then((chainWrapper) => {
                        const provider = bitKeep
                            ? window.bitkeep?.ethereum
                            : WCProvider?.walletConnectProvider ||
                              window.ethereum;

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

        return (
            <>
                {walletConnectChains && (
                    <WalletConnect
                        from={from}
                        to={to}
                        bridge={bridge}
                        walletConnectChains={walletConnectChains}
                    />
                )}
                <Wrapped {...props} />
            </>
        );
    });
