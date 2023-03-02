/* eslint-disable no-debugger */
import React, { useEffect } from "react";
import hashpack from "../../../assets/img/wallet/hashpack.svg";
import { HashConnect } from "hashconnect/dist/cjs/main";

import HigherHEDERA from "./HigherHEDERA";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function Hashpack({ connect, bridge }) {
    let hashConnect = new HashConnect(true);
    let provider;
    let signer;
    const testnet = useSelector((state) => state.general.testNet);

    console.log({ bridge });

    useEffect(() => {
        hashConnect.pairingEvent.once((pairingData) => {
            debugger;
            console.log("pairingEvent", { pairingData });
            const network = testnet ? "testnet" : "mainnet";
            const topic = pairingData.topic;
            const accountId = pairingData.accountIds[0];
            try {
                provider = hashConnect.getProvider(network, topic, accountId);
                console.log("pairingEvent", provider);
                signer = hashConnect.getSigner(provider);
                console.log("pairingEvent", { signer });
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
