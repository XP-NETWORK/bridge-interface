import React from "react";
import Elrond from "../../../assets/img/chain/multiverseX.png";
import PropTypes from "prop-types";
import HigherMultiversX from "./HigherMultiversX";

function MultiversXDeFi({ handleConnect, styles }) {
    return (
        <li
            style={styles()}
            onClick={() => handleConnect("MultiversXDeFi")}
            className="wllListItem"
            data-wallet="MultiversXDeFiWallet"
        >
            <img src={Elrond} alt="Elrond Icon" />
            <p>MultiversX DeFi Wallet</p>
        </li>
    );
}

MultiversXDeFi.propTypes = {
    styles: PropTypes.func,
    handleConnect: PropTypes.func,
};

export default HigherMultiversX(MultiversXDeFi);
