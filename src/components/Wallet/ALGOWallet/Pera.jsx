import React from "react";
import HigherAlgorand from "./HigherAlgorand";
import PropTypes from "prop-types";
import PeraIcon from "../../../assets/img/wallet/Pera.svg";

function Pera({ styles, connectWallet }) {
    return (
        <li
            style={styles()}
            onClick={() => connectWallet("Pera")}
            data-wallet="Algorand Wallet"
            className="wllListItem algo"
        >
            <img src={PeraIcon} alt="Algor Wallet Icon" />
            <p>Pera</p>
        </li>
    );
}
Pera.propTypes = {
    styles: PropTypes.func,
    connectWallet: PropTypes.func,
};

export default HigherAlgorand(Pera);
