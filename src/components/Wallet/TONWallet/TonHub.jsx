import React from "react";

import PropTypes from "prop-types";

import HigherTON from "./HigherTON";

// import TON from "../../../assets/img/chain/ton.svg";

function TonHub({ styles, connectWallet }) {
    const connectHandler = () => {
        connectWallet("TonHub");
    };
    return (
        <li
            style={styles("TonHub")}
            onClick={connectHandler}
            className="wllListItem"
            data-wallet="Tonhub"
        >
            <img style={{ width: "28px" }} src="#" alt="" />
            <p>Tonhub</p>
        </li>
    );
}
TonHub.propTypes = {
    styles: PropTypes.func,
    connectWallet: PropTypes.func,
};

export default HigherTON(TonHub);
