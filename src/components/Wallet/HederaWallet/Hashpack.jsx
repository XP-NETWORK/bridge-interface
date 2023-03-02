/* eslint-disable no-debugger */
import React, { useEffect } from "react";
import hashpack from "../../../assets/img/wallet/hashpack.svg";
import { HashConnect } from "hashconnect";
import { Chain } from "xp.network";

import HigherHEDERA from "./HigherHEDERA";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    setAccount,
    setConnectedWallet,
    setWalletsModal,
} from "../../../store/reducers/generalSlice";

function Hashpack({ connect, bridge }) {
    const dispatch = useDispatch();
    let hashConnect = new HashConnect(true);
    let provider;
    let signer;
    const testnet = useSelector((state) => state.general.testNet);

    const setSigner = async () => {
        try {
            const chainWrapper = await bridge.getChain(Chain.HEDERA);
            chainWrapper.chain.setPetraSigner(signer);
            dispatch(setWalletsModal(false));
            dispatch(setConnectedWallet("HashPack"));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        hashConnect.pairingEvent.once((pairingData) => {
            debugger;
            console.log("pairingEvent", { pairingData });
            const network = testnet ? "testnet" : "mainnet";
            const topic = pairingData.topic;
            const accountId = pairingData.accountIds[0];
            dispatch(setAccount(accountId));
            try {
                provider = hashConnect.getProvider(network, topic, accountId);
                signer = hashConnect.getSigner(provider);
                setSigner();
            } catch (error) {
                console.log("pairingEvent error", error);
            }
        });
        hashConnect.acknowledgeMessageEvent.once((acknowledgeData) => {
            console.log("acknowledgeMessageEvent", { acknowledgeData });
        });
        hashConnect.connectionStatusChangeEvent.once((connectionStatus) => {
            console.log("connectionStatusChangeEvent", { connectionStatus });
        });
    }, []);

    return (
        <li
            // style={getStyles()}
            onClick={() => connect("HashPack", hashConnect)}
            className="wllListItem"
            data-wallet="Hashpack"
        >
            <img style={{ width: "28px" }} src={hashpack} alt="Hashpack Icon" />
            <p>Hashpack</p>
        </li>
    );
}

Hashpack.propTypes = {
    getStyles: PropTypes.func,
    connect: PropTypes.func,
    bridge: PropTypes.object,
};

export default HigherHEDERA(Hashpack);
