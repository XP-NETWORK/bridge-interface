/* eslint-disable react/prop-types */
import React, { useEffect } from "react";

import { Chain } from "xp.network";

import { useDispatch, useSelector } from "react-redux";

import {
    setAccount,
    setConnectedWallet,
    setFrom,
    setTo,
    setSelectedNFTList,
    setReceiver,
    updateApprovedNFTs,
    setTxnHash,
} from "../../../store/reducers/generalSlice";
import { setSigner } from "../../../store/reducers/signersSlice";

import { chains } from "../../values";

import { useNavigate } from "react-router";
import { getRightPath } from "../../../wallet/helpers";

export const withNearConnection = (Wrapped) =>
    function CB(props) {
        const { serviceContainer } = props;
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const { NFTList, selectedNFTList } = useSelector((state) => ({
            NFTList: state.general.NFTList,
            selectedNFTList: state.general.selectedNFTList,
        }));

        const params = new URLSearchParams(location.search.replace("?", ""));
        const nearAuth = params.get("all_keys") && params.get("account_id");
        const nearTrx = params.get("NEARTRX");
        const nearFlow = nearTrx || nearAuth;
        const approve = params.get("type") === "approve";
        const send =
            params.get("type") === "transfer" ||
            params.get("type") === "unfreeze";

        useEffect(() => {
            (async () => {
                if (serviceContainer.bridge) {
                    if (nearFlow && serviceContainer.bridge.config) {
                        const chainWrapper = await serviceContainer?.bridge?.getChain(
                            Chain.NEAR
                        );
                        //const nearParams = serviceContainer?.bridge?.config?.nearParams;
                        const walletConnection = await chainWrapper?.connect();
                        const address = walletConnection.getAccountId();
                        console.log(address, "account");
                        const signer = walletConnection.account();
                        console.log(signer);

                        if (address && signer) {
                            dispatch(setAccount(address));
                            dispatch(setSigner(signer));
                            serviceContainer.bridge.setCurrentType(
                                chainWrapper
                            );
                            dispatch(setConnectedWallet("Near Wallet"));
                            chainWrapper.setSigner(signer);
                            dispatch(
                                setFrom(
                                    chains.find((c) => c.nonce === Chain.NEAR)
                                )
                            );

                            if (nearTrx) {
                                console.log("NEAR: jump to wallet");
                                const to = params.get("to");
                                dispatch(
                                    setTo(
                                        chains.find(
                                            (c) => c.nonce === Number(to)
                                        )
                                    )
                                );
                                navigate(getRightPath());
                            }
                        }
                    }
                }
            })();
        }, [serviceContainer]);

        useEffect(() => {
            if (NFTList?.length && nearTrx) {
                const tokenId = params.get("tokenId");
                const contract = params.get("contract");
                const chainId = String(Chain.NEAR);
                const receiver = params.get("receiver");
                const hash = params.get("transactionHashes");

                if (approve) {
                    console.log("NEAR: inApprove");
                    const selectedNft = NFTList.find(
                        (nft) => nft.native.tokenId === tokenId
                    );
                    const alreadyS = selectedNFTList.some(
                        (nft) => nft.native.tokenId === tokenId
                    );

                    !alreadyS && dispatch(setSelectedNFTList(selectedNft));
                    dispatch(setReceiver(receiver));
                    dispatch(updateApprovedNFTs(selectedNft));
                }

                if (send && hash) {
                    console.log("NEAR: in send");

                    const nft = {
                        uri: "",
                        native: {
                            tokenId,
                            contract,
                            chainId,
                        },
                    };

                    dispatch(setSelectedNFTList(nft));
                    dispatch(
                        setTxnHash({
                            txn: { hash },
                            nft,
                        })
                    );
                }
            }
        }, [NFTList]);

        return <Wrapped {...props} />;
    };
