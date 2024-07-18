/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useAccount, useNetwork } from "wagmi";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { setAccount, setConnectedWallet, setConnectedWalletType, setError } from "../../../store/reducers/generalSlice";

import { useNavigate } from "react-router";
import { getRightPath } from "../../../utils";

import { withWalletConnect } from "../../App/hocs/withServices";
import { switchNetwork } from "../../../services/chains/evm/evmService";
import { getChainObject } from "../../values";

const WalletConnect = ({ from, to, bridge, walletConnectChains }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { address, connector } = useAccount();

    const { chain } = useNetwork();

    useEffect(() => {
        if (address && connector) {
            const isSupported = walletConnectChains.find((supported) => chain.id === supported.id);

            if (isSupported) {
                if (isSupported.id === from?.chainId || isSupported.id === from?.tnChainId) {
                    const nonce = bridge.getNonce(chain.id);
                    bridge.getChain(nonce).then((chainWrapper) => {
                        connector.getWalletClient().then((signer) => {
                            const { account, chain, transport } = signer;

                            const network = chain
                                ? {
                                      chainId: chain.id,
                                      name: chain.name,
                                      ensAddress: chain.contracts?.ensRegistry?.address,
                                  }
                                : undefined;

                            const provider = new ethers.providers.Web3Provider(transport, network);
                            const adaptedSigner = provider.getSigner(account.address);

                            dispatch(setConnectedWallet("WalletConnect"));
                            dispatch(setConnectedWalletType("EVM"));
                            dispatch(setAccount(address));
                            chainWrapper.setSigner(adaptedSigner);
                            bridge.setCurrentType(chainWrapper);

                            to && from && navigate(getRightPath(bridge.network, from, to));
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
        const evmProvider = useSelector((state) => state.general.evmProvider);
        //const WCProvider = useSelector((state) => state.general.WCProvider);
        const from = useSelector((state) => state.general.from);
        const to = useSelector((state) => state.general.to);
        const quietConnection = useSelector((state) => state.signers.quietConnection);
        const navigate = useNavigate();
        const { chainId, account } = useWeb3React();
        const { bridge } = serviceContainer;

        async function connect(account, nonce, provider) {
            const chainWrapper = await bridge.getChain(nonce);

            const jsonRPCProvider = new ethers.providers.Web3Provider(provider);
            const signer = jsonRPCProvider.getSigner(account);
            chainWrapper.setSigner(signer);
            //console.log(quietConnection, "quietConnection");
            if (!quietConnection) {
                bridge.setCurrentType(chainWrapper);
                dispatch(setAccount(account));

                from && to && navigate(getRightPath(bridge.network, from, to));
            }
        }

        useEffect(() => {
            if (!bridge) return;

            if (account && chainId) {
                console.log("mm way");
                connect(account, bridge.getNonce(chainId), window.ethereum);
                return;
            }

            if (evmProvider) {
                console.log("evmProvider ");

                const accountsChangedHandler = async function(accounts) {
                    const chainId = await evmProvider.request({
                        method: "eth_chainId",
                    });

                    connect(accounts[0], bridge.getNonce(chainId), evmProvider);
                };

                const chainChangedHandler = async function(chainId) {
                    const accounts = await evmProvider.request({
                        method: "eth_requestAccounts",
                    });

                    connect(accounts[0], bridge.getNonce(chainId), evmProvider);
                };

                evmProvider.request({ method: "eth_requestAccounts" }).then(async (accounts) => {
                    let nonce = from?.nonce;

                    if (!nonce) {
                        const chainId = await evmProvider.request({
                            method: "eth_chainId",
                        });
                        nonce = bridge.getNonce(chainId);
                    }

                    await switchNetwork(getChainObject(nonce));
                    await evmProvider.request({
                        method: "wallet_requestPermissions",
                        params: [
                            {
                                eth_accounts: {},
                            },
                        ],
                    });
                    if (typeof evmProvider.on === "function") {
                        evmProvider.on("accountsChanged", accountsChangedHandler);
                        evmProvider.on("chainChanged", chainChangedHandler);
                    }
                    connect(accounts[0], nonce, evmProvider);
                });
                return () => {
                    if (typeof evmProvider.off === "function") {
                        evmProvider.off("accountsChanged", accountsChangedHandler);
                        evmProvider.off("chainChanged", chainChangedHandler);
                    }
                };
            }
        }, [bridge, account, chainId, evmProvider]);

        return (
            <>
                {walletConnectChains && (
                    <WalletConnect from={from} to={to} bridge={bridge} walletConnectChains={walletConnectChains} />
                )}
                <Wrapped {...props} />
            </>
        );
    });
