/* eslint-disable no-debugger */
import React, { useEffect } from "react";
import hashpack from "../../../assets/img/wallet/hashpack.svg";
import { HashConnect } from "hashconnect/dist/cjs/main";

import HigherHEDERA from "./HigherHEDERA";
import PropTypes from "prop-types";

function Hashpack({ connect }) {
    let hashConnect = new HashConnect(true);

    useEffect(() => {
        hashConnect.pairingEvent.once((pairingData) => {
            console.log("pairingEvent", { pairingData });
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
};

export default HigherHEDERA(Hashpack);
