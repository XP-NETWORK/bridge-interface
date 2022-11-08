import React from "react";

import PropTypes from "prop-types";

import HigherTON from "./HigherTON";

import tonkeeper from "../../../assets/img/wallet/tonkeeper.svg";

function TonKeeper({ styles, connectWallet }) {
    const connectHandler = () => {
        connectWallet("TonKeeper");
    };
    return (
        <li
            style={styles("TonKeeper")}
            onClick={connectHandler}
            className="wllListItem"
            data-wallet="Tonkeeper"
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
