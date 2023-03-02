/* eslint-disable no-debugger */
import React, { useEffect } from "react";
// import { hethers } from "@hashgraph/hethers";
import { useDispatch, useSelector } from "react-redux";
import {
    setAccount,
    setConnectedWallet,
    setWalletsModal,
} from "../../../store/reducers/generalSlice";
import { Chain } from "xp.network";
import PropTypes from "prop-types";
import { hashConnect } from "./hederaConnections";

export const withHederaConnection = (Wrapped) =>
    function CB(props) {
        const dispatch = useDispatch();
        const testnet = useSelector((state) => state.general.testNet);

        const {
            serviceContainer: { bridge },
        } = props;
        let provider;
        let signer;

        const setSigner = async (signer) => {
            try {
                const chainWrapper = await getChain();
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
            // getChain.then((chain) => (chainWrapper = chain));

            hashConnect.pairingEvent.once((pairingData) => {
                console.log("pairingEvent", { pairingData });
                const network = testnet ? "testnet" : "mainnet";
                const topic = pairingData.topic;
                const accountId = pairingData.accountIds[0];
                // const address = hethers.utils.getAddressFromAccount("0.0.1");
                // console.log(
                //     "🚀 ~ file: withHederaConnection.jsx:55 ~ hashConnect.pairingEvent.once ~ address:",
                //     address
                // );
                dispatch(setAccount(accountId));
                try {
                    provider = hashConnect.getProvider(
                        network,
                        topic,
                        accountId
                    );
                    signer = hashConnect.getSigner(provider);
                    console.log(
                        "🚀 ~ file: withHederaConnection.jsx:67 ~ hashConnect.pairingEvent.once ~ signer:",
                        signer
                    );
                    setSigner(signer);
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
