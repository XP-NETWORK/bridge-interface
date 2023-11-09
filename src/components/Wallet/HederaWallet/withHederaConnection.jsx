/* eslint-disable no-debugger */
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
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

import { BridgeModes } from "../../values";

import { getChainObject } from "../../values";

export const withHederaConnection = (Wrapped) =>
    function CB(props) {
        const dispatch = useDispatch();
        const quietConnection = useSelector(
            (state) => state.signers.quietConnection
        );
        const {
            serviceContainer: { bridge },
        } = props;
        let provider;
        let signer;

        useEffect(() => {
            const handler = (pairingData) => {
                import("@hashgraph/sdk").then((hashSDK) => {
                    const topic = pairingData.topic;
                    const accountId = pairingData.accountIds[0];
                    const address = hashSDK.AccountId.fromString(
                        accountId
                    ).toSolidityAddress(); //hethers.utils.getAddressFromAccount(accountId);

                    const isTestnet = window.location.pathname.includes(
                        BridgeModes.TestNet
                    );
                    try {
                        provider = hashConnect.getProvider(
                            isTestnet ? "testnet" : "mainnet",
                            topic,
                            accountId
                        );
                        signer = hashConnect.getSigner(provider);

                        signer.address = address;

                        bridge.getChain(Chain.HEDERA).then((chainWrapper) => {
                            const injectedChainWrapper = bridge.setInnerChain(
                                Chain.HEDERA,
                                chainWrapper.chain.injectSDK(hashSDK)
                            );

                            injectedChainWrapper.setSigner(signer);

                            //chainWrapper.chain.injectSDK(hashSDK);

                            // chainWrapper.setSigner(signer);

                            if (!quietConnection) {
                                console.log(address, "dar");
                                console.log(signer);
                                dispatch(setAccount(address));
                                dispatch(setWalletsModal(false));
                                dispatch(setConnectedWallet("HashPack"));
                                dispatch(setFrom(getChainObject(Chain.HEDERA)));
                                dispatch(setWalletsModal(false));
                            }
                        });
                    } catch (error) {
                        console.log("pairingEvent error", error);
                    }
                });
            };
            hashConnect.pairingEvent.once(handler);
            return () => hashConnect.pairingEvent.off(handler);
        }, [quietConnection]);

        CB.propTypes = {
            serviceContainer: PropTypes.object,
        };

        return <Wrapped {...props} />;
    };
