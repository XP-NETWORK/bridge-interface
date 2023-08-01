import React from "react";

import PropTypes from "prop-types";

import HigherTON from "./HigherTON";

import tonkeeper from "../../../assets/img/wallet/tonkeeper.svg";

import { useSelector } from "react-redux";

import { tonAuth } from "../../values";

import { isMobile } from "../../../utils";

function TonKeeper({ styles, connectWallet }) {
    const tonKeeperSession = useSelector(
        (state) => state.tonStore.tonKeeperSession
    );

    const url = `tonkeeper://ton-login/${tonAuth}/tk?open=1&userId=${
        tonKeeperSession.userId
    }&url=${encodeURIComponent(tonAuth)}`;

    const connectHandler = () => {
        connectWallet("TonKeeper");
        isMobile.any() && window.open(url, "_blank");
    };

    return (
        <li
            style={styles("TonKeeper")}
            onClick={connectHandler}
            className="wllListItem"
            data-wallet="TonKeeper"
        >
            <img style={{ width: "28px" }} src={tonkeeper} alt="" />
            <p>Tonkeeper</p>
        </li>
    );
}
TonKeeper.propTypes = {
    styles: PropTypes.func,
    connectWallet: PropTypes.func,
};

export default HigherTON(TonKeeper);
